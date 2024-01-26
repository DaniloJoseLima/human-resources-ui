<script setup>
import { onMounted, ref } from 'vue'
import { Form } from 'vee-validate'
import useToastNotify from '@/hooks/toast'
import { useRoute, useRouter } from 'vue-router'

import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'

import { useRegistration } from '@/composables'

import externalApi from '../../../../services/externalApi.service';
import CollaboratorService from '../../../../services/collaborator.service'

const {
  addressesForm
} = useRegistration()

const router = useRouter()
const route = useRoute()
const { notify } = useToastNotify()

const collaboratorId = route.query.id
const collaboratorType = route.query.type

let addressesFormValues = ref({})

onMounted(async () => {
  if (collaboratorId) {
    await CollaboratorService.findAddress(collaboratorId).then((response) => {
      addressesFormValues.value.address = response
    })
  }
})

async function searchCep(obj) {
  if (obj.address.zipCode && obj.address.zipCode.length === 9) {
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
  if (addressesFormValues.value.address && addressesFormValues.value.address.id) {
    values.address.id = addressesFormValues.value.address.id
    values.address.addressTypes = addressesFormValues.value.address.addressTypes
    values.address.addressTypes = { id: addressesFormValues.value.address.addressTypeId }
    await CollaboratorService.updateAddress(values.address).then((response) => {
      notify('SUCCESS', "Endereço Atualizado com sucesso!")
    }, (error) => {
      const msg = {
        'error': 'Erro ao atualizar informações.'
      }[error.response.data.message || 'Erro ao atualizar.']
      notify('DANGER', msg)
    })
  } else {
    values.address.collaboratorId = collaboratorId
    values.address.addressTypes = { id: 1 }
    values.address.country = 'Brasil'
    await CollaboratorService.saveAddress(values.address).then((response) => {
      notify('SUCCESS', "Endereço salvo com sucesso!")
      router.push({ name: 'dependents', query: { id: collaboratorId, type: collaboratorType } });
    }, (error) => {
      const msg = {
        'error': 'Erro ao salvar informações.'
      }[error.response.data.message]
      notify('DANGER', msg || 'Erro ao salvar.')
    })
  }
}
</script>
<template>
  <Form v-slot="{ values, isSubmitting }" @submit="onSubmit" :initial-values="addressesFormValues"
    :validation-schema="addressesForm" class="space-y-4">
    <div class="space-y-4 border border-primary-100 rounded p-4 mt-2">
      <h2 class="text-primary-500 text-lg font-bold">Endereço</h2>
      <div class="grid md:grid-cols-4 gap-4">
        <BaseInput name="address.zipCode" type="text" v-maska="'#####-###'" label="CEP" @change="searchCep(values)"
          @focus="values.address = {}" />
      </div>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <BaseInput class="md:col-span-3" name="address.place" type="text" label="Logradouro" disabled />
        <BaseInput class="md:col-span-1" name="address.number" type="text" label="Número" />
        <BaseInput class="md:col-span-2" name="address.complement" type="text" label="Complemento" />
        <BaseInput class="md:col-span-2" name="address.district" type="text" label="Bairro" disabled />
        <BaseInput class="md:col-span-1" name="address.state" type="text" label="Estado" disabled />
        <BaseInput class="md:col-span-1" name="address.city" type="text" label="Cidade" disabled />

      </div>
    </div>
    <div class="space-y-4 md:space-y-0 md:flex justify-between">
      <router-link :to="{ name: 'employee-list' }">
        <BaseButton type="button" class="md:w-40 text-right m-auto mr-0" red>Voltar</BaseButton>
      </router-link>
      <BaseButton type="submit" class="md:w-40 text-right m-auto mr-0" :loading="isSubmitting" outline>Salvar</BaseButton>
    </div>
  </Form>
</template>