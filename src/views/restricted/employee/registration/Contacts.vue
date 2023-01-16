<template>
  <Form v-slot="{ values, isSubmitting }" @submit="onSubmit" :initial-values="contactsFormValues"
    :validation-schema="contactsForm" class="space-y-4">
    <div class="space-y-4 border border-primary-100 rounded p-4 mt-2">
      <h2 class="text-primary-500 text-lg font-bold">Contatos</h2>
      <FieldArray name="contact" v-slot="{ fields, push, remove }">
        <fieldset class="InputGroup" v-for="(field, idx) in fields" :key="field.key">
          <div class="relative grid grid-cols-10 gap-4 pr-6">
            <BaseSelect :nameModel="`contact[${idx}].type`" :listItens="contactTypes" label="Tipo" />
            <BaseInput class="col-span-3" :name="`contact[${idx}].phoneNumber`" type="text" label="Número"
              v-maska="['(##) ####-####', '(##) #####-####']" />
            <button class="inline text-left w-1 col-span-1 text-negative-400 font-bold hover:opacity-70" type="button"
              @click="remove(idx)" v-if="idx > 0">X</button>
          </div>
        </fieldset>
        <a class="inline-block underline text-primary-300 cursor-pointer hover:opacity-70 mt-4"
          @click="push()">Adicionar novo contato</a>
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
  contactsForm
} = useRegistration()

const router = useRouter()

let contactsFormValues = ref({
  contact: [{ "type": { "id": "2", "name": "Celular" } }]
})

let contactTypes = ref([]);

onMounted(async () => {
  contactTypes.value = await refDataService.getContactTypes()
})


async function onSubmit(values) {
  router.push({ name: 'addresses' });
}
</script>