<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import CollaboratorService from '../../../../services/collaborator.service';

const route = useRoute()
const router = useRouter()

let collaboratorId = ref(route.query.id)
let collaboratorType = ref(route.params.type)
let registrationVerification = ref()

watch(
  () => route.query,
  async () => {
    collaboratorId.value = route.query.id
    collaboratorType.value = route.params.type
    if (collaboratorId.value) {
      registrationVerification.value = await CollaboratorService.registrationVerification(collaboratorId.value)
      collaboratorType.value = registrationVerification.value.contractType
    }
  },
  { immediate: true }
);

function navigationMenu(path) {
  if (collaboratorId.value) {
    router.push({ name: path, query: { id: collaboratorId.value, type: collaboratorType.value } });
  }
}
</script>

<template>
  <h1 class="text-primary-500 text-xl font-bold uppercase">Cadastro</h1>
  <div class="overflow-x-auto max-w-screen-xl mx-auto">
    <ol class="items-center flex justify-between my-8 divide-x divide-primary-100/20 min-w-[1280px]">
      <li class="relative text-center m-auto w-full cursor-pointer hover:opacity-70"
        :class="{ 'cursor-default hover:opacity-100': !collaboratorId }" @click="navigationMenu('personal-data')">
        <p class="flex items-center justify-center rounded-full text-sm text-white font-bold bg-primary-100 bg-opacity-60 w-8 h-8 m-auto"
          :class="{ 'bg-primary-500 bg-opacity-100': registrationVerification && registrationVerification.personalData == 1, 'bg-primary-400': route.name == 'personal-data' }">
          1
        </p>
        <p class="text-sm text-primary-300"
          :class="{ 'font-bold': registrationVerification && registrationVerification.personalData == 1 }">
          Dados pessoais</p>
      </li>
      <li class="relative text-center m-auto w-full cursor-pointer hover:opacity-70"
        :class="{ 'cursor-default hover:opacity-100': !collaboratorId }" @click="navigationMenu('documents')">
        <p class="flex items-center justify-center rounded-full text-sm text-white font-bold bg-primary-100 bg-opacity-60 w-8 h-8 m-auto"
          :class="{ 'bg-primary-500 bg-opacity-100': registrationVerification && registrationVerification.documents == 1, 'bg-primary-400': route.name == 'documents' && collaboratorId, 'bg-neutral-300': !collaboratorId }">
          2
        </p>
        <p class="text-sm text-primary-300"
          :class="{ 'font-bold': registrationVerification && registrationVerification.documents == 1 }">Documentos</p>
      </li>
      <li class="relative text-center m-auto w-full cursor-pointer hover:opacity-70"
        :class="{ 'cursor-default hover:opacity-100': !collaboratorId }" @click="navigationMenu('contacts')">
        <p class="flex items-center justify-center rounded-full text-sm text-white font-bold bg-primary-100 bg-opacity-60 w-8 h-8 m-auto"
          :class="{ 'bg-primary-500 bg-opacity-100': registrationVerification && registrationVerification.contacts == 1, 'bg-primary-400': route.name == 'contacts' && collaboratorId, 'bg-neutral-300': !collaboratorId }">
          3
        </p>
        <p class="text-sm text-primary-300"
          :class="{ 'font-bold': registrationVerification && registrationVerification.contacts == 1 }">Contatos</p>
      </li>
      <li class="relative text-center m-auto w-full cursor-pointer hover:opacity-70"
        :class="{ 'cursor-default hover:opacity-100': !collaboratorId }" @click="navigationMenu('addresses')">
        <p class="flex items-center justify-center rounded-full text-sm text-white font-bold bg-primary-100 bg-opacity-60 w-8 h-8 m-auto"
          :class="{ 'bg-primary-500 bg-opacity-100': registrationVerification && registrationVerification.addressess == 1, 'bg-primary-400': route.name == 'addresses' && collaboratorId, 'bg-neutral-300': !collaboratorId }">
          4
        </p>
        <p class="text-sm text-primary-300"
          :class="{ 'font-bold': registrationVerification && registrationVerification.addressess == 1 }">Endereço</p>
      </li>
      <li class="relative text-center m-auto w-full cursor-pointer hover:opacity-70"
        :class="{ 'cursor-default hover:opacity-100': !collaboratorId }" @click="navigationMenu('dependents')">
        <p class="flex items-center justify-center rounded-full text-sm text-white font-bold bg-primary-100 bg-opacity-60 w-8 h-8 m-auto"
          :class="{ 'bg-primary-500 bg-opacity-100': registrationVerification && registrationVerification.dependents == 1, 'bg-primary-400': route.name == 'dependents' && collaboratorId, 'bg-neutral-300': !collaboratorId }">
          5
        </p>
        <p class="text-sm text-primary-300"
          :class="{ 'font-bold': registrationVerification && registrationVerification.dependents == 1 }">Dependentes</p>
      </li>
      <li class="relative text-center m-auto w-full cursor-pointer hover:opacity-70"
        :class="{ 'cursor-default hover:opacity-100': !collaboratorId }" @click="navigationMenu('bank')">
        <p class="flex items-center justify-center rounded-full text-sm text-white font-bold bg-primary-100 bg-opacity-60 w-8 h-8 m-auto"
          :class="{ 'bg-primary-500 bg-opacity-100': registrationVerification && registrationVerification.bank == 1, 'bg-primary-400': route.name == 'bank' && collaboratorId, 'bg-neutral-300': !collaboratorId }">
          6
        </p>
        <p class="text-sm text-primary-300"
          :class="{ 'font-bold': registrationVerification && registrationVerification.bank == 1 }">Dados Bancários</p>
      </li>
      <li class="relative text-center m-auto w-full cursor-pointer hover:opacity-70"
        :class="{ 'cursor-default hover:opacity-100': !collaboratorId }" @click="navigationMenu('contract')">
        <p class="flex items-center justify-center rounded-full text-sm text-white font-bold bg-primary-100 bg-opacity-60 w-8 h-8 m-auto"
          :class="{ 'bg-primary-500 bg-opacity-100': registrationVerification && registrationVerification.contract == 1, 'bg-primary-400': route.name == 'contract' && collaboratorId, 'bg-neutral-300': !collaboratorId }">
          7
        </p>
        <p class="text-sm text-primary-300"
          :class="{ 'font-bold': registrationVerification && registrationVerification.contract == 1 }">Dados do Contrato
        </p>
      </li>
      <li class="relative text-center m-auto w-full cursor-pointer hover:opacity-70"
        :class="{ 'cursor-default hover:opacity-100': !collaboratorId }" @click="navigationMenu('professional')">
        <p class="flex items-center justify-center rounded-full text-sm text-white font-bold bg-primary-100 bg-opacity-60 w-8 h-8 m-auto"
          :class="{ 'bg-primary-500 bg-opacity-100': registrationVerification && registrationVerification.professionalData == 1, 'bg-primary-400': route.name == 'professional' && collaboratorId, 'bg-neutral-300': !collaboratorId }">
          8
        </p>
        <p class="text-sm text-primary-300"
          :class="{ 'font-bold': registrationVerification && registrationVerification.professionalData == 1 }">Dados
          Profissionais</p>
      </li>
      <li class="relative text-center m-auto w-full cursor-pointer hover:opacity-70"
        :class="{ 'cursor-default hover:opacity-100': !collaboratorId }"
        @click="navigationMenu('transportation-vouchers')">
        <p class="flex items-center justify-center rounded-full text-sm text-white font-bold bg-primary-100 bg-opacity-60 w-8 h-8 m-auto"
          :class="{ 'bg-primary-500 bg-opacity-100': registrationVerification && registrationVerification.transportationVouchers == 1, 'bg-primary-400': route.name == 'transportation-vouchers' && collaboratorId, 'bg-neutral-300': !collaboratorId }">
          9
        </p>
        <p class="text-sm text-primary-300"
          :class="{ 'font-bold': registrationVerification && registrationVerification.transportationVouchers == 1 }">
          Vale Transporte</p>
      </li>
      <li v-if="collaboratorType == 'pj'" class="relative text-center m-auto w-full cursor-pointer hover:opacity-70"
        :class="{ 'cursor-default hover:opacity-100': !collaboratorId }" @click="navigationMenu('company')">
        <p class="flex items-center justify-center rounded-full text-sm text-white font-bold bg-primary-100 bg-opacity-60 w-8 h-8 m-auto"
          :class="{ 'bg-primary-500 bg-opacity-100': registrationVerification && registrationVerification.companyData == 1, 'bg-primary-400': route.name == 'company' && collaboratorId, 'bg-neutral-300': !collaboratorId }">
          10
        </p>
        <p class="text-sm text-primary-300"
          :class="{ 'font-bold': registrationVerification && registrationVerification.companyData == 1 }">Dados da Empresa</p>
      </li>
    </ol>
  </div>
  <router-view></router-view>
</template>