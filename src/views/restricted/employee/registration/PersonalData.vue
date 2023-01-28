<script setup>
import { onMounted, ref } from 'vue'
import { Form } from 'vee-validate'
import { useRouter, useRoute } from 'vue-router'
import dayjs from 'dayjs/esm'
import customParseFormat from 'dayjs/plugin/customParseFormat'

import BaseInput from '@/components/BaseInput.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import BaseButton from '@/components/BaseButton.vue'

import { useRegistration } from '@/composables'

import refDataService from '../../../../services/refData.service'
import CollaboratorService from '../../../../services/collaborator.service'
import { mapKeys } from 'lodash'

dayjs.extend(customParseFormat)

const {
  personalDataForm
} = useRegistration()

const router = useRouter()
const route = useRoute()

const collaboratorType = route.params.type
const collaboratorId = route.params.id

let collaboratorFormValues = ref({})
let ethnicity = ref([]);
let maritalStatus = ref([]);
let gender = ref([]);

onMounted(async () => {
  ethnicity.value = await refDataService.getEthnicityTypes()
  maritalStatus.value = await refDataService.getMaritalStatusTypes()
  gender.value = await refDataService.getGenderTypes()
  if(collaboratorId) {
    const data = await CollaboratorService.find(collaboratorId)
    data.birthDate = data.birthDate ? dayjs(data.birthDate, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY') : undefined
    collaboratorFormValues.value = data
    console.log(collaboratorFormValues)
  }
})

async function onSubmit(values) {
  const collaborator = {
    ...values,
    birthDate: dayjs(values.birthDate, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss'),
    genderTypeId: values.gender.id,
    maritalStatusTypeId: values.gender.id,
    ethnicityTypeId: values.gender.id,
    contractType: collaboratorType
  }
  const data = await CollaboratorService.save(collaborator)

  router.push({ name: 'documents' });
}
</script>
<template>
  <Form v-slot="{ isSubmitting }" @submit="onSubmit" :initial-values="collaboratorFormValues"
    :validation-schema="personalDataForm" class="space-y-4">
    <div class="space-y-4 border border-primary-100 rounded p-4 mt-2">
      <h2 class="text-primary-500 text-lg font-bold">Dados pessoais</h2>
      <div class="grid grid-cols-4 gap-4">
        <BaseInput class="col-span-3" name="name" type="text" label="Nome" />
        <BaseInput name="birthDate" type="text" v-maska="'##/##/####'" label="Data de nascimento" />
        <BaseInput class="col-span-2" name="email" type="text" label="E-mail" />
        <BaseSelect nameModel="gender" :listItens="gender" label="Genero" />
        <BaseSelect nameModel="maritalStatus" :listItens="maritalStatus" label="Estado civil" />
        <BaseSelect nameModel="ethnicity" :listItens="ethnicity" label="Etnia" />
        <BaseInput name="nationality" type="text" label="Nacionalidade" />
        <BaseInput name="naturalness" type="text" label="Naturalidade" />
      </div>
      <div class="grid grid-cols-2 gap-4">
        <BaseInput name="motherName" type="text" label="Nome da mãe" />
        <BaseInput name="fatherName" type="text" label="Nome do pai" />
      </div>
    </div>
    <BaseButton type="submit" class="md:w-40 text-right m-auto mr-0" :loading="isSubmitting" outline>Salvar</BaseButton>
  </Form>
</template>