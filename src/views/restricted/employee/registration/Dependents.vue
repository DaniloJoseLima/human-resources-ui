<template>
  <Form v-slot="{ values, isSubmitting }" @submit="onSubmit" :initial-values="dependentFormValues"
    :validation-schema="dependentForm" class="space-y-4">
    <div class="space-y-4 border border-primary-100 rounded p-4 mt-2">
      <h2 class="text-primary-500 text-lg font-bold">Dependentes</h2>
      <FieldArray name="dependent" v-slot="{ fields, push, remove }">
        <fieldset class="!mt-0 InputGroup" v-for="(field, idx) in fields" :key="field.key">
          <div class="relative grid grid-cols-12 gap-4 pr-6 py-6" :class="{ 'border-t border-dashed border-primary-100' : idx > 0 }">
            <BaseSelect :nameModel="`dependent[${idx}].type`" :listItens="dependentTypes" label="Tipo" />
            <BaseInput class="col-span-5" :name="`dependent[${idx}].name`" type="text" label="Nome" />
            <BaseInput class="col-span-2" :name="`dependent[${idx}].birthDate`" type="text" label="Data de nascimento" v-maska="'##/##/####'" />
            <BaseSelect class="col-span-2" :nameModel="`dependent[${idx}].gender`" :listItens="gender" label="Genero" />
            <BaseSelect class="col-span-2" :nameModel="`dependent[${idx}].maritalStatus`" :listItens="maritalStatus" label="Estado civil" />
            <BaseInput class="col-span-3" :name="`dependent[${idx}].cpf`" type="text" label="Número do CPF" v-maska="'###.###.###-##'" />
            <BaseInput class="col-span-3" :name="`dependent[${idx}].rg`" type="text" label="Número do RG" />
            <BaseInput class="col-span-2" :name="`dependent[${idx}].expeditionDate`" type="text" label="Data expedição" v-maska="'##/##/####'" />
            <BaseInput class="col-span-2" :name="`dependent[${idx}].expeditionUf`" type="text" label="UF expedição" />
            <BaseInput class="col-span-2" :name="`dependent[${idx}].expeditionAgency`" type="text" label="Orgão expedidor" />
            <BaseInput class="col-span-6" :name="`dependent[${idx}].nameMother`" type="text" label="Nome da mãe" />
            <BaseInput class="col-span-6" :name="`dependent[${idx}].nameFather`" type="text" label="Nome do pai" />
            <BaseCheckbox class="col-span-3" :name="`dependent[${idx}].IRRF`" type="text" label="É dependente de IRRF?" :value="true"/>
            <button class="absolute right-0 top-6 text-left w-1 col-span-1 text-negative-400 font-bold hover:opacity-70" type="button"
              @click="remove(idx)">X</button>
          </div>
        </fieldset>
        <a class="inline-block underline text-primary-300 cursor-pointer hover:opacity-70 mt-4"
          @click="push()">Adicionar novo contato</a>
      </FieldArray>
    </div>
    <div class="flex justify-between">
      <router-link :to="{ name: 'employee-list' }" >
        <BaseButton type="button" class="md:w-40 text-right m-auto mr-0" red>Voltar</BaseButton>
      </router-link>
      <BaseButton type="submit" class="md:w-40 text-right m-auto mr-0" :loading="isSubmitting" outline>Salvar</BaseButton>
    </div>
  </Form>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { Form, FieldArray } from 'vee-validate'
import { useRouter } from 'vue-router'

import BaseInput from '@/components/BaseInput.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseCheckbox from '@/components/BaseCheckbox.vue'

import { useRegistration } from '@/composables'

import refDataService from '../../../../services/refData.service'

const {
  dependentForm
} = useRegistration()

const router = useRouter()

let dependentFormValues = ref({})
let dependentTypes = ref([]);
let gender = ref([]);
let maritalStatus = ref([]);

onMounted(async () => {
  dependentTypes.value = await refDataService.getDependentTypes()
  gender.value = await refDataService.getGenderTypes()
  maritalStatus.value = await refDataService.getMaritalStatusTypes()
})

async function onSubmit(values) {
  router.push({ name: 'bank' });
}
</script>