<template>
  <Form v-slot="{ isSubmitting }" @submit="onSubmit" :initial-values="contractFormValues"
    :validation-schema="contractForm" class="space-y-4">
    <div class="space-y-4 border border-primary-100 rounded p-4 mt-2">
      <h2 class="text-primary-500 text-lg font-bold">Dados do Contrato</h2>
      <div class="grid grid-cols-4 gap-4">
        <BaseInput name="wage" type="text" label="Salário" v-maska="['###,##', '#.###,##', '##.###,##', '###.###,##', '#.###.###,##']" />
        <BaseInput name="occupation" type="text" label="Função" />
        <BaseInput name="start" type="text" label="Inicio Vigência" v-maska="'##/##/####'" />
        <BaseInput name="workingHours" type="text" label="Jornada de Trabalho" v-maska="'##:## às ##:##'" />
      </div>
      <div>
        <p class="text-primary-500">Observações</p>
        <BaseTextArea nameModel="comments" placeholder="Descreva aqui suas observações." />
      </div>
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
import { ref } from 'vue'
import { Form } from 'vee-validate'
import { useRouter } from 'vue-router'

import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseTextArea from '@/components/BaseTextArea.vue'

import { useRegistration } from '@/composables'

const router = useRouter()

const {
  contractForm
} = useRegistration()

let contractFormValues = ref({})

async function onSubmit(values) {
  router.push({ name: 'professional' });
}
</script>