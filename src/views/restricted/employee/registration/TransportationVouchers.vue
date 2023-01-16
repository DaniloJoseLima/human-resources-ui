<template>
  <Form v-slot="{ isSubmitting, values }" @submit="onSubmit" :initial-values="transportationVouchersFormValues"
    :validation-schema="transportationVouchersForm" class="space-y-4">
    <div class="space-y-4 border border-primary-100 rounded p-4 mt-2">
      <h2 class="text-primary-500 text-lg font-bold">Cadastro Vale Transporte</h2>
      <div class="grid grid-cols-12 gap-4">
        <div class="col-span-12 grid grid-cols-12 gap-2 border border-primary-100 rounded p-4">
          <p class="text-primary-500 font-medium col-span-12">Tipo de cartão de transporte</p>
          <BaseCheckbox class="col-span-2" name="typeCardTransport" label="Bilhete Único" value="singleTicket" />
          <BaseCheckbox class="col-span-2" name="typeCardTransport" label="TOP" value="topTicket" />
        </div>
      </div>
      <div class="grid grid-cols-12 gap-2 border border-primary-100 rounded p-4">
        <p class="text-primary-500 font-medium col-span-12">IDA - Meios de transportes utilizados</p>
        <p class="text-primary-500 col-span-12">Tipo</p>
        <template v-for="transportType in transportTypes" :key="transportType.id">
          <BaseCheckbox class="col-span-2" name="typeTransportOneWay" :label="transportType.name"
            :value="transportType.id" />
          <div v-if="values.typeTransportOneWay && values.typeTransportOneWay.find(t => t === transportType.id)"
            class="grid grid-cols-12 gap-2 col-span-full border border-primary-100 rounded px-2 py-4">
            <p class="text-primary-500 col-span-12">Informações {{ transportType.name }}</p>
            <BaseSelect class="col-span-2" nameModel="transportCardType" :listItens="transportCardType" label="Tipo do cartão" />

          </div>
        </template>
      </div>
      <div class="grid grid-cols-12 gap-2 border border-primary-100 rounded p-4">
        <p class="text-primary-500 font-medium col-span-12">VOLTA - Meios de transportes utilizados</p>
        <p class="text-primary-500 col-span-12">Tipo</p>
        <template v-for="transportType in transportTypes" :key="transportType.id">
          <BaseCheckbox class="col-span-2" name="typeTransportReturn" :label="transportType.name"
            :value="transportType.id" />
        </template>
      </div>
    </div>
    <BaseButton type="submit" class="md:w-40 text-right m-auto mr-0" :loading="isSubmitting" outline>Salvar</BaseButton>
  </Form>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { Form } from 'vee-validate'
import { useRouter } from 'vue-router'

import BaseInput from '@/components/BaseInput.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseCheckbox from '@/components/BaseCheckbox.vue'

import { useRegistration } from '@/composables'
import refDataService from '../../../../services/refData.service'

const router = useRouter()

const {
  transportationVouchersForm
} = useRegistration()

let transportationVouchersFormValues = ref({})

let transportTypes = ref([]);
const transportCardType = ref([])

onMounted(async () => {
  transportTypes.value = await refDataService.getTransportTypes()
  transportCardType.value = await refDataService.getTransportCardTypes()
})

async function onSubmit(values) {
  router.push({ name: 'company' });
}
</script>