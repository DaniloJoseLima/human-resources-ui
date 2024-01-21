
<script setup>
import { onMounted, ref } from 'vue'
import { Form, FieldArray } from 'vee-validate'
import { useRoute, useRouter } from 'vue-router'
import dayjs from 'dayjs/esm'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import useToastNotify from '@/hooks/toast'

import BaseInput from '@/components/BaseInput.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseCheckbox from '@/components/BaseCheckbox.vue'
import BaseModal from '@/components/BaseModal.vue'

import { useRegistration } from '@/composables'

import refDataService from '../../../../services/refData.service'
import CollaboratorService from '../../../../services/collaborator.service'

dayjs.extend(customParseFormat)

const {
  dependentForm
} = useRegistration()

const router = useRouter()
const route = useRoute()
const { notify } = useToastNotify()

const collaboratorId = route.query.id
const collaboratorType = route.query.type

let dependentFormValues = ref({})
let dependentTypes = ref([]);
let gender = ref([]);
let maritalStatus = ref([]);
let validateList = ref(false);
let isRegister = ref(false);
let modalDelete = ref(false)

onMounted(async () => {
  dependentTypes.value = await refDataService.getDependentTypes()
  gender.value = await refDataService.getGenderTypes()
  maritalStatus.value = await refDataService.getMaritalStatusTypes()
  if (collaboratorId) {
    await loadData()
  }
  validateList.value = true
})
async function loadData() {
  await CollaboratorService.findDependents(collaboratorId).then((response) => {
    if (response.length > 0) {
      isRegister.value = true;
      for (let index = 0; index < response.length; index++) {
        const element = response[index];
        element.birthDate = element.birthDate ? dayjs(element.birthDate, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY') : undefined
        element.expeditionDate = element.expeditionDate ? dayjs(element.expeditionDate, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY') : undefined
        element.dependentTypes = dependentTypes.value.find(d => d.id == element.dependentTypeId)
        element.genderTypes = gender.value.find(d => d.id == element.genderTypeId)
        element.maritalStatusTypes = maritalStatus.value.find(d => d.id == element.maritalStatusTypeId)
      }
      dependentFormValues.value = { dependent: response }
    }
  })
}

async function onSubmit(values) {
  const dependent = values.dependent
  for (let index = 0; index < dependent.length; index++) {
    dependent[index].birthDate = dayjs(dependent[index].birthDate, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
    dependent[index].expeditionDate = dependent[index].expeditionDate ? dayjs(dependent[index].expeditionDate, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss') : null
  }
  if (!isRegister.value) {
    await CollaboratorService.saveDependents(dependent).then((response) => {
      notify('SUCCESS', "Dependentes salvo com sucesso!")
      router.push({ name: 'bank', query: { id: collaboratorId, type: collaboratorType } });
    }, (error) => {
      const msg = {
        'error': 'Erro ao salvar dependentes.'
      }[error.response && error.response.data && error.response.data.message || 'Erro ao salvar.']
      notify('DANGER', msg)
    })
  } else {
    await CollaboratorService.updateDependents(dependent).then((response) => {
      notify('SUCCESS', "Dependentes Atualizados com sucesso!")
    }, (error) => {
      const msg = {
        'error': 'Erro ao salvar dependentes.'
      }[error.response && error.response.data && error.response.data.message || 'Erro ao salvar.']
      notify('DANGER', msg)
    })
  }
}
async function deleteObject(objectToDelete) {
  await CollaboratorService.deleteDependents(objectToDelete.id).then(async (response) => {
    notify('SUCCESS', "dependentes deletado com sucesso!")
    validateList.value = false
    await loadData()
    validateList.value = true
  }, (error) => {
    const msg = {
      'error': 'Erro ao deletar dependentes.'
    }[error.response.data.message || 'Erro ao deletar.']
    notify('DANGER', msg)
  })
  modalDelete.value.close()
}
</script>

<template>
  <Form v-if="validateList" v-slot="{ values, isSubmitting }" @submit="onSubmit" :initial-values="dependentFormValues"
    :validation-schema="dependentForm" class="space-y-4">
    <div class="space-y-4 border border-primary-100 rounded p-4 mt-2">
      <h2 class="text-primary-500 text-lg font-bold">Dependentes</h2>
      <FieldArray name="dependent" v-slot="{ fields, push, remove }">
        <fieldset class="!mt-0 InputGroup" v-for="(field, idx) in fields" :key="field.key">
          <div class="relative grid grid-cols-12 gap-4 pr-6 py-6"
            :class="{ 'border-t border-dashed border-primary-100': idx > 0 }">
            <BaseSelect class="col-span-2" :nameModel="`dependent[${idx}].dependentTypes`" :listItens="dependentTypes"
              label="Tipo" />
            <BaseInput class="col-span-4" :name="`dependent[${idx}].name`" type="text" label="Nome"
              :value="field.value.name" />
            <BaseInput class="col-span-2" :name="`dependent[${idx}].birthDate`" type="text" label="Data de nascimento"
              v-maska="'##/##/####'" :value="field.value.birthDate" />
            <BaseSelect class="col-span-2" :nameModel="`dependent[${idx}].genderTypes`" :listItens="gender"
              label="Genero" />
            <BaseSelect class="col-span-2" :nameModel="`dependent[${idx}].maritalStatusTypes`" :listItens="maritalStatus"
              label="Estado civil" />
            <BaseInput class="col-span-3" :name="`dependent[${idx}].numberCpf`" type="text" label="Número do CPF"
              v-maska="'###.###.###-##'" :value="field.value.numberCpf" />
            <BaseInput class="col-span-3" :name="`dependent[${idx}].numberRg`" type="text" label="Número do RG"
              :value="field.value.numberRg" />
            <BaseInput class="col-span-2" :name="`dependent[${idx}].expeditionDate`" type="text" label="Data expedição"
              v-maska="'##/##/####'" :value="field.value.expeditionDate" />
            <BaseInput class="col-span-2" :name="`dependent[${idx}].expeditionUf`" type="text" label="UF expedição"
              :value="field.value.expeditionUf" />
            <BaseInput class="col-span-2" :name="`dependent[${idx}].expeditionAgency`" type="text" label="Orgão expedidor"
              :value="field.value.expeditionAgency" />
            <BaseInput class="col-span-6" :name="`dependent[${idx}].nameMother`" type="text" label="Nome da mãe"
              :value="field.value.nameMother" />
            <BaseInput class="col-span-6" :name="`dependent[${idx}].nameFather`" type="text" label="Nome do pai"
              :value="field.value.nameFather" />
            <BaseCheckbox class="col-span-3" :name="`dependent[${idx}].irpfDependent`" type="radion"
              label="É dependente de IRRF?" :value="true" />
            <button class="absolute right-0 top-6 text-left w-1 col-span-1 text-negative-400 font-bold hover:opacity-70"
              type="button" @click="(!field.value.id ? remove(idx) : modalDelete.open({ objectToDelete: field.value }))"
              v-if="fields.length > 1">X</button>
          </div>
        </fieldset>
        <a class="inline-block underline text-primary-300 cursor-pointer hover:opacity-70 mt-4"
          @click="push({ collaboratorId: collaboratorId })">Adicionar novo contato</a>
      </FieldArray>
    </div>
    <div class="flex justify-between">
      <router-link :to="{ name: 'employee-list' }">
        <BaseButton type="button" class="md:w-40 text-right m-auto mr-0" red>Voltar</BaseButton>
      </router-link>
      <BaseButton type="submit" class="md:w-40 text-right m-auto mr-0" :loading="isSubmitting" outline>Salvar</BaseButton>
    </div>
  </Form>
  <BaseModal ref="modalDelete" v-slot="{ objectToDelete }">
    <div class="min-w-full md:min-w-[600px]">
      <h1 class="text-lg text-center text-negative-400 font-bold">Deseja excluir item?</h1>
      <hr class="mt-4 border-neutral-100">
      <div class="flex w-full justify-center space-x-5 px-2.5 my-12">
        <BaseButton type="button" class="md:w-40 bg-negative-300 text-white hover:text-white" outline
          @click="deleteObject(objectToDelete)">Sim</BaseButton>
        <BaseButton type="button" class="md:w-40" outline @click="modalDelete.close()">Não</BaseButton>
      </div>
    </div>
  </BaseModal>
</template>