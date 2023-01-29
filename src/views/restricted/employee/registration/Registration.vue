
<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

import collaboratorService from '../../../../services/collaborator.service';

const route = useRoute()

const collaboratorId = route.params.id
const collaboratorType = route.params.type
let registrationVerification = ref()

watch(
  () => route.name,
  async () => {
    if (collaboratorId) {
      registrationVerification.value = await collaboratorService.registrationVerification(collaboratorId)
    }
  },
  { immediate: true }
);


</script>

<template>
  <h1 class="text-primary-500 text-xl font-bold uppercase">Cadastro</h1>
  <ol class="items-center flex justify-between my-8 divide-x divide-primary-100/20">
    <li class="relative text-center m-auto w-full">
      <p class="flex items-center justify-center rounded-full text-sm text-white font-bold bg-primary-100 bg-opacity-60 w-8 h-8 m-auto"
        :class="{ 'bg-primary-500 bg-opacity-100': registrationVerification && registrationVerification.personalData == 1 }">
        1
      </p>
      <p class="text-sm text-primary-300">Dados pessoais</p>
    </li>
    <li class="relative text-center m-auto w-full">
      <p class="flex items-center justify-center rounded-full text-sm text-white font-bold bg-primary-100 bg-opacity-60 w-8 h-8 m-auto"
        :class="{ 'bg-primary-500 bg-opacity-100': registrationVerification && registrationVerification.documents == 1 }">
        2
      </p>
      <p class="text-sm text-primary-300">Documentos</p>
    </li>
    <li class="relative text-center m-auto w-full">
      <p class="flex items-center justify-center rounded-full text-sm text-white font-bold bg-primary-100 bg-opacity-60 w-8 h-8 m-auto"
        :class="{ 'bg-primary-500 bg-opacity-100': registrationVerification && registrationVerification.contacts == 1 }">
        3
      </p>
      <p class="text-sm text-primary-300">Contatos</p>
    </li>
    <li class="relative text-center m-auto w-full">
      <p class="flex items-center justify-center rounded-full text-sm text-white font-bold bg-primary-100 bg-opacity-60 w-8 h-8 m-auto"
        :class="{ 'bg-primary-500 bg-opacity-100': registrationVerification && registrationVerification.addressess == 1 }">
        4
      </p>
      <p class="text-sm text-primary-300">Endereço</p>
    </li>
    <li class="relative text-center m-auto w-full">
      <p class="flex items-center justify-center rounded-full text-sm text-white font-bold bg-primary-100 bg-opacity-60 w-8 h-8 m-auto"
        :class="{ 'bg-primary-500 bg-opacity-100': registrationVerification && registrationVerification.dependents == 1 }">
        5
      </p>
      <p class="text-sm text-primary-300">Dependentes</p>
    </li>
    <li class="relative text-center m-auto w-full">
      <p class="flex items-center justify-center rounded-full text-sm text-white font-bold bg-primary-100 bg-opacity-60 w-8 h-8 m-auto"
        :class="{ 'bg-primary-500 bg-opacity-100': registrationVerification && registrationVerification.bank == 1 }">
        6
      </p>
      <p class="text-sm text-primary-300">Dados Bancários</p>
    </li>
    <li class="relative text-center m-auto w-full">
      <p class="flex items-center justify-center rounded-full text-sm text-white font-bold bg-primary-100 bg-opacity-60 w-8 h-8 m-auto"
        :class="{ 'bg-primary-500 bg-opacity-100': registrationVerification && registrationVerification.contract == 1 }">
        7
      </p>
      <p class="text-sm text-primary-300">Dados do Contrato</p>
    </li>
    <li class="relative text-center m-auto w-full">
      <p class="flex items-center justify-center rounded-full text-sm text-white font-bold bg-primary-100 bg-opacity-60 w-8 h-8 m-auto"
        :class="{ 'bg-primary-500 bg-opacity-100': registrationVerification && registrationVerification.ProfessionalData == 1 }">
        8
      </p>
      <p class="text-sm text-primary-300">Dados Profissionais</p>
    </li>
    <li class="relative text-center m-auto w-full">
      <p class="flex items-center justify-center rounded-full text-sm text-white font-bold bg-primary-100 bg-opacity-60 w-8 h-8 m-auto"
        :class="{ 'bg-primary-500 bg-opacity-100': registrationVerification && registrationVerification.TransportationVouchers == 1 }">
        9
      </p>
      <p class="text-sm text-primary-300">Vale Transporte</p>
    </li>
    <li v-if="(registrationVerification && registrationVerification.contractType == 'pj') || collaboratorType == 'pj'" class="relative text-center m-auto w-full">
      <p class="flex items-center justify-center rounded-full text-sm text-white font-bold bg-primary-100 bg-opacity-60 w-8 h-8 m-auto"
        :class="{ 'bg-opacity-100': registrationVerification && registrationVerification.CompanyData == 1 }">
        10
      </p>
      <p class="text-sm text-primary-300">Dados da Empresa</p>
    </li>
  </ol>

  <router-view></router-view>
</template>