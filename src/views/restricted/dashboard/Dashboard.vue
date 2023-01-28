<script setup>
import { useStore } from 'vuex';
import { onMounted, computed, ref } from 'vue'
import userService from '../../../services/user.service';

import BaseIcons from '@/components/BaseIcons.vue'

const store = useStore()
const loggedInUser = computed(() => store.getters['auth/currentUser'])

onMounted(async () => {
  const data = await userService.getUser();
  console.log(data)
})
</script>
<template>
  <section v-if="loggedInUser && loggedInUser.name" class="text-center">
    <h1 class="text-primary-500 text-3xl text-center font-bold uppercase">Que os jogos comecem {{
      loggedInUser.name
    }}!!!</h1>
    <h1 class="text-primary-500 text-2xl text-center uppercase">Página em construção.</h1>
    <BaseIcons name="spin" class="animate-spin w-16 text-primary-500 m-auto" />
  </section>

</template>