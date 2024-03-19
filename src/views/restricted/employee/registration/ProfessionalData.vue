<script setup>
import { ref, onMounted } from 'vue'
import { Form, FieldArray } from 'vee-validate'
import { useRoute, useRouter } from 'vue-router'
import useToastNotify from '@/hooks/toast'

import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import BaseModal from '@/components/BaseModal.vue'

import { useRegistration } from '@/composables'
import refDataService from '../../../../services/refData.service'
import CollaboratorService from '../../../../services/collaborator.service'

const router = useRouter()
const route = useRoute()
const { notify } = useToastNotify()

const collaboratorId = route.query.id
const collaboratorType = route.query.type

const {
  professionalDataForm
} = useRegistration()

let professionalDataFormValues = ref({})
let schoolingTypes = ref([]);
let validateList = ref(false);
let modalDelete = ref(false)

onMounted(async () => {
  schoolingTypes.value = await refDataService.getSchoolingTypes()
  if (collaboratorId) {
    await loadData()
  }
  validateList.value = true
})
async function loadData() {
  await CollaboratorService.findProfessionalData(collaboratorId).then((response) => {
    if (response) {
      response.schoolingTypes = schoolingTypes.value.find(d => d.id == response.schoolingTypes.id)
      professionalDataFormValues.value = response
    }
  })
}

