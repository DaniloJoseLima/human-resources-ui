
<script setup>
import { ref, onMounted } from 'vue'
import { Form } from 'vee-validate'
import { useRoute, useRouter } from 'vue-router'
import useToastNotify from '@/hooks/toast'
import { mask } from 'maska'

import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseSelect from '@/components/BaseSelect.vue'

import { useRegistration } from '@/composables'
import CollaboratorService from '../../../../services/collaborator.service'

const router = useRouter()
const route = useRoute()
const { notify } = useToastNotify()

const collaboratorId = route.query.id
const collaboratorType = route.query.type

const {
  bankForm
} = useRegistration()

let bankFormValues = ref({})
const accountType = ref([
  { id: 'current', name: 'Corrente' },
  { id: 'savings', name: 'Poupança' },
])
const accountCategory = ref([
  { id: 'pf', name: 'Pessoa física' },
  { id: 'pj', name: 'Pessoa jurídica' },
])
const pixKeyType = ref([
  { id: 'telephone', name: 'Telefone' },
  { id: 'email', name: 'E-mail' },
  { id: 'cpf', name: 'CPF' },
  { id: 'cnpj', name: 'CNPJ' },
  { id: 'random', name: 'Aleatória' },
])

onMounted(async () => {
  if (collaboratorId) {
    await CollaboratorService.findBankData(collaboratorId).then((response) => {
      response.accountType =  accountType.value.find(d => d.id == response.accountType)
      response.accountCategory =  accountCategory.value.find(d => d.id == response.accountCategory)
      response.pixKeyType =  pixKeyType.value.find(d => d.id == response.pixKeyType)
      bankFormValues.value = response
    })
  }
})

async function onSubmit(values) {
  values.collaboratorId = collaboratorId
  if(!bankFormValues.value || (bankFormValues.value && !bankFormValues.value.collaboratorId)) {
    await CollaboratorService.saveBankData(values).then((response) => {
      notify('SUCCESS', "Dados bancário salvo com sucesso!")
      router.push({ name: 'contract', query: { id: collaboratorId, type: collaboratorType } });
    }, (error) => {
      const msg = {
        'error': 'Erro ao salvar Dados bancário.'
      }[error.response && error.response.data && error.response.data.message || 'Erro ao salvar.']
      notify('DANGER', msg)
    })
  } else {
    values.id = bankFormValues.value.id
    await CollaboratorService.updateBankData(values).then((response) => {
      notify('SUCCESS', "Dados bancário Atualizados com sucesso!")
    }, (error) => {
      const msg = {
        'error': 'Erro ao salvar Dados bancário.'
      }[error.response && error.response.data && error.response.data.message || 'Erro ao salvar.']
      notify('DANGER', msg)
    })
  }
}
</script>
<template>
  <Form v-slot="{ isSubmitting }" @submit="onSubmit" :initial-values="bankFormValues" :validation-schema="bankForm"
    class="space-y-4">
    <div class="space-y-4 border border-primary-100 rounded p-4 mt-2">
      <h2 class="text-primary-500 text-lg font-bold">Dados Bancários</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <BaseInput name="name" type="text" label="Banco" />
        <BaseInput name="agency" type="text" label="Agência" v-maska="'#####'" />
        <BaseInput name="account" type="text" label="Conta" v-maska="'#######'" />
        <BaseSelect nameModel="accountType" :listItens="accountType" label="Tipo de conta" />
        <BaseSelect nameModel="accountCategory" :listItens="accountCategory" label="Categoria" />
        <BaseSelect nameModel="pixKeyType" :listItens="pixKeyType" label="Tipo de chave pix" />
        <BaseInput class="md:col-span-2" name="pixKey" type="text" label="Chave Pix" />
      </div>
    </div>
    <div class="space-y-4 md:space-y-0 md:flex justify-between">
      <router-link :to="{ name: 'employee-list' }">
        <BaseButton type="button" class="md:w-40 text-right m-auto mr-0" red>Voltar</BaseButton>
      </router-link>
      <BaseButton type="submit" class="md:w-40 text-right m-auto mr-0" :loading="isSubmitting" outline>Salvar</BaseButton>
    </div>
  </Form>
</template>