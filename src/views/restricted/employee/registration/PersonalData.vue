<template>
  <Form v-slot="{ isSubmitting }" @submit="onSubmit" :initial-values="collaboratorFormValues"
    :validation-schema="personalDataForm" class="space-y-4">
    <div class="space-y-4 border border-primary-100 rounded p-4 mt-2">
      <h2 class="text-primary-500 text-lg font-bold">Dados pessoais</h2>
      <div class="grid grid-cols-4 gap-4">
        <BaseInput class="col-span-3" name="name" type="text" label="Nome" />
        <BaseInput name="birth" type="text" v-maska="'##/##/####'" label="Data de nascimento" />
        <BaseSelect nameModel="gender" :listItens="gender" label="Genero" />
        <BaseSelect nameModel="maritalStatus" :listItens="maritalStatus" label="Estado civil" />
        <BaseSelect nameModel="ethnicity" :listItens="ethnicity" label="Etnia" />
        <BaseInput name="nationality" type="text" label="Nacionalidade" />
        <BaseInput name="naturalness" type="text" label="Naturalidade" />
        <BaseSelect nameModel="schoolingType" :listItens="schoolingTypes" label="Escolaridade" />
      </div>
      <div class="grid grid-cols-2 gap-4">
        <BaseInput name="nameMother" type="text" label="Nome da mãe" />
        <BaseInput name="nameFather" type="text" label="Nome do pai" />
      </div>
    </div>
    <BaseButton type="submit" class="md:w-40 text-right m-auto mr-0" :loading="isSubmitting" outline>Salvar</BaseButton>
  </Form>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { Form } from 'vee-validate'
import { useRouter, useRoute } from 'vue-router'

import BaseInput from '@/components/BaseInput.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import BaseButton from '@/components/BaseButton.vue'

import { useRegistration } from '@/composables'

import refDataService from '../../../../services/refData.service'

const {
  personalDataForm
} = useRegistration()

const router = useRouter()
const route = useRoute()

const registerType = route.params.type

let collaboratorFormValues = ref({})
let ethnicity = ref([]);
let maritalStatus = ref([]);
let gender = ref([]);
let schoolingTypes = ref([]);

onMounted(async () => {
  ethnicity.value = await refDataService.getEthnicityTypes()
  maritalStatus.value = await refDataService.getMaritalStatusTypes()
  gender.value = await refDataService.getGenderTypes()
  schoolingTypes.value = await refDataService.getSchoolingTypes()
})

async function onSubmit(values) {
  router.push({ name: 'documents' });
}
</script>