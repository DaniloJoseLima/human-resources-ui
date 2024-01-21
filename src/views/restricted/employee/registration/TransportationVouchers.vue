<script setup>
import { onMounted, ref } from 'vue'
import { Form, FieldArray } from 'vee-validate'
import { useRoute, useRouter } from 'vue-router'
import useToastNotify from '@/hooks/toast'

import BaseInput from '@/components/BaseInput.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseCheckbox from '@/components/BaseCheckbox.vue'
import BaseModal from '@/components/BaseModal.vue'

import { useRegistration, useUtils } from '@/composables'
import refDataService from '../../../../services/refData.service'
import CollaboratorService from '../../../../services/collaborator.service'

const router = useRouter()
const route = useRoute()
const { notify } = useToastNotify()

const collaboratorId = route.query.id
const collaboratorType = route.query.type

const {
  transportationVouchersForm
} = useRegistration()

const { formatPrice } = useUtils()

let transportationVouchersFormValues = ref({})

let transportTypes = ref([]);
let transportCardType = ref([])
let validateList = ref(false);
let validateCollaboratorId = ref(false);
let modalDelete = ref(false)

onMounted(async () => {
  transportTypes.value = await refDataService.getTransportTypes()
  transportCardType.value = await refDataService.getTransportCardTypes()
  if (collaboratorId) {
    await loadData()
  }
  validateList.value = true
})

async function loadData() {
  await CollaboratorService.findTransportationVouchers(collaboratorId).then((response) => {
    if (response.typeTransportOneWay) {
      for (let index = 0; index < response.typeTransportOneWay.length; index++) {
        const element = response.typeTransportOneWay[index];
        element.transportTypes = transportTypes.value.find(d => d.id == element.transportTypes)
        element.value = element.value ? formatPrice(element.value) : null
        element.quantity = element.quantity ? element.quantity.toString() : null
      }
    }
    if (response.typeTransportReturn) {
      for (let index = 0; index < response.typeTransportReturn.length; index++) {
        const element = response.typeTransportReturn[index];
        element.transportTypes = transportTypes.value.find(d => d.id == element.transportTypes)
        element.value = element.value ? formatPrice(element.value) : null
        element.quantity = element.quantity ? element.quantity.toString() : null
      }
    }
    transportationVouchersFormValues.value = response
    validateCollaboratorId.value = response.typeTransportOneWay.length > 0 || response.typeTransportReturn.length > 0 ? true : false
  })
}

