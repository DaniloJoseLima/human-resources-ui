<template>
  <Header />
  <div class="relative container min-h-[85vh] pt-8 mb-10">
    <router-view></router-view>
  </div>
</template>

<script setup>
import Header from '@/components/Header.vue';

</script>