<template>
  <Form v-slot="{ isSubmitting }" :validation-schema="typeNavigation == 'login' ? loginForm : registerForm"
    @submit="onSubmit">
    <main class="md:flex justify-center items-center h-screen bg-gradient-to-r from-neutral-100 to-neutral-200">
      <div
        class="grid grid-cols-1 lg:grid-cols-3 grid-flow-col gap-4 bg-primary-300 shadow-lg p-4 rounded-md md:w-2/3 h-screen md:h-auto">
        <div
          class="col-start-1 col-end-12 lg:col-span-1 flex flex-col items-center justify-center h-full lg:border-r md:border-white px-2">
          <h1 class="text-neutral-50 text-4xl font-bold text-center uppercase">Bem-vindo</h1>
          <!-- <p class="text-neutral-50">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa accusantium quo
            quidem, animi alias provident fugit excepturi vel doloribus asperiores rem itaque placeat sapiente ab, atque
            omnis ducimus, obcaecati soluta?</p> -->
        </div>
        <div class="col-start-1 col-end-12 lg:col-span-2 space-y-8">
          <div v-if="typeNavigation == 'login'" class="space-y-8">
            <h1 class="text-4xl font-bold text-neutral-50 mb-4 text-center uppercase">Login</h1>
            <div class="space-y-4">
              <BaseInput name="email" type="text" label="E-mail" />
              <BaseInput name="password" type="password" label="Senha" />
            </div>
            <div class="md:flex justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
              <BaseButton type="submit" class="md:w-40 text-center" :disabled="isSubmitting">Entrar</BaseButton>
              <div>
                <router-link :to="{ query: { navigation: 'register' } }">
                  <BaseButton type="button" class="md:w-40 text-center border-neutral-50 text-neutral-50"
                    :disabled="isSubmitting" outline>Cadastrar-se</BaseButton>
                </router-link>
              </div>
            </div>
          </div>
          <div v-if="typeNavigation == 'register'" class="space-y-8">
            <h1 class="text-4xl font-bold text-neutral-50 mb-4 text-center">Cadastro</h1>
            <div class="space-y-4">
              <BaseInput name="name" type="text" label="Nome completo" />
              <BaseInput name="email" type="text" label="E-mail" />
              <BaseInput name="password" type="password" label="Senha" />
              <BaseInput name="confirmPassword" type="password" label="Confirme sua senha" />
            </div>
            <div class="md:flex justify-center items-center space-y-4 md:space-y-0 md:space-x-6">
              <BaseButton type="submit" class="md:w-40 text-center" :disabled="isSubmitting">Cadastrar</BaseButton>
              <div>
                <router-link :to="{ query: { navigation: 'login' } }">
                  <BaseButton type="button" class="md:w-40 text-center border-neutral-50 text-neutral-50"
                    :disabled="isSubmitting" outline>Voltar</BaseButton>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </Form>
</template>

<script setup>
import { watch, ref } from 'vue';
import { Form } from 'vee-validate'
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router'
import useToastNotify from '@/hooks/toast'

import { useLogin } from '@/composables'

import BaseInput from '@/components/BaseInput.vue'
import BaseButton from '@/components/BaseButton.vue'

import userService from '../../../services/user.service';


const store = useStore();
const router = useRouter()
const route = useRoute()
const { notify } = useToastNotify()
let typeNavigation = ref("login");

const {
  loginForm,
  registerForm
} = useLogin()

watch(
  () => route.query,
  async type => {
    if (route.query && route.query.navigation) {
      typeNavigation.value = route.query.navigation
    }
  },
  { immediate: true }
)

async function onSubmit(values) {

  if (typeNavigation.value == 'login') {
    login(values)
  } else {
    userService.createUser(values).then(() => {
      notify('SUCESS', "Cadastro realizado com sucesso.")
      login(values)
    },
      async (error) => {
        const msg = {
          'Email already exists': 'E-mail já cadastrado na base'
        }[error.response.data.message || 'Erro ao realizar cadastro']
        notify('DANGER', msg)
      }
    )
  }
}

async function login(values) {
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