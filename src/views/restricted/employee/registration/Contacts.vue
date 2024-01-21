
<script setup>
import { onMounted, ref } from 'vue'
import { Form, FieldArray } from 'vee-validate'
import { useRoute, useRouter } from 'vue-router'
import useToastNotify from '@/hooks/toast'

import BaseInput from '@/components/BaseInput.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseModal from '@/components/BaseModal.vue'

import { useRegistration } from '@/composables'

import refDataService from '../../../../services/refData.service'
import CollaboratorService from '../../../../services/collaborator.service'
const {
  contactsForm
} = useRegistration()

const router = useRouter()
const route = useRoute()
const { notify } = useToastNotify()

const collaboratorId = route.query.id
const collaboratorType = route.query.type

let contactsFormValues = ref({
  contacts: [{ "contactTypes": { "id": "2", "name": "Celular" }, collaboratorId }]
})

let contactTypes = ref([]);
let validateList = ref(false);
let isRegister = ref(false);
let modalDelete = ref(false)

onMounted(async () => {
  contactTypes.value = await refDataService.getContactTypes()
  if (collaboratorId) {
    await loadData()
  }
  validateList.value = true
})
async function loadData() {
  await CollaboratorService.findContacts(collaboratorId).then((response) => {
    if (response.length > 0) {
      isRegister.value = true
      for (let index = 0; index < response.length; index++) {
        const element = response[index];
        element.contactTypes = contactTypes.value.find(d => d.id == element.contactTypeId)
      }
      contactsFormValues.value.contacts = response
    }
  })
}
async function onSubmit(values) {
  values.id = collaboratorId
  if (!isRegister.value) {
    await CollaboratorService.saveContacts(values).then((response) => {
      notify('SUCCESS', "Contatos salvo com sucesso!")
      router.push({ name: 'addresses', query: { id: collaboratorId, type: collaboratorType } });
    }, (error) => {
      const msg = {
        'error': 'Erro ao salvar informações.'
      }[error.response.data.message]
      notify('DANGER', msg || 'Erro ao salvar.')
    })
  } else {
    await CollaboratorService.updateContacts(values).then((response) => {
      notify('SUCCESS', "Contatos atualizados com sucesso!")
    }, (error) => {
      const msg = {
        'error': 'Erro ao salvar informações.'
      }[error.response.data.message]
      notify('DANGER', msg || 'Erro ao salvar.')
    })
  }
}
async function deleteObject(objectToDelete) {
  await CollaboratorService.deleteContacts(objectToDelete.id).then(async (response) => {
    notify('SUCCESS', "Contato deletado com sucesso!")
    validateList.value = false
    await loadData()
    validateList.value = true
  }, (error) => {
    const msg = {
      'error': 'Erro ao deletar Contato.'
    }[error.response.data.message || 'Erro ao deletar.']
    notify('DANGER', msg)
  })
  modalDelete.value.close()
}
</script>

<template>
  <div v-if="validateList">
    <Form v-slot="{ isSubmitting }" @submit="onSubmit" :initial-values="contactsFormValues"
      :validation-schema="contactsForm" class="space-y-4">
      <div class="space-y-4 border border-primary-100 rounded p-4 mt-2">
        <h2 class="text-primary-500 text-lg font-bold">Contatos</h2>
        <FieldArray name="contacts" v-slot="{ fields, push, remove }">
          <fieldset class="InputGroup" v-for="(field, idx) in fields" :key="field.key">
            <div class="relative grid grid-cols-10 gap-4 pr-6">
              <BaseSelect :nameModel="`contacts[${idx}].contactTypes`" :listItens="contactTypes" label="Tipo" />
              <BaseInput class="col-span-3" :name="`contacts[${idx}].phoneNumber`" type="text" label="Número"
                v-maska="['(##) ####-####', '(##) #####-####']" :value="field.value.phoneNumber" />
              <button class="inline text-left w-1 col-span-1 text-negative-400 font-bold hover:opacity-70" type="button"
                @click="(!field.value.id ? remove(idx) : modalDelete.open({ objectToDelete: field.value }))"
                v-if="fields.length > 1">X</button>
            </div>
          </fieldset>
          <a class="inline-block underline text-primary-300 cursor-pointer hover:opacity-70 mt-4"
            @click="push({ collaboratorId: collaboratorId })">Adicionar novo contato</a>
        </FieldArray>
      </div>
      <div class="flex justify-between">
        <router-link :to="{ name: 'employee-list' }">
          <BaseButton type="button" class="md:w-40 text-right m-auto mr-0" red>Voltar</BaseButton>
        </router-link>
        <BaseButton type="submit" class="md:w-40 text-right m-auto mr-0" :loading="isSubmitting" outline>Salvar
        </BaseButton>
      </div>
    </Form>
  </div>
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