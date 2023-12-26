<script setup>
import { onMounted, ref } from 'vue'
import { Form } from 'vee-validate'
import { useRouter, useRoute } from 'vue-router'
import dayjs from 'dayjs/esm'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import useToastNotify from '@/hooks/toast'

import BaseInput from '@/components/BaseInput.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import BaseButton from '@/components/BaseButton.vue'

import { useUser } from '@/composables'

import refDataService from '../../../../services/refData.service'
import UserService from '../../../../services/user.service'

dayjs.extend(customParseFormat)

const { notify } = useToastNotify()

const {
  userDataForm
} = useUser()

const router = useRouter()
const route = useRoute()

const id = route.params.id

let formValues = ref({})
let roles = ref([]);

onMounted(async () => {
  roles.value = await refDataService.getRoles()
  if(id) {
    formValues.value = await UserService.find(id)
  }
})

async function onSubmit(values) {
  values.id = id
  UserService.update(values).then(() => {
    notify('SUCCESS', "Alteração realizado com sucesso!.")
    router.push({ name: 'users-list' });
  }, error => {
    console.error(error)
    notify('DANGER', "Erro ao realizar alteração.")
  })
}
</script>
<template>
  <Form v-slot="{ isSubmitting }" @submit="onSubmit" :initial-values="formValues"
    :validation-schema="userDataForm" class="space-y-4">
    <div class="space-y-4 border border-primary-100 rounded p-4 mt-2">
      <h2 class="text-primary-500 text-lg font-bold">Edição</h2>
      <div class="grid grid-cols-4 gap-4">
        <BaseInput class="col-span-3" name="name" type="text" label="Nome" />
        <BaseInput name="email" type="text" label="E-mail" />
        <BaseSelect nameModel="roles" :listItens="roles" label="Perfil" />
      </div>
    </div>
    <div class="flex justify-between">
      <router-link :to="{ name: 'users-list' }" >
        <BaseButton type="button" class="md:w-40 text-right m-auto mr-0" red>Voltar</BaseButton>
      </router-link>
      <BaseButton type="submit" class="md:w-40 text-right m-auto mr-0" :loading="isSubmitting" outline>Salvar</BaseButton>
    </div>
  </Form>
</template>