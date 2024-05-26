
<script setup>
import { ref, onMounted } from 'vue'
import { Form } from 'vee-validate'
import { useRoute, useRouter } from 'vue-router'
import useToastNotify from '@/hooks/toast'
import dayjs from 'dayjs/esm'
import customParseFormat from 'dayjs/plugin/customParseFormat'

import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseTextArea from '@/components/BaseTextArea.vue'

import { useRegistration } from '@/composables'
import CollaboratorService from '../../../../services/collaborator.service'
dayjs.extend(customParseFormat)

const router = useRouter()
const route = useRoute()
const { notify } = useToastNotify()

const collaboratorId = route.query.id
const collaboratorType = route.query.type

const {
  contractForm
} = useRegistration()

let contractFormValues = ref({})


onMounted(async () => {
  if (collaboratorId) {
    await CollaboratorService.findContractData(collaboratorId).then((response) => {
      response.start = dayjs(response.start, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY')
      response.end = response.end ? dayjs(response.end, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY') : null
      contractFormValues.value = response
    })
  }
})

async function onSubmit(values) {
  values.collaboratorId = collaboratorId
  values.start = dayjs(values.start, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss')
  values.end = values.end ? dayjs(values.end, 'DD/MM/YYYY').format('YYYY-MM-DD HH:mm:ss') : null
  if (!contractFormValues.value || (contractFormValues.value && !contractFormValues.value.collaboratorId)) {
    await CollaboratorService.saveContractData(values).then((response) => {
      notify('SUCCESS', "Dados do contrato salvo com sucesso!")
      router.push({ name: 'professional', query: { id: collaboratorId, type: collaboratorType } });
    }, (error) => {
      const msg = {
        'error': 'Erro ao salvar dados do contrato.'
      }[error.response && error.response.data && error.response.data.message || 'Erro ao salvar.']
      notify('DANGER', msg)
    })
  } else {
    values.id = contractFormValues.value.id
    await CollaboratorService.updateContractData(values).then((response) => {
      notify('SUCCESS', "Dados do contrato Atualizados com sucesso!")
    }, (error) => {
      const msg = {
        'error': 'Erro ao salvar dados do contrato.'
      }[error.response && error.response.data && error.response.data.message || 'Erro ao salvar.']
      notify('DANGER', msg)
    })
  }
}
</script>
<template>
  <Form v-slot="{ isSubmitting }" @submit="onSubmit" :initial-values="contractFormValues"
    :validation-schema="contractForm" class="space-y-4">
    <div class="space-y-4 border border-primary-100 rounded p-4 mt-2">
      <h2 class="text-primary-500 text-lg font-bold">Dados do Contrato</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <BaseInput name="remuneration" type="text" label="Salário"
          v-maska="['###,##', '#.###,##', '##.###,##', '###.###,##', '#.###.###,##']" />
        <BaseInput name="occupation" type="text" label="Função" />
        <BaseInput name="start" type="text" label="Inicio Vigência" v-maska="'##/##/####'" />
        <BaseInput name="end" type="text" label="Fim Vigência" v-maska="'##/##/####'" />
        <BaseInput name="workingHours" type="text" label="Jornada de Trabalho" v-maska="'##:## às ##:##'" />
      </div>
      <div>
        <p class="text-primary-500">Observações</p>
        <BaseTextArea nameModel="comments" placeholder="Descreva aqui suas observações." />
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