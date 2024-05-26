<script setup>
import { ref, onMounted } from 'vue'
import { Form } from 'vee-validate'
import { useRoute, useRouter } from 'vue-router'
import useToastNotify from '@/hooks/toast'

import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'

import { useRegistration } from '@/composables'
import CollaboratorService from '../../../../services/collaborator.service'

const {
  companyDataForm
} = useRegistration()

const router = useRouter()
const route = useRoute()
const { notify } = useToastNotify()

const collaboratorId = route.query.id

let companyDataFormValues = ref({})

onMounted(async () => {
  if (collaboratorId) {
    await loadData()
  }
})

async function loadData() {
  await CollaboratorService.findCompanyData(collaboratorId).then((response) => {
    companyDataFormValues.value = response
  })
}

async function onSubmit(values) {
  values.collaboratorId = collaboratorId
  values.id = companyDataFormValues.value && companyDataFormValues.value.id || null
  if (!values.id) {
    await CollaboratorService.saveCompanyData(values).then((response) => {
      notify('SUCCESS', "Dados salvo com sucesso!")
      router.push({ name: 'employee-list' });
    }, (error) => {
      const msg = {
        'error': 'Erro ao salvar informações.'
      }[error.response.data.message]
      notify('DANGER', msg || 'Erro ao salvar.')
    })
  } else {
    await CollaboratorService.updateCompanyData(values).then(async (response) => {
      await loadData()
      notify('SUCCESS', "Dados atualizados com sucesso!")
    }, (error) => {
      const msg = {
        'error': 'Erro ao salvar informações.'
      }[error.response.data.message]
      notify('DANGER', msg || 'Erro ao salvar.')
    })
  }
}
</script>
<template>
  <Form v-slot="{ isSubmitting }" @submit="onSubmit" :initial-values="companyDataFormValues"
    :validation-schema="companyDataForm" class="space-y-4">
    <div class="space-y-4 border border-primary-100 rounded p-4 mt-2">
      <h2 class="text-primary-500 text-lg font-bold">Dados da Empresa</h2>
      <div class="grid lg:grid-cols-2 gap-4">
        <BaseInput name="corporateName" type="text" label="Razão Social" />
        <BaseInput name="fantasyName" type="text" label="Nome Fantasia" />
      </div>
      <div class="grid grid-cols-1 lg:grid-cols-10 gap-4">
        <BaseInput class="lg:col-span-2" name="cnpj" type="text" label="CNPJ" v-maska="'##.###.###/####-##'" />
        <BaseInput class="lg:col-span-2" name="stateRegistration" type="text" label="Inscrição Estadual" />
        <BaseInput class="lg:col-span-2" name="municipalRegistration" type="text" label="Inscrição Municipal" />
        <BaseInput class="lg:col-span-2" name="mainActivity" type="text" label="Nº Atividade Principal" v-maska="'#*'" />
        <BaseInput class="lg:col-span-2" name="secondaryActivity" type="text" label="Nº Atividade Secundária" v-maska="'#*'" />
      </div>
    </div>
    <div class="space-y-4 md:space-y-0 md:flex justify-between">
      <router-link :to="{ name: 'employee-list' }" >
        <BaseButton type="button" class="md:w-40 text-right m-auto mr-0" red>Voltar</BaseButton>
      </router-link>
      <BaseButton type="submit" class="md:w-40 text-right m-auto mr-0" :loading="isSubmitting" outline>Salvar</BaseButton>
    </div>
  </Form>
</template>