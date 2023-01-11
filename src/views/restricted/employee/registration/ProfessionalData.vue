<template>
  <Form v-slot="{ isSubmitting }" @submit="onSubmit" :initial-values="professionalDataFormValues"
    :validation-schema="professionalDataForm" class="space-y-4">
    <div class="space-y-4 border border-primary-100 rounded p-4 mt-2">
      <h2 class="text-primary-500 text-lg font-bold">Dados Profissionais</h2>
      <div class="grid grid-cols-4 gap-4">
        <BaseSelect nameModel="schoolingType" :listItens="schoolingTypes" label="Nível de escolaridade" />
      </div>
      <div>
        <FieldArray name="formation" v-slot="{ fields, push, remove }">
          <fieldset class="!mt-0 InputGroup" v-for="(field, idx) in fields" :key="field.key">
            <div :class="{ 'border-t border-dashed border-primary-100': idx > 0 }">
              <p class="text-primary-500 font-medium mt-4 mb-2">Formação Acadêmica {{ idx + 1 }}</p>
              <div class="relative grid grid-cols-12 gap-4 pr-6 pb-6">
                <BaseInput class="col-span-5" :name="`formation[${idx}].course`" type="text" label="Curso" />
                <BaseInput class="col-span-5" :name="`formation[${idx}].institution`" type="text" label="Instituição" />
                <BaseInput class="col-span-2" :name="`formation[${idx}].period`" type="text" label="Período" />
                <button class="absolute right-0 top-0 text-left w-1 text-negative-400 font-bold hover:opacity-70"
                  type="button" @click="remove(idx)">X</button>
              </div>
            </div>
          </fieldset>
          <a class="inline-block underline text-primary-300 cursor-pointer hover:opacity-70"
            @click="push()">Adicionar nova formação</a>
        </FieldArray>
      </div>
      <div>
        <FieldArray name="certification" v-slot="{ fields, push, remove }">
          <fieldset class="!mt-0 InputGroup" v-for="(field, idx) in fields" :key="field.key">
            <div :class="{ 'border-t border-dashed border-primary-100': idx > 0 }">
              <p class="text-primary-500 font-medium mt-4 mb-2">Certificação {{ idx + 1 }}</p>
              <div class="relative grid grid-cols-12 gap-4 pr-6 pb-6">
                <BaseInput class="col-span-5" :name="`certification[${idx}].name`" type="text" label="Nome" />
                <BaseInput class="col-span-2" :name="`certification[${idx}].number`" type="text" label="Número" />
                <BaseInput class="col-span-5" :name="`certification[${idx}].institution`" type="text"
                  label="Instituição" />
                <button class="absolute right-0 top-0 text-left w-1 text-negative-400 font-bold hover:opacity-70"
                  type="button" @click="remove(idx)">X</button>
              </div>
            </div>
          </fieldset>
          <a class="inline-block underline text-primary-300 cursor-pointer hover:opacity-70"
            @click="push()">Adicionar nova certificação</a>
        </FieldArray>
      </div>
    </div>
    <BaseButton type="submit" class="md:w-40 text-right m-auto mr-0" :loading="isSubmitting" outline>Salvar</BaseButton>
  </Form>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { Form, FieldArray } from 'vee-validate'
import { useRouter } from 'vue-router'

import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseSelect from '@/components/BaseSelect.vue'

import { useRegistration } from '@/composables'
import refDataService from '../../../../services/refData.service'

const router = useRouter()

const {
  professionalDataForm
} = useRegistration()

let professionalDataFormValues = ref({})
let schoolingTypes = ref([]);

onMounted(async () => {
  schoolingTypes.value = await refDataService.getSchoolingTypes()
})

async function onSubmit(values) {
  router.push({ name: 'transportation-vouchers' });
}
</script>