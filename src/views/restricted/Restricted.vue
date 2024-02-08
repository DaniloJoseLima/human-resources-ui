<template>
  <Header />
  <div class="relative container min-h-[90vh] pt-32 mb-10">
    <router-view></router-view>

  </div>
  <footer class="bg-primary-600 text-white p-4">
    <div class="container flex space-x-4 justify-center items-center">
      <div class="text-sm">
        <p>&copy; 2024 Copyright - Danilo Lima</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import Header from '@/components/Header.vue';

</script>