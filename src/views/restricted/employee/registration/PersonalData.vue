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

import { useRegistration } from '@/composables'

import refDataService from '../../../../services/refData.service'
import CollaboratorService from '../../../../services/collaborator.service'

dayjs.extend(customParseFormat)

const {
  personalDataForm
} = useRegistration()

const router = useRouter()
const route = useRoute()

const { notify } = useToastNotify()

const collaboratorId = route.query.id
const collaboratorType = route.query.type

let collaboratorFormValues = ref({})
let ethnicity = ref([]);
let maritalStatus = ref([]);
let gender = ref([]);

const CONTRACT_TYPE_LIST = ref([
  {id: 'clt', name: 'CLT'},
  {id: 'internship', name: 'Estágio'},
  {id: 'cooperated', name: 'Cooperado'},
  {id: 'pj', name: 'PJ'},
])

onMounted(async () => {
  ethnicity.value = await refDataService.getEthnicityTypes()
  maritalStatus.value = await refDataService.getMaritalStatusTypes()
  gender.value = await refDataService.getGenderTypes()
  if (collaboratorId) {
    const data = await CollaboratorService.find(collaboratorId)
    const contractTypeId = data.contractType == 'pj' ? 1 : 2
    data.birthDate = data.birthDate ? dayjs(data.birthDate, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY') : undefined
    data.contractTypeObj = CONTRACT_TYPE_LIST.value.find(c => c.id == contractTypeId)
    collaboratorFormValues.value = data
  }
})

async function onSubmit(values) {
  const collaborator = {
    ...values,
    birthDate: dayjs(values.birthDate, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss'),
    genderTypeId: values.gender.id,
    maritalStatusTypeId: values.gender.id,
    ethnicityTypeId: values.gender.id,
    contractType: values.contractTypeObj.id
  }
  
  if (collaboratorId) {
    collaborator.id = collaboratorId
    await CollaboratorService.update(collaborator).then((response) => {
      notify('SUCCESS', "Alteração realizada com sucesso!")
    }, (error) => {
      const msg = {
        'error': 'Erro ao salvar alterações.'
      }[error.response.data.message]
      notify('DANGER', msg || 'Erro ao salvar.')
    })
  } else {
    await CollaboratorService.save(collaborator).then((response) => {
      notify('SUCCESS', "Dados pessoais salvo com sucesso!")
      router.push({ name: 'documents', query: { id: response.id, type: collaboratorType } });
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
  <Form v-slot="{ isSubmitting }" @submit="onSubmit" :initial-values="collaboratorFormValues"
    :validation-schema="personalDataForm" class="space-y-4">
    <div class="space-y-4 border border-primary-100 rounded p-4 mt-2">
      <h2 class="text-primary-500 text-lg font-bold">Dados pessoais</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <BaseInput class="md:col-span-3" name="name" type="text" label="Nome" />
        <BaseSelect nameModel="contractTypeObj" :listItens="CONTRACT_TYPE_LIST" label="Tipo de contrato" />
        <BaseInput name="birthDate" type="text" v-maska="'##/##/####'" label="Data de nascimento" />
        <BaseInput class="md:col-span-2" name="email" type="text" label="E-mail" />
        <BaseSelect nameModel="gender" :listItens="gender" label="Genero" />
        <BaseSelect nameModel="maritalStatus" :listItens="maritalStatus" label="Estado civil" />
        <BaseSelect nameModel="ethnicity" :listItens="ethnicity" label="Etnia" />
        <BaseInput name="nationality" type="text" label="Nacionalidade" />
        <BaseInput name="naturalness" type="text" label="Naturalidade" />
      </div>
      <div class="grid md:grid-cols-2 gap-4">
        <BaseInput name="motherName" type="text" label="Nome da mãe" />
        <BaseInput name="fatherName" type="text" label="Nome do pai" />
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