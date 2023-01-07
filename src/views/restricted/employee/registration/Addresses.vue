<template>
  <Form v-slot="{ values, isSubmitting }" @submit="onSubmit" :initial-values="addressesFormValues"
    :validation-schema="addressesForm" class="space-y-4">
    <div class="space-y-4 border border-primary-100 rounded p-4 mt-2">
      <h2 class="text-primary-500 text-lg font-bold">Endereço</h2>
      <div class="grid grid-cols-4 gap-4">
        <BaseInput name="address.zipCode" type="text" v-maska="'#####-###'" label="CEP" @change="searchCep(values)"
          @focus="values.address = {}" />
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
    <BaseButton type="submit" class="md:w-40 text-right m-auto mr-0" :loading="isSubmitting" outline>Salvar</BaseButton>
  </Form>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { Form } from 'vee-validate'
import useToastNotify from '@/hooks/toast'
import { useRouter } from 'vue-router'

import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'

import { useRegistration } from '@/composables'

import externalApi from '../../../../services/externalApi.service';

const { notify } = useToastNotify();
const {
  addressesForm
} = useRegistration()

const router = useRouter()

let addressesFormValues = ref({})

onMounted(async () => {
})

async function searchCep(obj) {
  if (obj.address.zipCode && obj.address.zipCode.length === 9) {
    debugger
    const data = await externalApi.cep(obj.address.zipCode);
    if (data.erro) {
      notify('DANGER', "CEP inválido")
      addressesFormValues.value = {
        ...obj,
        address: {}
      }
    } else {
      addressesFormValues.value = {
        ...obj,
        address: {
          district: data.bairro,
          place: data.logradouro,
          state: data.uf,
          city: data.localidade,
        }
      }
    }
  }
}

async function onSubmit(values) {
  router.push({ name: 'dependents' });
}
</script>