<script setup>
import { ref, onMounted } from 'vue';
import { Form } from 'vee-validate'
import { useRoute } from 'vue-router';
import useToastNotify from '@/hooks/toast'

import { useUser } from '@/composables'
import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseModal from '@/components/BaseModal.vue'

import UserService from '../../../services/user.service';


const { notify } = useToastNotify()

const route = useRoute()
const {
  updatePasswordForm
} = useUser()

const collaboratorId = route.params.id

let user = ref();
let modalUpdatePassoword = ref(false)

onMounted(async () => {
  user.value = await UserService.find(collaboratorId)
})

async function updatePassoword(values) {
  values.id = collaboratorId
  UserService.updatePassoword(values).then(() => {
    notify('SUCCESS', "Alteração realizada com sucesso!")
    modalUpdatePassoword.value.close()
  }, error => {
    console.error(error)
    notify('DANGER', "Erro ao realizar alteração.")
  })
}
</script>
<template>
  <h1 class="text-primary-500 text-xl font-bold uppercase mb-4">Perfil</h1>
  <section v-if="user" class="grid grid-cols-1 md:grid-cols-3 gap-4 border border-primary-500 rounded p-4 shadow-md">
    <div>
      <p class="text-primary-500 font-bold text-lg mb-0">Nome</p>
      <p class="text-primary-500">{{ user.name }}</p>
    </div>
    <div>
      <p class="text-primary-500 font-bold text-lg mb-0">E-mail</p>
      <p class="text-primary-500">{{ user.email }}</p>
    </div>
    <div>
      <p class="text-primary-500 font-bold text-lg mb-0">Perfil</p>
      <p class="text-primary-500">{{ user.roleName }}</p>
    </div>
    <div class="col-span-full">
      <a class="text-primary-500 font-bold underline cursor-pointer hover:opacity-70"
        @click="modalUpdatePassoword.open">Alterar senha</a>
    </div>
  </section>
  <BaseModal ref="modalUpdatePassoword">
    <div class="min-w-full md:min-w-[600px]">
      <h1 class="text-lg text-center text-primary-500 font-bold">Alterar senha</h1>
      <hr class="mt-4 border-neutral-100">
      <div class="w-full px-4 my-12">
        <Form v-slot="{ isSubmitting }" :validation-schema="updatePasswordForm" @submit="updatePassoword">
          <div class="space-y-4 w-full">
            <BaseInput name="password" type="password" label="Senha" />
            <BaseInput name="confirmPassword" type="password" label="Confirme sua senha" />
            <div class="flex justify-between">
              <BaseButton type="button" class="md:w-40 text-center" @click="modalUpdatePassoword.close()" outline>Cancelar
              </BaseButton>
              <BaseButton type="submit" class="md:w-40 text-center bg-primary-500 text-white" :disabled="isSubmitting">
                Salvar</BaseButton>
            </div>
          </div>
        </Form>
      </div>
    </div>
  </BaseModal></template>