async function onSubmit(values) {
  values.collaboratorId = collaboratorId
  if (!professionalDataFormValues.value || (professionalDataFormValues.value && !professionalDataFormValues.value.id)) {
    await CollaboratorService.saveProfessionalData(values).then((response) => {
      notify('SUCCESS', "Dados profissionais salvo com sucesso!")
      router.push({ name: 'transportation-vouchers', query: { id: collaboratorId, type: collaboratorType } });
    }, (error) => {
      const msg = {
        'error': 'Erro ao salvar informações.'
      }[error.response.data.message]
      notify('DANGER', msg || 'Erro ao salvar.')
    })
  } else {
    await CollaboratorService.updateProfessionalData(values).then((response) => {
      notify('SUCCESS', "Dados profissionais atualizados com sucesso!")
    }, (error) => {
      const msg = {
        'error': 'Erro ao salvar informações.'
      }[error.response.data.message]
      notify('DANGER', msg || 'Erro ao salvar.')
    })
  }
}
async function deleteObject(objectToDelete, type) {
  if(type == 'formation') {
    await CollaboratorService.deleteFormation(objectToDelete.id).then(async (response) => {
      notify('SUCCESS', "Formação deletado com sucesso!")
      validateList.value = false
      await loadData()
      validateList.value = true
    }, (error) => {
      const msg = {
        'error': 'Erro ao deletar.'
      }[error.response && error.response.data && error.response.data.message || 'Erro ao deletar.']
      notify('DANGER', msg)
    })
  } else {    
    await CollaboratorService.deleteCertification(objectToDelete.id).then(async (response) => {
      notify('SUCCESS', "Certificação deletado com sucesso!")
      validateList.value = false
      await loadData()
      validateList.value = true
    }, (error) => {
      const msg = {
        'error': 'Erro ao deletar.'
      }[error.response && error.response.data && error.response.data.message || 'Erro ao deletar.']
      notify('DANGER', msg)
    })
  }
  modalDelete.value.close()
}
</script>
<template>
  <Form v-if="validateList" v-slot="{ isSubmitting }" @submit="onSubmit" :initial-values="professionalDataFormValues"
    :validation-schema="professionalDataForm" class="space-y-4">
    <div class="space-y-4 border border-primary-100 rounded p-4 mt-2">
      <h2 class="text-primary-500 text-lg font-bold">Dados Profissionais</h2>
      <div class="grid md:grid-cols-4 gap-4">
        <BaseSelect nameModel="schoolingTypes" :listItens="schoolingTypes" label="Nível de escolaridade" />
      </div>
      <div>
        <FieldArray name="formation" v-slot="{ fields, push, remove }">
          <fieldset class="!mt-0 InputGroup" v-for="(field, idx) in fields" :key="field.key">
            <div :class="{ 'border-t border-dashed border-primary-100': idx > 0 }">
              <p class="text-primary-500 font-medium mt-4 mb-2">Formação Acadêmica</p>
              <div class="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 pr-6 pb-6">
                <BaseInput class="lg:col-span-5" :name="`formation[${idx}].course`" type="text" label="Curso"
                  :value="field.value.course" />
                <BaseInput class="lg:col-span-5" :name="`formation[${idx}].institution`" type="text" label="Instituição"
                  :value="field.value.institution" />
                <BaseInput class="lg:col-span-2" :name="`formation[${idx}].period`" type="text" label="Período"
                  :value="field.value.period" />
                <button class="absolute right-0 top-0 text-left w-1 text-negative-400 font-bold hover:opacity-70" type="button"
                  @click="(!field.value.id ? remove(idx) : modalDelete.open({ objectToDelete: field.value, type: 'formation' }))">X</button>
              </div>
            </div>
          </fieldset>
          <a class="inline-block underline text-primary-300 cursor-pointer hover:opacity-70"
            @click="push({ collaboratorId: collaboratorId })">Adicionar nova formação</a>
        </FieldArray>
      </div>
      <div>
        <FieldArray name="certification" v-slot="{ fields, push, remove }">
          <fieldset class="!mt-0 InputGroup" v-for="(field, idx) in fields" :key="field.key">
            <div :class="{ 'border-t border-dashed border-primary-100': idx > 0 }">
              <p class="text-primary-500 font-medium mt-4 mb-2">Certificação</p>
              <div class="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 pr-6 pb-6">
                <BaseInput class="lg:col-span-5" :name="`certification[${idx}].name`" type="text" label="Nome"
                  :value="field.value.name" />
                <BaseInput class="lg:col-span-2" :name="`certification[${idx}].number`" type="text" label="Número"
                  :value="field.value.number" />
                <BaseInput class="lg:col-span-5" :name="`certification[${idx}].institution`" type="text" label="Instituição"
                  :value="field.value.institution" />
                <button class="absolute right-0 top-0 text-left w-1 text-negative-400 font-bold hover:opacity-70" type="button"
                  @click="(!field.value.id ? remove(idx) : modalDelete.open({ objectToDelete: field.value, type: 'certification' }))">X</button>
              </div>
            </div>
          </fieldset>
          <a class="inline-block underline text-primary-300 cursor-pointer hover:opacity-70"
            @click="push({ collaboratorId: collaboratorId })">Adicionar nova certificação</a>
        </FieldArray>
      </div>
    </div>
    <div class="space-y-4 md:space-y-0 md:flex justify-between">
      <router-link :to="{ name: 'employee-list' }">
        <BaseButton type="button" class="md:w-40 text-right m-auto mr-0" red>Voltar</BaseButton>
      </router-link>
      <BaseButton type="submit" class="md:w-40 text-right m-auto mr-0" :loading="isSubmitting" outline>Salvar</BaseButton>
    </div>
  </Form>
  <BaseModal ref="modalDelete" v-slot="{ objectToDelete, type }">
    <div class="min-w-full md:min-w-[600px]">
      <h1 class="text-lg text-center text-negative-400 font-bold">Deseja excluir item?</h1>
      <hr class="mt-4 border-neutral-100">
      <div class="flex w-full justify-center space-x-5 px-2.5 my-12">
        <BaseButton type="button" class="md:w-40 bg-negative-300 text-white hover:text-white" outline
          @click="deleteObject(objectToDelete, type)">Sim</BaseButton>
        <BaseButton type="button" class="md:w-40" outline @click="modalDelete.close()">Não</BaseButton>
      </div>
    </div>
  </BaseModal>
</template>