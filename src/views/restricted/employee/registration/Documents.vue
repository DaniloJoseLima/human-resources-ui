<template>
  <Form v-slot="{ values, isSubmitting }" @submit="onSubmit" :initial-values="documentsFormValues"
    :validation-schema="documentsForm" class="space-y-4">
    <div class="space-y-4 border border-primary-100 rounded p-4 mt-2">
      <h2 class="text-primary-500 text-lg font-bold">Documentos</h2>
      <FieldArray name="document" v-slot="{ fields, push, remove }">
        <fieldset class="InputGroup" v-for="(field, idx) in fields" :key="field.key">
          <div class="relative grid grid-cols-10 gap-4 pr-6">
            <BaseSelect :nameModel="`document[${idx}].type`" :listItens="documentsType" label="Tipo" />
            <BaseInput v-if="field.value && field.value.type && (field.value.type.id == 2 || field.value.type.id == 6)"
              class="col-span-3" :name="`document[${idx}].number`" type="text" label="Número documento"
              v-maska="['###.###.###-##', '##.###.###/####-##']" />
            <BaseInput v-else class="col-span-3" :name="`document[${idx}].number`" type="text"
              label="Número documento" />
            <BaseInput v-if="showInput(values.document[idx].type.id, 'expeditionDate')" class="col-span-2"
              :name="`document[${idx}].expeditionDate`" type="text" label="Data expedição" v-maska="'##/##/####'" />
            <BaseInput v-if="showInput(values.document[idx].type.id, 'series')" class="col-span-2"
              :name="`document[${idx}].series`" type="text" label="Série" />
            <BaseInput v-if="showInput(values.document[idx].type.id, 'expeditionUf')" class="col-span-2"
              :name="`document[${idx}].expeditionUf`" type="text" label="UF expedição" />
            <BaseInput v-if="showInput(values.document[idx].type.id, 'expeditionAgency')" class="col-span-2"
              :name="`document[${idx}].expeditionAgency`" type="text" label="Orgão expedidor" />

              
            <BaseInput v-if="showInput(values.document[idx].type.id, 'zone')" class="col-span-2"
              :name="`document[${idx}].zone`" type="text" label="Zona" />
            <BaseInput v-if="showInput(values.document[idx].type.id, 'session')" class="col-span-2"
              :name="`document[${idx}].session`" type="text" label="Sessão" />
            <BaseInput v-if="showInput(values.document[idx].type.id, 'city')" class="col-span-2"
              :name="`document[${idx}].city`" type="text" label="Cidade" />
            <button class="absolute right-0 top-2.5 col-span-1 text-negative-400 font-bold hover:opacity-70"
              type="button" @click="remove(idx)" v-if="idx > 0">X</button>
          </div>
        </fieldset>
        <a class="inline-block underline text-primary-300 cursor-pointer hover:opacity-70 mt-4"
          @click="push()">Adicionar novo documento</a>
      </FieldArray>
    </div>
    <BaseButton type="submit" class="md:w-40 text-right m-auto mr-0" :loading="isSubmitting" outline>Salvar</BaseButton>
  </Form>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { Form, FieldArray } from 'vee-validate'
import { useRouter } from 'vue-router'

import BaseInput from '@/components/BaseInput.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import BaseButton from '@/components/BaseButton.vue'

import { useRegistration } from '@/composables'

import refDataService from '../../../../services/refData.service'

const {
  documentsForm
} = useRegistration()

const router = useRouter()

let documentsFormValues = ref({
  document: [{ "type": { "id": "2", "name": "CPF" } }],
})
let documentsType = ref([]);

onMounted(async () => {
  documentsType.value = await refDataService.getDocumentsTypes()
})

function showInput(documentTypeId, inputType) {
  if (documentTypeId == 1) {
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
  router.push({ name: 'contacts' });
}
</script>