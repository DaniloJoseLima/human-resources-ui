<template>
  <h1 class="text-primary-500 text-xl font-bold uppercase">Cadastro</h1>

  <ol class="items-center flex justify-between my-8 divide-x divide-primary-100/20">
    <li class="relative text-center m-auto w-full">
      <p class="flex items-center justify-center rounded-full text-sm text-white font-bold bg-primary-100 bg-opacity-60 w-8 h-8 m-auto"
        :class="{ 'bg-primary-500 bg-opacity-100': timeLineRoute > 1, 'bg-primary-200 bg-opacity-100': timeLineRoute == 1 }">
        1
      </p>
      <p class="text-sm text-primary-300">Dados pessoais</p>
    </li>
    <li class="relative text-center m-auto w-full">
      <p class="flex items-center justify-center rounded-full text-sm text-white font-bold bg-primary-100 bg-opacity-60 w-8 h-8 m-auto"
        :class="{ 'bg-primary-500 bg-opacity-100': timeLineRoute > 2, 'bg-primary-200 bg-opacity-100': timeLineRoute == 2 }">
        2
      </p>
      <p class="text-sm text-primary-300">Documentos</p>
    </li>
    <li class="relative text-center m-auto w-full">
      <p class="flex items-center justify-center rounded-full text-sm text-white font-bold bg-primary-100 bg-opacity-60 w-8 h-8 m-auto"
        :class="{ 'bg-primary-500 bg-opacity-100': timeLineRoute > 3, 'bg-primary-200 bg-opacity-100': timeLineRoute == 3 }">
        3
      </p>
      <p class="text-sm text-primary-300">Contatos</p>
    </li>
    <li class="relative text-center m-auto w-full">
      <p class="flex items-center justify-center rounded-full text-sm text-white font-bold bg-primary-100 bg-opacity-60 w-8 h-8 m-auto"
        :class="{ 'bg-primary-500 bg-opacity-100': timeLineRoute > 4, 'bg-primary-200 bg-opacity-100': timeLineRoute == 4 }">
        4
      </p>
      <p class="text-sm text-primary-300">Endereço</p>
    </li>
    <li class="relative text-center m-auto w-full">
      <p
        class="flex items-center justify-center rounded-full text-sm text-white font-bold bg-primary-100 bg-opacity-60 w-8 h-8 m-auto"
        :class="{ 'bg-primary-500 bg-opacity-100': timeLineRoute > 5, 'bg-primary-200 bg-opacity-100': timeLineRoute == 5 }">
        5
      </p>
      <p class="text-sm text-primary-300">Dependentes</p>
    </li>
    <li class="relative text-center m-auto w-full">
      <p
        class="flex items-center justify-center rounded-full text-sm text-white font-bold bg-primary-100 bg-opacity-60 w-8 h-8 m-auto"
        :class="{ 'bg-primary-500 bg-opacity-100': timeLineRoute > 6, 'bg-primary-200 bg-opacity-100': timeLineRoute == 6 }">
        6
      </p>
      <p class="text-sm text-primary-300">Dados Bancários</p>
    </li>
    <li class="relative text-center m-auto w-full">
      <p
        class="flex items-center justify-center rounded-full text-sm text-white font-bold bg-primary-100 bg-opacity-60 w-8 h-8 m-auto"
        :class="{ 'bg-primary-500 bg-opacity-100': timeLineRoute > 7, 'bg-primary-200 bg-opacity-100': timeLineRoute == 7 }">
        7
      </p>
      <p class="text-sm text-primary-300">Dados do Contrato</p>
    </li>
    <li class="relative text-center m-auto w-full">
      <p
        class="flex items-center justify-center rounded-full text-sm text-white font-bold bg-primary-100 bg-opacity-60 w-8 h-8 m-auto"
        :class="{ 'bg-primary-500 bg-opacity-100': timeLineRoute > 8, 'bg-primary-200 bg-opacity-100': timeLineRoute == 8 }">
        8
      </p>
      <p class="text-sm text-primary-300">Dados Profissionais</p>
    </li>
    <li class="relative text-center m-auto w-full">
      <p
        class="flex items-center justify-center rounded-full text-sm text-white font-bold bg-primary-100 bg-opacity-60 w-8 h-8 m-auto"
        :class="{ 'bg-primary-500 bg-opacity-100': timeLineRoute > 9, 'bg-primary-200 bg-opacity-100': timeLineRoute == 9 }">
        9
      </p>
      <p class="text-sm text-primary-300">Vale Transporte</p>
    </li>
    <li class="relative text-center m-auto w-full">
      <p
        class="flex items-center justify-center rounded-full text-sm text-white font-bold bg-primary-100 bg-opacity-60 w-8 h-8 m-auto"
        :class="{ 'bg-opacity-100': timeLineRoute == 10 }">
        10
      </p>
      <p class="text-sm text-primary-300">Dados da Empresa</p>
    </li>
  </ol>

  <router-view></router-view>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

let timeLineRoute = ref(1)

watch(
  () => route.name,
  async (name) => {
    timeLineRoute.value = name === 'personal-data' ? 1
      : name === 'documents' ? 2
        : name === 'contacts' ? 3
          : name === 'addresses' ? 4
          : name === 'dependents' ? 5
          : name === 'bank' ? 6
          : name === 'contract' ? 7
          : name === 'professional' ? 8
          : name === 'transportation-vouchers' ? 9
            : 10
  },
  { immediate: true }
);


</script>