<script setup>
import { watch, ref, computed } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import { useRoute, useRouter } from 'vue-router';

import BaseIcons from '@/components/BaseIcons.vue'

import { useSearch } from '@/composables'
import UserService from '../../../../services/user.service';

const router = useRouter()
const route = useRoute()
const {
  searchFormValues,
  searchFormValidation,
  setSearchParams,
} = useSearch()

const data = ref()
let currentPage = computed(() => Number(route.query.page || 1))

watch(
  () => route.query,
  async searchParams => {
    data.value = await UserService.findAll(searchParams);
  },
  { immediate: true }
)

function edite(id) {
  router.push({ name: 'users-edit', params: { id } })
}

function onSearchSubmit({ field, q }) {
  setSearchParams({ field, q })
}

</script>

<template>
  <Form v-slot="{ resetForm }" class="relative flex-1 md:ml-14 md:mr-8 mt-8" :initial-values="searchFormValues"
    :validation-schema="searchFormValidation" @submit="onSearchSubmit">
    <div
      class="py-2 px-6 rounded-full focus-within:ring-1 focus-within:ring-inset focus-within:ring-primary-500 border border-primary-300">
      <div class="flex space-x-4">
        <Field v-slot="{ field }" name="field">
          <select v-bind="field" class="activities-search pr-6 text-neutral-500 focus-visible:outline-none">
            <option value="name" selected>Nome</option>
            <option value="email">email</option>
          </select>
        </Field>
        <Field v-slot="{ field }" name="q" :validate-on-blur="false" :validate-on-change="false">
          <input v-focus v-bind="field" type="text" autocomplete="off"
            class="w-full outline-none border-l border-primary-500 p-2">
        </Field>
        <button type="submit">
          <BaseIcons name="search" class="w-8 h-8 text-primary-500 m-auto" />
        </button>
        <button v-if="searchFormValues.q" type="button"
          @click="setSearchParams({ field: undefined, q: undefined }), resetForm({ values: { field: 'name', q: undefined } })">
          <BaseIcons name="close" class="w-4 h-4 text-negative-300 m-auto" />
        </button>
      </div>
    </div>
    <ErrorMessage name="q" class="text-negative-300 text-sm" />
  </Form>
  <table class="table-auto w-full mt-4">
    <thead class="text-lg text-left bg-primary-300">
      <tr class="rounded-lg text-white">
        <th class="border border-primary-300 p-2 min-w-[150px]">Nome</th>
        <th class="hidden md:table-cell border border-primary-300 p-2">E-mail</th>
        <th class="border border-primary-300 p-2">Perfil</th>
        <th class="border border-primary-300 p-2"></th>
      </tr>
    </thead>
    <template v-if="data && data.list.length">
      <tbody class="border border-primary-500">
        <tr v-for="user of data.list" :key="user.id">
          <td class="border border-primary-300 p-2 truncate max-w-[150px] md:max-w-[250px]">{{ user.name }}</td>
          <td class="hidden md:table-cell border border-primary-300 p-2">{{ user.email }}</td>
          <td class="border border-primary-300 p-2 truncate max-w-[80px] md:max-w-[250px]">{{ user.roles.name }}</td>
          <td class="border border-primary-300 p-2"><a class="font-bold text-primary-500 cursor-pointer hover:opacity-70"
              @click="edite(user.id)">Editar</a></td>
        </tr>
      </tbody>
    </template>
    <template v-else>
      <tbody class="border border-primary-500">
        <tr>
          <td colspan="4" class="text-center p-6">
            <h1 class="text-primary-500 font-bold text-2xl">Nenhum usuário encontrado</h1>
          </td>
        </tr>
      </tbody>
    </template>
  </table>
  <div v-if="data && data.list.length"
    class="flex justify-between items-center p-4 text-sm md:text-base border-b border-l border-r border-primary-300">
    <p>Exibindo 1 - {{ data.pages }} de {{ data.totalRegisters }} registros</p>
    <div>
      <button v-if="currentPage > 1"
        class="relative py-2 px-4 text-sm font-normal border border-primary-500 hover:border-primary-300 hover:z-10 active:bg-neutral-400 transition-colors duration-200"
        @click="setSearchParams({ page: currentPage - 1 })">
        &lt;
      </button>
      <button v-for="page of data.pages" :key="page"
        class="hidden md:inline-block relative py-2 px-4 -ml-px text-sm font-normal border border-primary-500 hover:border-primary-300 hover:z-10 active:bg-neutral-400 transition-colors duration-200"
        :class="{ 'text-white bg-primary-500': currentPage === page }" @click="setSearchParams({ page })">
        {{ page }}
      </button>
      <button v-if="currentPage < data.pages"
        class="relative py-2 px-4 -ml-px text-sm font-normal border border-primary-500 hover:border-primary-300 active:bg-neutral-400 transition-colors duration-200"
        @click="setSearchParams({ page: currentPage + 1 })">
        &gt;
      </button>
    </div>
  </div>
</template>