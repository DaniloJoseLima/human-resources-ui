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
import BaseModal from '@/components/BaseModal.vue'

import { useRegistration } from '@/composables'

import refDataService from '../../../../services/refData.service'
import CollaboratorService from '../../../../services/collaborator.service'

dayjs.extend(customParseFormat)


const {
  documentsForm
} = useRegistration()

const router = useRouter()
const route = useRoute()
const { notify } = useToastNotify()

const collaboratorId = route.query.id
const collaboratorType = route.query.type

let documentsFormValues = ref({
  document: [{ "documentType": { "id": "2", "name": "CPF" }, collaboratorId }],
})
let documentsType = ref([]);
let validateList = ref(false);
let isRegister = ref(false);
let modalDelete = ref(false)

onMounted(async () => {
  documentsType.value = await refDataService.getDocumentsTypes()
  if (collaboratorId) {
    await loadData()
  }
  validateList.value = true
})

async function loadData() {
  await CollaboratorService.findDocuments(collaboratorId).then((response) => {
    if (response.length > 0) {
      isRegister.value = true
      for (let index = 0; index < response.length; index++) {
        const element = response[index];
        element.expeditionDate = element.expeditionDate ? dayjs(element.expeditionDate, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY') : undefined
        element.documentType = documentsType.value.find(d => d.id == element.documentTypeId)
      }
      documentsFormValues.value.document = response
    }
  })
}

function showInput(documentTypeId, inputType) {
  if (documentTypeId == 1 && inputType != 'zone' && inputType != 'session' && inputType != 'city') {
    return true
  }
  if (documentTypeId == 3 && inputType == 'expeditionDate') {
    return true
  }
  if (documentTypeId == 5 && (inputType == 'zone' || inputType == 'session' || inputType == 'city')) {
    return true
  }
  if (documentTypeId == 7 && (inputType == 'expeditionUf' || inputType == 'series')) {
    return true
  }
  return false
}

async function onSubmit(values) {
  values.id = collaboratorId
  const documents = values.document
  for (let index = 0; index < documents.length; index++) {
    if (documents[index].documentType.id == 1 || documents[index].documentType.id == 3) {
      documents[index].expeditionDate = dayjs(documents[index].expeditionDate, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
    }
  }
  if (!isRegister.value) {
    await CollaboratorService.saveDocuments(values).then((response) => {
      notify('SUCCESS', "Documentos salvo com sucesso!")
      router.push({ name: 'contacts', query: { id: collaboratorId, type: collaboratorType } });
    }, (error) => {
      const msg = {
        'error': 'Erro ao salvar informações.'
      }[error.response.data.message]
      notify('DANGER', msg || 'Erro ao salvar.')
    })
  } else {
    await CollaboratorService.updateDocuments(values).then(async (response) => {
      await loadData()
      notify('SUCCESS', "Documentos atualizados com sucesso!")
    }, (error) => {
      const msg = {
        'error': 'Erro ao salvar informações.'
      }[error.response.data.message]
      notify('DANGER', msg || 'Erro ao salvar.')
    })
  }
}

async function deleteObject(objectToDelete) {
  await CollaboratorService.deleteDocuments(objectToDelete.id).then(async (response) => {
    notify('SUCCESS', "Documento deletado com sucesso!")
    validateList.value = false
    await loadData()
    validateList.value = true
  }, (error) => {
    const msg = {
      'error': 'Erro ao deletar documento.'
    }[error.response && error.response.data && error.response.data.message || 'Erro ao deletar.']
    notify('DANGER', msg)
  })
  modalDelete.value.close()
}
</script>
<template>
  <Form v-if="validateList" v-slot="{ values, isSubmitting }" @submit="onSubmit" :initial-values="documentsFormValues"
    :validation-schema="documentsForm" class="space-y-4">
    <div class="space-y-4 border border-primary-100 rounded p-4 mt-2">
      <h2 class="text-primary-500 text-lg font-bold">Documentos</h2>
      <FieldArray name="document" v-slot="{ fields, push, remove }">
        <fieldset class="!mt-0 InputGroup" v-for="(field, idx) in fields" :key="field.key">
          <div class="relative grid grid-cols-1 md:grid-cols-4 lg:grid-cols-10 gap-4 pr-6 py-6" :class="{ 'border-t border-dashed border-primary-100': idx > 0 }">
            <BaseSelect :nameModel="`document[${idx}].documentType`" :listItens="documentsType" label="Tipo" />
            <BaseInput
              v-if="field.value && field.value.documentType && (field.value.documentType.id == 2 || field.value.documentType.id == 6)"
              class="md:col-span-3" :name="`document[${idx}].documentNumber`" type="text" label="Número documento"
              v-maska="['###.###.###-##', '##.###.###/####-##']" :value="field.value.documentNumber" />
            <BaseInput v-else class="md:col-span-3" :name="`document[${idx}].documentNumber`" type="text"
              label="Número documento" :value="field.value.documentNumber" />
            <BaseInput v-if="showInput(values.document[idx].documentType.id, 'expeditionDate')" class="md:col-span-2"
              :name="`document[${idx}].expeditionDate`" type="text" label="Data expedição" v-maska="'##/##/####'"
              :value="field.value.expeditionDate" />
            <BaseInput v-if="showInput(values.document[idx].documentType.id, 'series')" class="md:col-span-2"
              :name="`document[${idx}].series`" type="text" label="Série" :value="field.value.series" />
            <BaseInput v-if="showInput(values.document[idx].documentType.id, 'expeditionUf')" class="md:col-span-2"
              :name="`document[${idx}].expeditionUf`" type="text" label="UF expedição"
              :value="field.value.expeditionUf" />
            <BaseInput v-if="showInput(values.document[idx].documentType.id, 'expeditionAgency')" class="md:col-span-2"
              :name="`document[${idx}].expeditionAgency`" type="text" label="Orgão expedidor"
              :value="field.value.expeditionAgency" />
            <BaseInput v-if="showInput(values.document[idx].documentType.id, 'zone')" class="md:col-span-2"
              :name="`document[${idx}].zone`" type="text" label="Zona" :value="field.value.zone" />
            <BaseInput v-if="showInput(values.document[idx].documentType.id, 'session')" class="md:col-span-2"
              :name="`document[${idx}].session`" type="text" label="Sessão" :value="field.value.session" />
            <BaseInput v-if="showInput(values.document[idx].documentType.id, 'city')" class="md:col-span-2"
              :name="`document[${idx}].city`" type="text" label="Cidade" :value="field.value.city" />
            <button class="absolute right-0 top-6 text-left w-1 col-span-1 text-negative-400 font-bold hover:opacity-70" type="button"
              @click="(!field.value.id ? remove(idx) : modalDelete.open({ objectToDelete: field.value }))"
              v-if="fields.length > 1">X</button>
          </div>
        </fieldset>
        <a class="inline-block underline text-primary-300 cursor-pointer hover:opacity-70 mt-4"
          @click="push({ documentType: { id: null, name: null }, collaboratorId: collaboratorId })">Adicionar novo
          documento</a>
      </FieldArray>
    </div>
    <div class="space-y-4 md:space-y-0 md:flex justify-between">
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