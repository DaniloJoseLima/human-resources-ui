<template v-if="loggedInUser">
  <header class="fixed z-50 bg-white border-b-2 border-neutral-50 left-0 w-full">
    <div class="flex justify-between items-center container h-[86px]">
      <div class="flex items-center justify-between md:justify-start w-full md:max-w-[140px]">
        <figure>
          <img src="../assets/gallery/images/company-logo.svg" alt="Logo" class="w-[124px] md:w-[100px] h-auto">
        </figure>
        <!-- Hamburger Menu Icon -->
        <button @click="toggleMenu()" class="md:hidden ml-4 text-primary-600">
          <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
          </svg>
        </button>
      </div>
      <!-- Responsive Menu -->
      <div v-if="isMenuOpen"
        class="md:hidden fixed top-[88px] right-0 bg-white bg-opacity-70 backdrop-filter backdrop-blur w-full h-full z-50 text-center space-y-4 pt-4 transition duration-200">
        <router-link v-if="verifyPermission('MENU_DASHBOARD', loggedInUser)" :to="{ name: 'dashboard' }"
          class="block text-primary-600 hover:bg-neutral-100 text-lg font-bold"
          @click="closeMenus()">Dashboard</router-link>
        <Popover v-slot="{ open }" class="relative">
          <PopoverButton v-if="verifyPermission('MENU_COLLABORATORS', loggedInUser)">
            <p class="flex items-center text-lg font-bold px-8 text-primary-600 transition-colors duration-200">
              Colaboradores
              <ChevronDownIcon class="h-4 w-4 ml-2" :class="{ 'rotate-180 transform': open }" />
            </p>
          </PopoverButton>
          <PopoverPanel v-if="verifyPermission('MENU_COLLABORATORS_LIST', loggedInUser)" v-slot="{ close }"
            class="p-2 w-full">
            <div class="grid grid-cols-1 space-y-2">
              <router-link @click="close(), closeMenus()" :to="{ name: 'employee-list' }"
                class="font-bold text-primary-500 hover:text-primary-400" active-class="font-bold">
                Listar
              </router-link>
            </div>
          </PopoverPanel>
        </Popover>
        <Popover v-slot="{ open }" class="relative">
          <PopoverButton v-if="verifyPermission('MENU_SETTINGS', loggedInUser)">
            <p class="flex items-center text-lg font-bold px-8 text-primary-600 transition-colors duration-200">
              Configurações
              <ChevronDownIcon class="h-4 w-4 ml-2" :class="{ 'rotate-180 transform': open }" />
            </p>
          </PopoverButton>
          <PopoverPanel v-if="verifyPermission('MENU_SETTINGS_USERS', loggedInUser)" v-slot="{ close }"
            class="p-2 w-full">
            <div class="grid grid-cols-1 space-y-2">
              <router-link @click="close(), closeMenus()" :to="{ name: 'users-list' }"
                class="font-bold text-primary-500 hover:text-primary-400" active-class="font-bold">
                Usuário
              </router-link>
            </div>
          </PopoverPanel>
        </Popover>
        <div>
          <a class="font-bold text-sm text-primary-600 underline cursor-pointer" @click="logout">Sair</a>
        </div>
      </div>
      <div class="hidden md:flex">
        <div class="flex">
          <router-link v-if="verifyPermission('MENU_DASHBOARD', loggedInUser)" :to="{ name: 'dashboard' }"
            class="flex items-center h-[86px] px-8 text-primary-500 border-b-2 border-white hover:border-primary-500 transition-colors duration-200"
            active-class="border-primary-500">
            Dashboard
          </router-link>
          <Popover v-slot="{ open }" class="relative">
            <PopoverButton v-if="verifyPermission('MENU_COLLABORATORS', loggedInUser)">
              <p
                class="flex items-center h-[86px] px-8 text-primary-500 border-b-2 border-white hover:border-primary-500 transition-colors duration-200">
                Colaboradores
                <ChevronDownIcon class="h-4 w-4 ml-2" :class="{ 'rotate-180 transform': open }" />
              </p>
            </PopoverButton>
            <PopoverPanel v-if="verifyPermission('MENU_COLLABORATORS_LIST', loggedInUser)" v-slot="{ close }"
              class="absolute z-10 bg-white rounded-lg p-2 shadow-lg w-full border-b-2 border-neutral-50">
              <div class="grid grid-cols-1 space-y-2">
                <router-link @click="close()" :to="{ name: 'employee-list' }"
                  class="text-primary-500 hover:text-primary-400" active-class="font-bold">
                  Listar
                </router-link>
              </div>
            </PopoverPanel>
          </Popover>
          <Popover v-slot="{ open }" class="relative">
            <PopoverButton v-if="verifyPermission('MENU_SETTINGS', loggedInUser)">
              <p
                class="flex items-center h-[86px] px-8 text-primary-500 border-b-2 border-white hover:border-primary-500 transition-colors duration-200">
                Configurações
                <ChevronDownIcon class="h-4 w-4 ml-2" :class="{ 'rotate-180 transform': open }" />
              </p>
            </PopoverButton>
            <PopoverPanel v-if="verifyPermission('MENU_SETTINGS_USERS', loggedInUser)" v-slot="{ close }"
              class="absolute z-10 bg-white rounded-lg p-2 shadow-lg w-full border-b-2 border-neutral-50">
              <div class="grid grid-cols-1 space-y-2">
                <router-link @click="close()" :to="{ name: 'users-list' }" class="text-primary-500 hover:text-primary-400"
                  active-class="font-bold">
                  Usuário
                </router-link>
              </div>
            </PopoverPanel>
          </Popover>
        </div>
      </div>
      <div class="hidden md:flex">
        <div class="hidden lg:block">
          <img
            src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-unknown-social-media-user-photo-default-avatar-profile-icon-vector-unknown-social-media-user-184816085.jpg"
            alt="avatar" width="48" height="48" class="w-[48px] h-auto mr-4">
        </div>
        <div>
          <div class="hidden lg:flex items-center">
            <p class="font-normal text-primary-600">{{ loggedInUser?.name }}</p>
          </div>
          <div class="flex items-center">
            <a class="font-bold text-sm text-primary-600 underline cursor-pointer" @click="logout">Sair</a>
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
import { computed, ref } from 'vue';

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/24/solid'

import { userRoles } from '@/composables'

const store = useStore()
const { notify } = useToastNotify();
const router = useRouter()

const {
  verifyPermission
} = userRoles()


let isMenuOpen = ref(false);

const loggedInUser = computed(() => store.getters['auth/currentUser'])

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value;
}

function closeMenus() {
  isMenuOpen.value = false;
}

function logout() {
  store.dispatch('auth/logout', loggedInUser.id).then(() => {
    router.push('/');
    notify('SUCCESS', "Usuário deslogado")
  }, error => {
    notify('DANGER', error)
  }
  );
}
</script>