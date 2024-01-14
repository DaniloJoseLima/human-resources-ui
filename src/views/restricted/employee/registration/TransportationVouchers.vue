<script setup>
import { onMounted, ref } from 'vue'
import { Form, FieldArray } from 'vee-validate'
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
let transportCardType = ref([])

onMounted(async () => {
  transportTypes.value = await refDataService.getTransportTypes()
  transportCardType.value = await refDataService.getTransportCardTypes()
})

async function onSubmit(values) {
  router.push({ name: 'company' });
}
</script>
<template>
  <Form v-slot="{ isSubmitting, values }" @submit="onSubmit" :initial-values="transportationVouchersFormValues"
    :validation-schema="transportationVouchersForm" class="space-y-4">
    <div class="space-y-4 border border-primary-100 rounded p-4 mt-2">
      <h2 class="text-primary-500 text-lg font-bold">Cadastro Vale Transporte</h2>

      <div class="border border-primary-100 rounded p-4">
        <p class="text-primary-500 font-medium col-span-12">IDA - Meios de transportes utilizados</p>
        <FieldArray name="typeTransportOneWay" v-slot="{ fields, push, remove }" class="">
          <fieldset class="InputGroup" v-for="(field, idx) in fields" :key="field.key">
            <div class="relative grid grid-cols-12 gap-4 mt-2">
              <BaseSelect class="col-span-2" :nameModel="`typeTransportOneWay[${idx}].type`" :listItens="transportTypes"
                label="Tipo de transporte" />
              
              <BaseInput class="col-span-3" :name="`typeTransportOneWay[${idx}].company`" type="text" label="Empresa" />
              <BaseInput class="col-span-3" :name="`typeTransportOneWay[${idx}].line`" type="text" label="Linha" />
              <BaseInput class="col-span-1" :name="`typeTransportOneWay[${idx}].quantity`" type="text" v-maska="'#*'"
                label="Quantidade" />
              <BaseInput class="col-span-2" :name="`typeTransportOneWay[${idx}].value`" type="text"
                v-maska="['#,##', '##,##', '###,##', '#.###,##', '##.###,##', '###.###,##', '#.###.###,##']"
                label="Valor passagem" />
              <div v-for="cardType in transportCardType" class="col-span-2">
                <BaseCheckbox :name="`typeTransportOneWay[${idx}].transportCardType`" type="radion"
                :label="cardType.name" :value="cardType.id" />
              </div>
              <button class="absolute right-0 top-2.5 col-span-1 text-negative-400 font-bold hover:opacity-70"
                type="button" @click="remove(idx)">X</button>
            </div>
          </fieldset>
          <a class="inline-block underline text-primary-300 cursor-pointer hover:opacity-70 mt-4"
            @click="push()">Adicionar novo meio de transporte</a>
        </FieldArray>
      </div>
      <div class="border border-primary-100 rounded p-4">
        <p class="text-primary-500 font-medium col-span-12">VOLTA - Meios de transportes utilizados</p>
        <FieldArray name="typeTransportReturn" v-slot="{ fields, push, remove }" class="">
          <fieldset class="InputGroup" v-for="(field, idx) in fields" :key="field.key">
            <div class="relative grid grid-cols-12 gap-4 mt-2">
              <BaseSelect class="col-span-2" :nameModel="`typeTransportReturn[${idx}].type`" :listItens="transportTypes"
                label="Tipo" />
              <BaseInput class="col-span-3" :name="`typeTransportReturn[${idx}].company`" type="text" label="Empresa" />
              <BaseInput class="col-span-3" :name="`typeTransportReturn[${idx}].line`" type="text" label="Linha" />
              <BaseInput class="col-span-1" :name="`typeTransportReturn[${idx}].quantity`" type="text" v-maska="'#*'"
                label="Quantidade" />
              <BaseInput class="col-span-2" :name="`typeTransportReturn[${idx}].value`" type="text"
                v-maska="['#,##', '##,##', '###,##', '#.###,##', '##.###,##', '###.###,##', '#.###.###,##']"
                label="Valor passagem" />
              <div v-for="cardType in transportCardType" class="col-span-2">
                <BaseCheckbox :name="`typeTransportReturn[${idx}].transportCardType`" type="radion"
                :label="cardType.name" :value="cardType.id" />
              </div>
              <button class="absolute right-0 top-2.5 col-span-1 text-negative-400 font-bold hover:opacity-70"
                type="button" @click="remove(idx)">X</button>
            </div>
          </fieldset>
          <a class="inline-block underline text-primary-300 cursor-pointer hover:opacity-70 mt-4"
            @click="push()">Adicionar novo meio de transporte</a>
        </FieldArray>
      </div>
    </div>
    <div class="flex justify-between">
      <router-link :to="{ name: 'employee-list' }">
        <BaseButton type="button" class="md:w-40 text-right m-auto mr-0" red>Voltar</BaseButton>
      </router-link>
      <BaseButton type="submit" class="md:w-40 text-right m-auto mr-0" :loading="isSubmitting" outline>Salvar</BaseButton>
    </div>
  </Form>
</template>