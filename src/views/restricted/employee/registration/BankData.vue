<template>
  <Form v-slot="{ isSubmitting }" @submit="onSubmit" :initial-values="bankFormValues"
    :validation-schema="bankForm" class="space-y-4">
    <div class="space-y-4 border border-primary-100 rounded p-4 mt-2">
      <h2 class="text-primary-500 text-lg font-bold">Dados Bancários</h2>
      <div class="grid grid-cols-4 gap-4">
        <BaseInput name="name" type="text" label="Banco" />
        <BaseInput name="agency" type="text" label="Agência" v-maska="['###', '###-#', '###-##']" />
        <BaseInput name="account" type="text" label="Conta" v-maska="['###-#', '####-#', '#####-#', '######-#']" />
        <BaseSelect nameModel="accountType" :listItens="accountType" label="Tipo de conta" />
        <BaseSelect nameModel="accountCategory" :listItens="accountCategory" label="Categoria" />
        <BaseSelect nameModel="pixKeyType" :listItens="pixKeyType" label="Tipo de chave pix" />
        <BaseInput class="col-span-2" name="pixKey" type="text" label="Chave Pix" />
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
import BaseSelect from '@/components/BaseSelect.vue'

import { useRegistration } from '@/composables'

const router = useRouter()

const {
  bankForm
} = useRegistration()

let bankFormValues = ref({})
const accountType = ref([
  { id: 'current', name: 'Corrente' },
  { id: 'savings', name: 'Poupança' },
])
const accountCategory = ref([
  { id: 'pf', name: 'Pessoa física' },
  { id: 'pj', name: 'Pessoa jurídica' },
])
const pixKeyType = ref([
  { id: 'telephone', name: 'Telefone' },
  { id: 'email', name: 'E-mail' },
  { id: 'cpf', name: 'CPF' },
  { id: 'cnpj', name: 'CNPJ' },
  { id: 'random', name: 'Aleatória' },
])

async function onSubmit(values) {
  router.push({ name: 'contract' });
}
</script>