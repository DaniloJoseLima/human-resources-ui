<template>
  <header class="bg-white border-b-2 border-neutral-50">
    <div class="flex justify-center md:justify-between items-center container h-[86px]">
      <router-link :to="{ name: 'dashboard' }">
        <figure>
          <img src="https://www.cbvj.org.br/index/wp-content/uploads/2017/10/default-logo.png" alt="Logo" width="148"
            height="50" class="w-[124px] md:w-[148px] h-auto">
        </figure>
      </router-link>
      <div class="flex">
        <router-link @click="close()" :to="{ name: 'dashboard' }" 
          class="flex items-center h-[86px] px-8 text-primary-500 border-b-2 border-white hover:border-primary-500 transition-colors duration-200"
          active-class="border-primary-500"
        >
          Dashboard
        </router-link>
        <Popover v-slot="{ open }" class="relative">
          <PopoverButton>
            <p
              class="flex items-center h-[86px] px-8 text-primary-500 border-b-2 border-white hover:border-primary-500 transition-colors duration-200">
              Colaboradores
              <ChevronDownIcon class="h-4 w-4 ml-2" :class="{ 'rotate-180 transform': open }" />
            </p>
          </PopoverButton>
          <PopoverPanel v-slot="{ close }" class="absolute z-10 bg-white rounded-lg p-2 shadow-lg w-full border-b-2 border-neutral-50">
            <div class="grid grid-cols-1 space-y-2">
              <router-link @click="close()" :to="{ name: 'list' }" class="text-primary-500 hover:text-primary-400" active-class="font-bold">
                Listar
              </router-link>
              <router-link @click="close()" :to="{ name: 'registration' }" class="text-primary-500 hover:text-primary-400" active-class="font-bold">
                Cadastrar
              </router-link>
            </div>
          </PopoverPanel>
        </Popover>
      </div>
      <div class="hidden md:flex">
        <div>
          <img
            src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-unknown-social-media-user-photo-default-avatar-profile-icon-vector-unknown-social-media-user-184816085.jpg"
            alt="avatar" width="48" height="48" class="w-[48px] h-auto mr-4">
        </div>
        <div>
          <div class="flex items-center">
            <p class="font-normal text-neutral-500">Maria Laura</p>
          </div>
          <div class="flex items-center">
            <a class="font-normal text-sm text-neutral-200 underline cursor-pointer" @click="logout">Sair</a>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>
<script setup>
import { useStore } from 'vuex';
import useToastNotify from '@/hooks/toast'
import { useRouter } from 'vue-router'
import { computed } from 'vue';

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/24/solid'

const store = useStore()
const { notify } = useToastNotify();
const router = useRouter()

const loggedInUser = computed(() => store.getters['auth/currentUser'])


function logout() {
  console.log(loggedInUser)
  store.dispatch('auth/logout', loggedInUser.id).then(() => {
    router.push('/');
    notify('SUCCESS', "Usuário deslogado")
  }, error => {
    notify('DANGER', error)
  }
  );
}
</script>