<template>
  <Form v-slot="{ isSubmitting }" :validation-schema="loginForm" @submit="onSubmit">
    <main class="md:flex justify-center items-center h-screen bg-gradient-to-r from-neutral-100 to-neutral-200">
      <div
        class="grid grid-cols-1 md:grid-cols-3 grid-flow-col gap-4 bg-primary-100 shadow-lg p-4 rounded-md md:w-2/3 h-screen md:h-auto">
        <div
          class="col-start-1 col-end-12 md:col-span-1 flex flex-col items-center justify-center h-full md:border-r md:border-white px-2">
          <h1 class="text-neutral-50 text-4xl font-bold text-center uppercase">Bem-vindo</h1>
          <p class="text-neutral-50">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa accusantium quo
            quidem, animi alias provident fugit excepturi vel doloribus asperiores rem itaque placeat sapiente ab, atque
            omnis ducimus, obcaecati soluta?</p>
        </div>
        <div class="col-start-1 col-end-12 md:col-span-2 space-y-8">

          <h1 class="text-4xl font-bold text-neutral-50 mb-4 text-center">Login</h1>
          <div class="space-y-4">
            <BaseInput name="email" type="text" label="E-mail" />
            <BaseInput name="password" type="password" label="Senha" />
          </div>
          <BaseButton type="submit" class="md:w-40 text-center m-auto">Entrar</BaseButton>
        </div>
      </div>
    </main>
  </Form>
</template>

<script setup>
import { Form } from 'vee-validate'
import { useStore } from 'vuex';
import { useRouter } from 'vue-router'
import useToastNotify from '@/hooks/toast'

import { useLogin } from '@/composables'

import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'


const store = useStore();
const router = useRouter()
const { notify } = useToastNotify()

const {
  loginForm
} = useLogin()

async function onSubmit(values) {

  store.dispatch('auth/login', values).then(
    () => {
      router.push({ name: 'dashboard' })
    },
    async (error) => {
      const msg = {
        'account not exist': 'Usuário não encontrado',
        'invalid password': 'Senha inválida',
      }[error.response.data.message || 'Erro ao realizar login']
      notify('DANGER', msg)
    }
  );
}

</script>