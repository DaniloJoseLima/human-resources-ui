
<script setup>
import { onMounted, ref } from 'vue'
import { Form, FieldArray } from 'vee-validate'
import { useRoute, useRouter } from 'vue-router'
import useToastNotify from '@/hooks/toast'

import BaseInput from '@/components/BaseInput.vue'
import BaseSelect from '@/components/BaseSelect.vue'
import BaseButton from '@/components/BaseButton.vue'

import { useRegistration } from '@/composables'

import refDataService from '../../../../services/refData.service'
import collaboratorService from '../../../../services/collaborator.service'
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

onMounted(async () => {
  contactTypes.value = await refDataService.getContactTypes()
  if(collaboratorId) {
    await collaboratorService.findContacts(collaboratorId).then((response) => {
      if(response.length > 0) {
        isRegister.value = true
        for (let index = 0; index < response.length; index++) {
          const element = response[index];
          element.contactTypes =  contactTypes.value.find(d => d.id == element.contactTypeId)
        }
        contactsFormValues.value.contacts = response
      }
      validateList.value = true
    })
  }
})

async function removeItemForm(index) {
  contactsFormValues.value.contacts.splice(index, 1)
}

async function onSubmit(values) {
  values.id = collaboratorId
  if(!isRegister.value) {
    await collaboratorService.saveContacts(values).then((response) => {
      notify('SUCCESS', "Contatos salvo com sucesso!")
      router.push({ name: 'addresses', query: { id: collaboratorId, type: collaboratorType } });
    }, (error) => {
      const msg = {
        'error': 'Erro ao salvar informações.'
      }[error.response.data.message || 'Erro ao salvar.']
      notify('DANGER', msg)
    })
  } else {
    await collaboratorService.updateContacts(values).then((response) => {
      notify('SUCCESS', "Contatos atualizados com sucesso!")
    }, (error) => {
      const msg = {
        'error': 'Erro ao salvar informações.'
      }[error.response.data.message || 'Erro ao salvar.']
      notify('DANGER', msg)
    })
  }
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
                @click="remove(idx), removeItemForm(idx)" v-if="idx > 0">X</button>
            </div>
          </fieldset>
          <a class="inline-block underline text-primary-300 cursor-pointer hover:opacity-70 mt-4"
            @click="push({collaboratorId: collaboratorId})">Adicionar novo contato</a>
        </FieldArray>
      </div>
      <div class="flex justify-between">
        <router-link :to="{ name: 'employee-list' }" >
          <BaseButton type="button" class="md:w-40 text-right m-auto mr-0" red>Voltar</BaseButton>
        </router-link>
        <BaseButton type="submit" class="md:w-40 text-right m-auto mr-0" :loading="isSubmitting" outline>Salvar</BaseButton>
      </div>
    </Form>
  </div>
</template>