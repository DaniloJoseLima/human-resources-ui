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

onMounted(async () => {
  documentsType.value = await refDataService.getDocumentsTypes()
  if (collaboratorId) {
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
      validateList.value = true
    })
  }
})

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
  if(!isRegister.value) {
    await CollaboratorService.saveDocuments(values).then((response) => {
      notify('SUCCESS', "Documentos salvo com sucesso!")
      router.push({ name: 'contacts', query: { id: collaboratorId, type: collaboratorType } });
    }, (error) => {
      const msg = {
        'error': 'Erro ao salvar informações.'
      }[error.response.data.message || 'Erro ao salvar.']
      notify('DANGER', msg)
    })
  } else {
    await CollaboratorService.updateDocuments(values).then((response) => {
      notify('SUCCESS', "Documentos atualizados com sucesso!")
    }, (error) => {
      const msg = {
        'error': 'Erro ao salvar informações.'
      }[error.response.data.message || 'Erro ao salvar.']
      notify('DANGER', msg)
    })
  }
}
</script>
<template>
  <Form v-if="validateList" v-slot="{ values, isSubmitting }" @submit="onSubmit" :initial-values="documentsFormValues"
    :validation-schema="documentsForm" class="space-y-4">
    <div class="space-y-4 border border-primary-100 rounded p-4 mt-2">
      <h2 class="text-primary-500 text-lg font-bold">Documentos</h2>
      <FieldArray name="document" v-slot="{ fields, push, remove }">
        <fieldset class="InputGroup" v-for="(field, idx) in fields" :key="field.key">
          <div class="relative grid grid-cols-10 gap-4 pr-6">
            <BaseSelect :nameModel="`document[${idx}].documentType`" :listItens="documentsType" label="Tipo" />
            <BaseInput
              v-if="field.value && field.value.documentType && (field.value.documentType.id == 2 || field.value.documentType.id == 6)"
              class="col-span-3" :name="`document[${idx}].documentNumber`" type="text" label="Número documento"
              v-maska="['###.###.###-##', '##.###.###/####-##']" :value="field.value.documentNumber" />
            <BaseInput v-else class="col-span-3" :name="`document[${idx}].documentNumber`" type="text"
              label="Número documento" :value="field.value.documentNumber" />
            <BaseInput v-if="showInput(values.document[idx].documentType.id, 'expeditionDate')" class="col-span-2"
              :name="`document[${idx}].expeditionDate`" type="text" label="Data expedição" v-maska="'##/##/####'"
              :value="field.value.expeditionDate" />
            <BaseInput v-if="showInput(values.document[idx].documentType.id, 'series')" class="col-span-2"
              :name="`document[${idx}].series`" type="text" label="Série" :value="field.value.series" />
            <BaseInput v-if="showInput(values.document[idx].documentType.id, 'expeditionUf')" class="col-span-2"
              :name="`document[${idx}].expeditionUf`" type="text" label="UF expedição"
              :value="field.value.expeditionUf" />
            <BaseInput v-if="showInput(values.document[idx].documentType.id, 'expeditionAgency')" class="col-span-2"
              :name="`document[${idx}].expeditionAgency`" type="text" label="Orgão expedidor"
              :value="field.value.expeditionAgency" />
            <BaseInput v-if="showInput(values.document[idx].documentType.id, 'zone')" class="col-span-2"
              :name="`document[${idx}].zone`" type="text" label="Zona" :value="field.value.zone" />
            <BaseInput v-if="showInput(values.document[idx].documentType.id, 'session')" class="col-span-2"
              :name="`document[${idx}].session`" type="text" label="Sessão" :value="field.value.session" />
            <BaseInput v-if="showInput(values.document[idx].documentType.id, 'city')" class="col-span-2"
              :name="`document[${idx}].city`" type="text" label="Cidade" :value="field.value.city" />
            <button class="absolute right-0 top-2.5 col-span-1 text-negative-400 font-bold hover:opacity-70" type="button"
              @click="remove(idx)" v-if="idx > 0">X</button>
          </div>
        </fieldset>
        <a class="inline-block underline text-primary-300 cursor-pointer hover:opacity-70 mt-4"
          @click="push({ documentType: { id: null, name: null }, collaboratorId: collaboratorId })">Adicionar novo
          documento</a>
      </FieldArray>
    </div>
    <div class="flex justify-between">
      <router-link :to="{ name: 'employee-list' }">
        <BaseButton type="button" class="md:w-40 text-right m-auto mr-0" red>Voltar</BaseButton>
      </router-link>
      <BaseButton type="submit" class="md:w-40 text-right m-auto mr-0" :loading="isSubmitting" outline>Salvar</BaseButton>
    </div>
  </Form>
</template>