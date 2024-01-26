
<script setup>
import { watch, ref, computed } from 'vue'
import { Form, Field, ErrorMessage } from 'vee-validate'
import CollaboratorService from '../../../services/collaborator.service';
import { useRouter, useRoute } from 'vue-router'

import BaseButton from '@/components/BaseButton.vue'
import BaseIcons from '@/components/BaseIcons.vue'

import { useUtils, useSearch } from '@/composables'

const router = useRouter()
const route = useRoute()

const {
  searchFormValues,
  searchFormValidation,
  setSearchParams,
} = useSearch()

const { formatDate } = useUtils()
const data = ref()

const CONTRACT_TYPE_LIST = ref([
  {id: 'clt', name: 'CLT'},
  {id: 'internship', name: 'Estágio'},
  {id: 'cooperated', name: 'Cooperado'},
  {id: 'pj', name: 'PJ'},
])

let currentPage = computed(() => Number(route.query.page || 1))

watch(
  () => route.query,
  async searchParams => {
    data.value = await CollaboratorService.list(searchParams);
  },
  { immediate: true }
)

function edite(id, contractType) {
  router.push({ name: 'personal-data', query: { id, type: contractType } })
}

function onSearchSubmit({ field, q }) {
  setSearchParams({ field, q })
}

function contractType(id) {
  const type = CONTRACT_TYPE_LIST.value.find(ct => ct.id == id)
  return type ? type.name : null
}
</script>

<template>
  <section class="flex justify-end">
    <router-link :to="{ name: 'personal-data' }">
      <BaseButton type="button" outline class="p-2">Cadastrar</BaseButton>
    </router-link>
  </section>
  <Form v-slot="{ resetForm }" class="relative flex-1 md:ml-14 md:mr-8 mt-8" :initial-values="searchFormValues"
    :validation-schema="searchFormValidation" @submit="onSearchSubmit">
    <div
      class="py-2 px-6 rounded-full focus-within:ring-1 focus-within:ring-inset focus-within:ring-primary-500 border border-primary-100">
      <div class="flex space-x-4">
        <Field v-slot="{ field }" name="field">
          <select v-bind="field" class="activities-search pr-6 text-neutral-500 focus-visible:outline-none">
            <option value="name" selected>Nome</option>
            <option value="contractStart">Contratação</option>
            <option value="contractOccupation">Departamento</option>
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
        <th class="border border-primary-300 p-2">Contratação</th>
        <th class="hidden md:table-cell border border-primary-300 p-2">Departamento</th>
        <th class="hidden md:table-cell border border-primary-300 p-2">Data admissão</th>
        <th class="border border-primary-300 p-2"></th>
      </tr>
    </thead>
    <template v-if="data && data.list.length">
      <tbody class="border border-primary-500">
        <tr v-for="collaborator of data.list" :key="collaborator.id">
          <td class="border border-primary-300 p-2 truncate max-w-[150px] md:max-w-[250px]">{{ collaborator.name }}</td>
          <td class="border border-primary-300 p-2">{{ contractType(collaborator.contractType) }}</td>
          <td class="hidden md:table-cell border border-primary-300 p-2 truncate md:max-w-[150px]">{{ collaborator.contract.occupation ? collaborator.contract.occupation : 'Cadastro incompleto' }}</td>
          <td class="hidden md:table-cell border border-primary-300 p-2 truncate max-w-[150px]">{{ collaborator.contract.start ? formatDate(collaborator.contract.start, 'DD/MM/YYYY') : 'Cadastro incompleto' }}</td>
          <td class="border border-primary-300 p-2"><a
              class="font-bold text-primary-500 cursor-pointer hover:opacity-70"
              @click="edite(collaborator.id, collaborator.contractType)">Editar</a></td>
        </tr>
      </tbody>
    </template>
    <template v-else>
      <tbody class="border border-primary-300">
        <tr>
          <td colspan="4" class="text-center p-6">
            <h1 class="text-primary-500 font-bold text-2xl">Nenhum colaborador cadastrado</h1>
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
        class="relative py-2 px-4 text-sm font-normal border border-primary-300 hover:border-primary-300 hover:z-10 active:bg-neutral-400 transition-colors duration-200"
        @click="setSearchParams({ page: currentPage - 1 })">
        &lt;
      </button>
      <button v-for="page of data.pages" :key="page"
        class="hidden md:inline-block relative py-2 px-4 -ml-px text-sm font-normal border border-primary-300 hover:border-primary-300 hover:z-10 active:bg-neutral-400 transition-colors duration-200"
        :class="{ 'text-white bg-primary-300': currentPage === page }" @click="setSearchParams({ page })">
        {{ page }}
      </button>
      <button v-if="currentPage < data.pages"
        class="relative py-2 px-4 -ml-px text-sm font-normal border border-primary-300 hover:border-primary-300 active:bg-neutral-400 transition-colors duration-200"
        @click="setSearchParams({ page: currentPage + 1 })">
        &gt;
      </button>
    </div>
  </div>

</template>