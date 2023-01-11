<template>
  <Form v-slot="{ isSubmitting, values }" @submit="onSubmit" :initial-values="transportationVouchersFormValues"
    :validation-schema="transportationVouchersForm" class="space-y-4">
    <div class="space-y-4 border border-primary-100 rounded p-4 mt-2">
      <h2 class="text-primary-500 text-lg font-bold">Cadastro Vale Transporte</h2>
      <div class="grid grid-cols-12 gap-4">
        <BaseInput class="col-span-6" name="name" type="text" label="Nome" />
        <BaseInput class="col-span-3" name="rg" type="text" label="RG" />
        <BaseInput class="col-span-3" name="cpf" type="text" label="CPF" v-maska="'###.###.###-##'" />
        <div class="col-span-12 grid grid-cols-12 gap-2 border border-primary-100 rounded p-4">
          <p class="text-primary-500 font-medium col-span-12">Tipo de cartão de transporte</p>
          <BaseCheckbox class="col-span-2" name="typeCardTransport" label="Bilhete Único" value="singleTicket" />
          <BaseCheckbox class="col-span-2" name="typeCardTransport" label="TOP" value="topTicket" />
        </div>
      </div>
      <div class="grid grid-cols-12 gap-2 border border-primary-100 rounded p-4">
        <p class="text-primary-500 font-medium col-span-12">IDA - Meios de transportes utilizados</p>
        <p class="text-primary-500 col-span-12">Tipo</p>
        <BaseCheckbox class="col-span-2" name="typeTransportOneWay" label="Ônibus Municipal" value="municipal" />
        <BaseCheckbox class="col-span-2" name="typeTransportOneWay" label="Ônibus Intermunicipal" value="intermunicipal" />
        <BaseCheckbox class="col-span-2" name="typeTransportOneWay" label="Ônibus Fretado" value="chartered" />
        <BaseCheckbox class="col-span-2" name="typeTransportOneWay" label="Ônibus Especial" value="special" />
        <BaseCheckbox class="col-span-2" name="typeTransportOneWay" label="Metrô" value="subway" />
        <BaseCheckbox class="col-span-2" name="typeTransportOneWay" label="Trem" value="train" />
        <BaseCheckbox class="col-span-2" name="typeTransportOneWay" label="Trólebus" value="trolleybus" />
        <BaseCheckbox class="col-span-2" name="typeTransportOneWay" label="Outros" value="others" />
      </div>
      <div class="grid grid-cols-12 gap-2 border border-primary-100 rounded p-4">
        <p class="text-primary-500 font-medium col-span-12">VOLTA - Meios de transportes utilizados</p>
        <p class="text-primary-500 col-span-12">Tipo</p>
        <BaseCheckbox class="col-span-2" name="typeTransportReturn" label="Ônibus Municipal" value="municipal" />
        <BaseCheckbox class="col-span-2" name="typeTransportReturn" label="Ônibus Intermunicipal" value="intermunicipal" />
        <BaseCheckbox class="col-span-2" name="typeTransportReturn" label="Ônibus Fretado" value="chartered" />
        <BaseCheckbox class="col-span-2" name="typeTransportReturn" label="Ônibus Especial" value="special" />
        <BaseCheckbox class="col-span-2" name="typeTransportReturn" label="Metrô" value="subway" />
        <BaseCheckbox class="col-span-2" name="typeTransportReturn" label="Trem" value="train" />
        <BaseCheckbox class="col-span-2" name="typeTransportReturn" label="Trólebus" value="trolleybus" />
        <BaseCheckbox class="col-span-2" name="typeTransportReturn" label="Outros" value="others" />
      </div>
    </div>
    <BaseButton type="submit" class="md:w-40 text-right m-auto mr-0" :loading="isSubmitting" outline>Salvar</BaseButton>
  </Form>
</template>
<script setup>
import { ref } from 'vue'
import { Form } from 'vee-validate'
import { useRouter } from 'vue-router'

import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseCheckbox from '@/components/BaseCheckbox.vue'

import { useRegistration } from '@/composables'
import refDataService from '../../../../services/refData.service'

const router = useRouter()

const {
  transportationVouchersForm
} = useRegistration()

let transportationVouchersFormValues = ref({})

async function onSubmit(values) {
  router.push({ name: 'company' });
}
</script>