<template>
  <h1 class="text-primary-500 text-xl font-bold uppercase">Cadastro</h1>
  <Form v-slot="{ values, isSubmitting }" @submit="onSubmit" :initial-values="collaboratorFormValues"
    :validation-schema="collaboratorForm" class="space-y-4">
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
    <div class="space-y-4 border border-primary-100 rounded p-4 mt-2">
      <h2 class="text-primary-500 text-lg font-bold">Documentos</h2>
      <FieldArray name="document" v-slot="{ fields, push, remove }">
        <fieldset class="InputGroup" v-for="(field, idx) in fields" :key="field.key">
          <div class="relative grid grid-cols-10 gap-4 pr-6">
            <BaseSelect :nameModel="`document[${idx}].type`" :listItens="documentsType" label="Tipo" />
            <BaseInput v-if="field.value && field.value.type && field.value.type.id == 2" class="col-span-3"
              :name="`document[${idx}].number`" type="text" label="Número documento" v-maska="'###.###.###-##'" />
            <BaseInput v-else class="col-span-3" :name="`document[${idx}].number`" type="text"
              label="Número documento" />
            <BaseInput class="col-span-2" :name="`document[${idx}].expeditionDate`" type="text" label="Data expedição"
              v-maska="'##/##/####'" />
            <BaseInput class="col-span-2" :name="`document[${idx}].expeditionUf`" type="text" label="UF expedição" />
            <BaseInput class="col-span-2" :name="`document[${idx}].expeditionAgency`" type="text"
              label="Orgão expedidor" />
            <button class="absolute right-0 top-2.5 col-span-1 text-negative-400 font-bold hover:opacity-70"
              type="button" @click="remove(idx)">X</button>
          </div>
        </fieldset>
        <a class="inline-block underline text-primary-300 cursor-pointer hover:opacity-70 mt-4"
          @click="push()">Adicionar novo documento</a>
      </FieldArray>
    </div>
    <div class="space-y-4 border border-primary-100 rounded p-4 mt-2">
      <h2 class="text-primary-500 text-lg font-bold">Contatos</h2>
      <FieldArray name="contact" v-slot="{ fields, push, remove }">
        <fieldset class="InputGroup" v-for="(field, idx) in fields" :key="field.key">
          <div class="relative grid grid-cols-10 gap-4 pr-6">
            <BaseSelect :nameModel="`contact[${idx}].type`" :listItens="contactTypes" label="Tipo" />
            <BaseInput class="col-span-3" :name="`contact[${idx}].phoneNumber`" type="text" label="Número"
              v-maska="['(##) ####-####', '(##) #####-####']" />
            <button class="inline text-left w-1 col-span-1 text-negative-400 font-bold hover:opacity-70" type="button"
              @click="remove(idx)">X</button>
          </div>
        </fieldset>
        <a class="inline-block underline text-primary-300 cursor-pointer hover:opacity-70 mt-4"
          @click="push()">Adicionar novo contato</a>
      </FieldArray>
    </div>
    <div class="space-y-4 border border-primary-100 rounded p-4 mt-2">
      <h2 class="text-primary-500 text-lg font-bold">Endereço</h2>
      <div class="grid grid-cols-4 gap-4">
        <BaseInput name="address.zipCode" type="text" v-maska="'#####-###'" label="CEP"
          @change="searchCep(values.address.zipCode)" @focus="values.address = {}" />
      </div>
      <div class="grid grid-cols-4 gap-4">
        <BaseInput class="col-span-3" name="address.place" type="text" label="Logradouro" disabled />
        <BaseInput class="col-span-1" name="address.number" type="text" label="Número" />
        <BaseInput class="col-span-2" name="address.complement" type="text" label="Complemento" />
        <BaseInput class="col-span-2" name="address.district" type="text" label="Bairro" disabled />
        <BaseInput class="col-span-1" name="address.state" type="text" label="Estado" disabled />
        <BaseInput class="col-span-1" name="address.city" type="text" label="Cidade" disabled />

      </div>
    </div>
    <div class="space-y-4 border border-primary-100 rounded p-4 mt-2">
      <h2 class="text-primary-500 text-lg font-bold">Dependentes</h2>
      <FieldArray name="dependent" v-slot="{ fields, push, remove }">
        <fieldset class="InputGroup" v-for="(field, idx) in fields" :key="field.key">
          <div class="relative grid grid-cols-10 gap-4 pr-6">
            <BaseSelect :nameModel="`dependent[${idx}].type`" :listItens="dependentTypes" label="Tipo" />
            <BaseInput class="col-span-3" :name="`dependent[${idx}].name`" type="text" label="Nome" />
            <BaseInput class="col-span-3" :name="`dependent[${idx}].birthDate`" type="text" label="Data de nascimento"
              v-maska="'##/##/####'" />
            <button class="inline text-left w-1 col-span-1 text-negative-400 font-bold hover:opacity-70" type="button"
              @click="remove(idx)">X</button>
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
import useToastNotify from '@/hooks/toast'

import BaseInput from '@/components/BaseInput.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import BaseButton from '@/components/BaseButton.vue'

import { useRegistration } from '@/composables'

import refDataService from '../../../services/refData.service'
import userService from '../../../services/user.service';
import externalApi from '../../../services/externalApi.service';

const { notify } = useToastNotify();
const {
  collaboratorForm
} = useRegistration()

let collaboratorFormValues = ref({})
let ethnicity = ref([]);
let maritalStatus = ref([]);
let gender = ref([]);
let documentsType = ref([]);
let schoolingTypes = ref([]);
let contactTypes = ref([]);
let dependentTypes = ref([]);

onMounted(async () => {
  ethnicity.value = await refDataService.getEthnicityTypes()
  maritalStatus.value = await refDataService.getMaritalStatusTypes()
  gender.value = await refDataService.getGenderTypes()
  documentsType.value = await refDataService.getDocumentsTypes()
  schoolingTypes.value = await refDataService.getSchoolingTypes()
  contactTypes.value = await refDataService.getContactTypes()
  dependentTypes.value = await refDataService.getDependentTypes()
})

async function searchCep(cep) {
  if (cep && cep.length === 9) {
    const data = await externalApi.cep(cep);
    if (data.erro) {
      notify('DANGER', "CEP inválido")
      collaboratorFormValues.value = {}
    } else {
      collaboratorFormValues.value.address = {
        district: data.bairro,
        place: data.logradouro,
        state: data.uf,
        city: data.localidade,
      }
    }
  }
}
</script>