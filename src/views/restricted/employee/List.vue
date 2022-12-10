<template>
  Lista 
</template>

<script setup>
import { onMounted, computed, ref } from 'vue'
import userService from '../../../services/user.service';


onMounted(async () => {
  const data = await userService.getUser();
  console.log(data)
})
</script>