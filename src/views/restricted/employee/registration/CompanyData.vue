<template>
  <Form v-slot="{ isSubmitting }" @submit="onSubmit" :initial-values="companyDataFormValues"
    :validation-schema="companyDataForm" class="space-y-4">
    <div class="space-y-4 border border-primary-100 rounded p-4 mt-2">
      <h2 class="text-primary-500 text-lg font-bold">Dados da Empresa</h2>
      <div class="grid grid-cols-12 gap-4">
        <BaseInput class="col-span-6" name="corporateName" type="text" label="Razão Social" />
        <BaseInput class="col-span-6" name="fantasyName" type="text" label="Nome Fantasia" />
      </div>
      <div class="grid grid-cols-10 gap-4">
        <BaseInput class="col-span-2" name="cnpj" type="text" label="CNPJ" v-maska="'##.###.###/####-##'" />
        <BaseInput class="col-span-2" name="stateRegistration" type="text" label="Inscrição Estadual" />
        <BaseInput class="col-span-2" name="municipalRegistration" type="text" label="Inscrição Municipal" />
        <BaseInput class="col-span-2" name="mainActivity" type="text" label="Nº Atividade Principal" v-maska="'#*'" />
        <BaseInput class="col-span-2" name="secondaryActivity" type="text" label="Nº Atividade Secundária" v-maska="'#*'" />
      </div>
    </div>
    <BaseButton type="submit" class="md:w-40 text-right m-auto mr-0" :loading="isSubmitting" outline>Salvar</BaseButton>
  </Form>
</template>
<script setup>
import { ref } from 'vue'
import { Form } from 'vee-validate'
import { useRouter } from 'vue-router'

import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'

import { useRegistration } from '@/composables'

const router = useRouter()

const {
  companyDataForm
} = useRegistration()

let companyDataFormValues = ref({})

async function onSubmit(values) {
  router.push({ name: 'list' });
}
</script>