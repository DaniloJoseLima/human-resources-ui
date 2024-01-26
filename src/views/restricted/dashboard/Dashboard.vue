<script setup>
import { onMounted, ref } from 'vue'

import CollaboratorService from '../../../services/collaborator.service';

let totalEmployees = ref({})
let monthBirthday = ref([])
let companyBirthday = ref([])

onMounted(async () => {
  await collaboratorTotalType()
  await collaboratorMonthBirthday()
  await collaboratorCompanyBirthday()
})

async function collaboratorTotalType() {
  await CollaboratorService.totalType().then((response) => {
    totalEmployees.value = response
  })
}

async function collaboratorMonthBirthday() {
  await CollaboratorService.monthBirthdayList().then((response) => {
    monthBirthday.value = response
  })
}

async function collaboratorCompanyBirthday() {
  await CollaboratorService.companyBirthdayList().then((response) => {
    companyBirthday.value = response
  })
}

</script>
<template>
  <section v-if="totalEmployees" class="text-center">
    <div class="grid lg:grid-cols-4 gap-x-4 gap-y-6">
      <div class="col-span-2 sm:col-span-1 border border-neutral-100 rounded-md p-4 shadow-md">
        <p class="text-lg text-primary-300 font-bold uppercase">Contratos CLT</p>
        <p class="text-primary-100 font-bold text-xl">{{ totalEmployees.countClt }}</p>
      </div>
      <div class="col-span-2 sm:col-span-1 border border-neutral-100 rounded-md p-4 shadow-md">
        <p class="text-lg text-primary-300 font-bold uppercase">Contratos Cooperado</p>
        <p class="text-primary-100 font-bold text-xl">{{ totalEmployees.countCooperated }}</p>
      </div>
      <div class="col-span-2 sm:col-span-1 border border-neutral-100 rounded-md p-4 shadow-md">
        <p class="text-lg text-primary-300 font-bold uppercase">Contratos Estágio</p>
        <p class="text-primary-100 font-bold text-xl">{{ totalEmployees.countInternship }}</p>
      </div>
      <div class="col-span-2 sm:col-span-1 border border-neutral-100 rounded-md p-4 shadow-md">
        <p class="text-lg text-primary-300 font-bold uppercase">Contratos PJ</p>
        <p class="text-primary-100 font-bold text-xl">{{ totalEmployees.countPj }}</p>
      </div>
      <div class="col-span-2 border border-neutral-100 rounded-md p-4 shadow-md">
        <p class="text-lg text-primary-300 font-bold uppercase mb-4">Aniversariantes do mês</p>
        <div v-if="monthBirthday.length > 0" class="space-y-2">
          <div v-for="collaborator in monthBirthday" :key="collaborator.id" class="flex">
            <p class="text-primary-100">{{ collaborator.name }} - {{ collaborator.birthDate }}</p>
          </div>
        </div>
        <div v-else>
          <p class="text-primary-100">Nenhum aniversariante esse mês.</p>
        </div>
      </div>
      <div class="col-span-2 border border-neutral-100 rounded-md p-4 shadow-md">
        <p class="text-lg text-primary-300 font-bold uppercase mb-4">Aniversário de empresa</p>
        <div v-if="companyBirthday.length > 0" class="space-y-2">
          <div v-for="collaborator in companyBirthday" :key="collaborator.id" class="flex">
            <p class="text-primary-100">{{ collaborator.name }} - {{ collaborator.birthDate }}</p>
          </div>
        </div>
        <div v-else>
          <p class="text-primary-100">Nenhum aniversário de empresa esse mês.</p>
        </div>
      </div>
    </div>
  </section>
</template>