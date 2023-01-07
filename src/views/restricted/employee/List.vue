<template>
  <section class="container flex space-x-4 justify-end">
    <router-link :to="{ name: 'personal-data', params: { type: 'pj' } }">
      <BaseButton type="button" outline class="p-2">Cadastrar PJ</BaseButton>
    </router-link>
    <router-link :to="{ name: 'personal-data', params: { type: 'clt' } }">
      <BaseButton type="button" outline class="p-2">Cadastrar CLT</BaseButton>
    </router-link>
  </section>
  <Form class="relative flex-1 md:ml-14 md:mr-8 mt-8">
    <div
      class="py-2 px-6 rounded-full focus-within:ring-1 focus-within:ring-inset focus-within:ring-primary-500 border border-primary-100">
      <div class="flex space-x-4">
          <select class="activities-search pr-6 text-neutral-500 focus-visible:outline-none">
            <option selected>Nome</option>
            <option>Contratação</option>
            <option>Departamento</option>
          </select>
        <Field v-slot="{ field }" name="q" :validate-on-blur="false" :validate-on-change="false">
          <input v-focus v-bind="field" type="text" autocomplete="off" class="w-full outline-none border-l border-primary-500 p-2">
        </Field>
        <button>
          <BaseIcons name="search" class="w-8 h-8 text-primary-500 m-auto" />
        </button>
      </div>
    </div>
    <ErrorMessage name="q" class="absolute ml-2 text-negative-300 text-sm" />
  </Form>
  <table class="table-auto w-full mt-4">
    <thead class="text-lg text-left bg-primary-100">
      <tr class="rounded-lg text-white">
        <th class="border border-primary-200 p-2">Nome</th>
        <th class="border border-primary-200 p-2">Contratação</th>
        <th class="border border-primary-200 p-2">Departamento</th>
        <th class="border border-primary-200 p-2">Data admissão</th>
      </tr>
    </thead>
    <template v-if="true">
      <tbody class="border border-primary-500">
        <tr>
          <td class="border border-primary-100 p-2">Laura Cristina</td>
          <td class="border border-primary-100 p-2">CLT</td>
          <td class="border border-primary-100 p-2">TI</td>
          <td class="border border-primary-100 p-2">01/01/2020</td>
        </tr>
        <tr>
          <td class="border border-primary-100 p-2">Flávia Rita</td>
          <td class="border border-primary-100 p-2">PJ</td>
          <td class="border border-primary-100 p-2">Recursos Humanos</td>
          <td class="border border-primary-100 p-2">21/07/2010</td>
        </tr>
      </tbody>
    </template>
    <template v-else>
      <tbody class="border border-primary-500">
        <tr>
          <td colspan="4" class="text-center p-6">
            <h1 class="text-primary-500 font-bold text-2xl">Nenhum colaborador cadastrado</h1>
          </td>
        </tr>
      </tbody>
    </template>
  </table>
  <div class="flex justify-between items-center p-4 text-sm md:text-base border-b border-l border-r border-primary-100">
    <p>Exibindo 1 - 10 de 100</p>
    <div>
      <button
        class="relative py-2 px-4 text-sm font-normal border border-primary-500 hover:border-primary-100 hover:z-10 active:bg-neutral-400 transition-colors duration-200">
        &lt;
      </button>
      <button v-for="page of 10" :key="page"
        class="hidden md:inline-block relative py-2 px-4 -ml-px text-sm font-normal border border-primary-500 hover:border-primary-100 hover:z-10 active:bg-neutral-400 transition-colors duration-200">
        {{ page }}
      </button>
      <button
        class="relative py-2 px-4 -ml-px text-sm font-normal border border-primary-500 hover:border-primary-100 active:bg-neutral-400 transition-colors duration-200">
        &gt;
      </button>
    </div>
  </div>

</template>

<script setup>
import { onMounted, computed, ref } from 'vue'
import { Form, Field } from 'vee-validate'
import userService from '../../../services/user.service';

import BaseButton from '@/components/BaseButton.vue'
import BaseIcons from '@/components/BaseIcons.vue'


onMounted(async () => {
  const data = await userService.getUser();
  console.log(data)
})
</script>