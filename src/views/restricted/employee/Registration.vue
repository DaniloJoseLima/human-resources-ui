<template>
  <h1 class="text-primary-500 text-xl font-bold uppercase">Cadastro</h1>
  <Form v-slot="{ values, meta }" @submit="onSubmit" :initial-values="formValues" :validation-schema="validations"
    class="space-y-4">
    <div class="space-y-4 border border-primary-100 rounded p-4 mt-2">
      <h2 class="text-primary-500 text-lg font-bold">Dados pessoais</h2>
      <div class="grid grid-cols-4 gap-4">
        <BaseInput class="col-span-3" name="name" type="text" label="Nome" />
        <BaseInput name="birth" type="text" v-maska="'##/##/####'" label="Data de nascimento" />
        <BaseInput name="rg" type="text" label="RG" />
        <BaseInput name="dateExp" type="text" v-maska="'##/##/####'" label="Data expedição" />
        <BaseSelect nameModel="ufExp" :listItens="ufExp" label="UF expedição" />
        <BaseInput name="orgExp" type="text" label="Orgão expedição" />
        <BaseInput name="cpf" type="text" v-maska="'###.###.###-##'" label="CPF" />
        <BaseSelect nameModel="gender" :listItens="gender" label="Genero" />
        <BaseSelect nameModel="maritalStatus" :listItens="maritalStatus" label="Estado civil" />
      </div>
      <div class="grid grid-cols-4 gap-4">
        <BaseInput name="pis" type="text" label="Número do PIS" />
        <BaseInput name="pisDate" type="text" v-maska="'##/##/####'" label="Date de emissão do PIS" />
      </div>
      <div class="grid grid-cols-2 gap-4">
        <BaseInput name="nameMother" type="text" label="Nome da mãe" />
        <BaseInput name="nameFather" type="text" label="Nome do pai" />
      </div>
      <div class="grid grid-cols-3 gap-4">
        <BaseSelect nameModel="ethnicity" :listItens="ethnicity" label="Etnia" />
        <BaseInput name="nationality" type="text" label="Nacionalidade" />
        <BaseInput name="naturalness" type="text" label="Naturalidade" />
      </div>
      <div class="grid grid-cols-5 gap-4">
        <BaseSelect nameModel="education" :listItens="education" label="Escolaridade" />
      </div>
    </div>
    <div class="space-y-4 border border-primary-100 rounded p-4 mt-2">
      <h2 class="text-primary-500 text-lg font-bold">Contatos</h2>
      <div class="grid grid-cols-4 gap-4">
        <BaseInput name="phoneNumber" v-maska="'(##) ####-####'" type="text" label="Telefone residencial" />
        <BaseInput name="cellNumber" v-maska="'(##) #####-####'" type="text" label="Celular" />
        <BaseInput name="commercialNumber" v-maska="['(##) ####-####', '(##) #####-####']" type="text" label="Telefone comercial" />        
      </div>
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
      <div class="grid grid-cols-4 gap-4">
        
      </div>
      <div class="grid grid-cols-4 gap-4">

      </div>
    </div>
  </Form>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { Form } from 'vee-validate'
import * as yup from 'yup'
import useToastNotify from '@/hooks/toast'

import BaseInput from '@/components/BaseInput.vue'
import BaseSelect from '@/components/BaseSelect.vue'

import refDataService from '../../../services/refData.service'
import userService from '../../../services/user.service';
import externalApi from '../../../services/externalApi.service';

const { notify } = useToastNotify();

let formValues = ref({})

const validations = yup.object({
});

let ethnicity = ref([]);
let maritalStatus = ref([]);
let gender = ref([]);
let documents = ref([]);

const ufExp = [
  { id: 1, title: 'SP' },
  { id: 2, title: 'RJ' },
  { id: 3, title: 'MG' },
]


const education = [
  { id: 1, title :'Médio Completo' },
  { id: 1, title :'Superior Incompleto' },
  { id: 1, title :'Superior Completo' },
  { id: 1, title :'Pós-graduação Incompleto' },
  { id: 1, title :'Pós-graduação Completo' },
  { id: 1, title :'Mestrado Incompleto' },
  { id: 1, title :'Mestrado Completo' },
  { id: 1, title :'Doutorado Incompleto' },
  { id: 1, title :'Doutorado Completo' },
]


onMounted(async () => {
  ethnicity.value = await refDataService.getEthnicityTypes()
  maritalStatus.value = await refDataService.getMaritalStatusTypes()
  gender.value = await refDataService.getGenderTypes()
  documents.value = await refDataService.getDocumentsTypes()
  console.log(documents.value)
})

async function searchCep(cep) {
  if (cep && cep.length === 9) {
    const data = await externalApi.cep(cep);
    console.log(data)
    if (data.erro) {
      notify('DANGER', "CEP inválido")
      formValues.value.address = {}
    } else {
      formValues.value.address = {}
      formValues.value.address.district = data.bairro
      formValues.value.address.place = data.logradouro
      formValues.value.address.state = data.uf
      formValues.value.address.city = data.localidade
    }
  }
}
</script>