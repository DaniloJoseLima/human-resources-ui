<template>
  <svg aria-hidden="true" class="">
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script setup>
  import { computed } from 'vue'
  const props = defineProps({
    name: {
      type: String,
      required: true
    }
  })
  let symbolId = computed(() => `#${props.name}`)
</script>