async function onSubmit(values) {
  if (values.typeTransportOneWay && values.typeTransportOneWay.length > 0) {
    for (let index = 0; index < values.typeTransportOneWay.length; index++) {
      values.typeTransportOneWay[index].value = values.typeTransportOneWay[index].value.replaceAll(',', '').replaceAll('.', '').replaceAll('R$ ', '');
      values.typeTransportOneWay[index].collaboratorTransportCardTypes = []
      if (values.typeTransportOneWay[index].transportCardType && values.typeTransportOneWay[index].transportCardType.length > 0) {
        for (let x = 0; x < values.typeTransportOneWay[index].transportCardType.length; x++) {
          const element = values.typeTransportOneWay[index].transportCardType[x];
          values.typeTransportOneWay[index].collaboratorTransportCardTypes.push({ transportCardsTypesId: element })
        }
      }
    }
  }
  if (values.typeTransportReturn && values.typeTransportReturn.length > 0) {
    for (let index = 0; index < values.typeTransportReturn.length; index++) {
      values.typeTransportReturn[index].value = values.typeTransportReturn[index].value.replaceAll(',', '').replaceAll('.', '').replaceAll('R$ ', '');
      values.typeTransportReturn[index].collaboratorTransportCardTypes = []
      if (values.typeTransportReturn[index].transportCardType && values.typeTransportReturn[index].transportCardType.length > 0) {
        for (let x = 0; x < values.typeTransportReturn[index].transportCardType.length; x++) {
          const element = values.typeTransportReturn[index].transportCardType[x];
          values.typeTransportReturn[index].collaboratorTransportCardTypes.push({ transportCardsTypesId: element })
        }
      }
    }
  }
  if (!validateCollaboratorId.value) {
    await CollaboratorService.saveTransportationVouchers(values).then((response) => {
      notify('SUCCESS', "Vale transporte salvo com sucesso!")
      if (collaboratorType == 'pj') {
        router.push({ name: 'company', query: { id: collaboratorId, type: collaboratorType } });
      } else {
        router.push({ name: 'employee-list' });
      }
    }, (error) => {
      const msg = {
        'error': 'Erro ao salvar informações.'
      }[error.response.data.message]
      notify('DANGER', msg || 'Erro ao salvar.')
    })
  } else {
    await CollaboratorService.updateTransportationVouchers(values).then((response) => {
      notify('SUCCESS', "Vale transporte atualizados com sucesso!")
    }, (error) => {
      const msg = {
        'error': 'Erro ao salvar informações.'
      }[error.response.data.message]
      notify('DANGER', msg || 'Erro ao salvar.')
    })
  }
}
async function deleteObject(objectToDelete) {
  await CollaboratorService.deleteTransportationVouchers(objectToDelete.id).then(async (response) => {
    notify('SUCCESS', "Item deletado com sucesso!")
    validateList.value = false
    await loadData()
    validateList.value = true
  }, (error) => {
    const msg = {
      'error': 'Erro ao deletar item.'
    }[error.response.data.message]
    notify('DANGER', msg || 'Erro ao deletar.')
  })
  modalDelete.value.close()
}
</script>
<template>
  <Form v-if="validateList" v-slot="{ isSubmitting, values }" @submit="onSubmit"
    :initial-values="transportationVouchersFormValues" :validation-schema="transportationVouchersForm" class="space-y-4">
    <div class="space-y-4 border border-primary-100 rounded p-4 mt-2">
      <h2 class="text-primary-500 text-lg font-bold">Cadastro Vale Transporte</h2>

      <div class="border border-primary-100 rounded p-4">
        <p class="text-primary-500 font-medium col-span-12">IDA - Meios de transportes utilizados</p>
        <FieldArray name="typeTransportOneWay" v-slot="{ fields, push, remove }" class="">
          <fieldset class="InputGroup" v-for="(field, idx) in fields" :key="field.key">
            <div class="relative grid grid-cols-12 gap-4 mt-2">
              <BaseSelect class="col-span-2" :nameModel="`typeTransportOneWay[${idx}].transportTypes`"
                :listItens="transportTypes" label="Tipo de transporte" />

              <BaseInput class="col-span-3" :name="`typeTransportOneWay[${idx}].company`" type="text" label="Empresa"
                :value="field.value.company" />
              <BaseInput class="col-span-3" :name="`typeTransportOneWay[${idx}].line`" type="text" label="Linha"
                :value="field.value.line" />
              <BaseInput class="col-span-1" :name="`typeTransportOneWay[${idx}].quantity`" type="number"
                label="Quantidade" :value="field.value.quantity" />
              <BaseInput class="col-span-2" :name="`typeTransportOneWay[${idx}].value`" type="text"
                v-maska="['R$ #,##', 'R$ ##,##', 'R$ ###,##', 'R$ #.###,##', 'R$ ##.###,##', 'R$ ###.###,##', 'R$ #.###.###,##']"
                label="Valor passagem" :value="field.value.value" />
              <div v-for="cardType in transportCardType" class="col-span-2">
                <BaseCheckbox :name="`typeTransportOneWay[${idx}].transportCardType`" type="radion" :label="cardType.name"
                  :value="cardType.id" />
              </div>
              <button class="absolute right-0 top-2.5 col-span-1 text-negative-400 font-bold hover:opacity-70"
                type="button" @click="(!field.value.id ? remove(idx) : modalDelete.open({ objectToDelete: field.value }))">X</button>
            </div>
          </fieldset>
          <a class="inline-block underline text-primary-300 cursor-pointer hover:opacity-70 mt-4"
            @click="push({ collaboratorId: collaboratorId, type: 'going' })">Adicionar novo meio de transporte</a>
        </FieldArray>
      </div>
      <div class="border border-primary-100 rounded p-4">
        <p class="text-primary-500 font-medium col-span-12">VOLTA - Meios de transportes utilizados</p>
        <FieldArray name="typeTransportReturn" v-slot="{ fields, push, remove }" class="">
          <fieldset class="InputGroup" v-for="(field, idx) in fields" :key="field.key">
            <div class="relative grid grid-cols-12 gap-4 mt-2">
              <BaseSelect class="col-span-2" :nameModel="`typeTransportReturn[${idx}].transportTypes`"
                :listItens="transportTypes" label="Tipo" />
              <BaseInput class="col-span-3" :name="`typeTransportReturn[${idx}].company`" type="text" label="Empresa"
                :value="field.value.company" />
              <BaseInput class="col-span-3" :name="`typeTransportReturn[${idx}].line`" type="text" label="Linha"
                :value="field.value.line" />
              <BaseInput class="col-span-1" :name="`typeTransportReturn[${idx}].quantity`" type="number"
                label="Quantidade" :value="field.value.quantity" />
              <BaseInput class="col-span-2" :name="`typeTransportReturn[${idx}].value`" type="text"
                v-maska="['R$ #,##', 'R$ ##,##', 'R$ ###,##', 'R$ #.###,##', 'R$ ##.###,##', 'R$ ###.###,##', 'R$ #.###.###,##']"
                label="Valor passagem" :value="field.value.value" />
              <div v-for="cardType in transportCardType" class="col-span-2">
                <BaseCheckbox :name="`typeTransportReturn[${idx}].transportCardType`" type="radion" :label="cardType.name"
                  :value="cardType.id" />
              </div>
              <button class="absolute right-0 top-2.5 col-span-1 text-negative-400 font-bold hover:opacity-70"
                type="button" @click="(!field.value.id ? remove(idx) : modalDelete.open({ objectToDelete: field.value }))">X</button>
            </div>
          </fieldset>
          <a class="inline-block underline text-primary-300 cursor-pointer hover:opacity-70 mt-4"
            @click="push({ collaboratorId: collaboratorId, type: 'return' })">Adicionar novo meio de transporte</a>
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
  <BaseModal ref="modalDelete" v-slot="{ objectToDelete }">
    <div class="min-w-full md:min-w-[600px]">
      <h1 class="text-lg text-center text-negative-400 font-bold">Deseja excluir item?</h1>
      <hr class="mt-4 border-neutral-100">
      <div class="flex w-full justify-center space-x-5 px-2.5 my-12">
        <BaseButton type="button" class="md:w-40 bg-negative-300 text-white hover:text-white" outline
          @click="deleteObject(objectToDelete)">Sim</BaseButton>
        <BaseButton type="button" class="md:w-40" outline @click="modalDelete.close()">Não</BaseButton>
      </div>
    </div>
  </BaseModal>
</template>