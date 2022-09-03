
<template>

<div class="fixed flex items-center justify-end max-w-xs p-4 bg-white border rounded-md shadow-sm z-50  mt-24 right-5 transition-opacity" 
     v-for="toast in toasts " :key="toast.id"
     :class="shadows[toast.type]">
  <div class="flex items-center">
     <template v-if="toast.type==='SUCCESS'">
      <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 "  :class="colors[toast.type]" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clip-rule="evenodd" />
      </svg>
     </template>
     <template v-if="toast.type==='INFO'">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 " :class="colors[toast.type]"  viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clip-rule="evenodd" />
        </svg>
     </template>
      <template v-if="toast.type==='WARNING'">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" :class="colors[toast.type]"  viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd"
            d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clip-rule="evenodd" />
        </svg>
     </template>
     <template v-if="toast.type==='DANGER'">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8" :class="colors[toast.type]"  viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clip-rule="evenodd" />
        </svg>
     </template>
    
    <p class="ml-3 text-sm font-bold" :class="colors[toast.type]" >{{toast.message}}</p>
  </div>
  <span class="inline-flex items-center cursor-pointer">
    <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-600" fill="none" viewBox="0 0 24 24"
      stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  </span>
</div>
</template>
<script setup>
import { computed, ref } from "vue";

import { useStore } from "vuex";

const store = useStore();

const shadows = ref({
    ['SUCCESS']:'shadow-positive-400  ',
    ['INFO']:'shadow-neutral-400 ',
    ['WARNING']: 'shadow-warning-400  ',
    ['DANGER']: 'text-negative-400 '
})

const colors = ref({
    ['SUCCESS']:'text-positive-400 ',
    ['INFO']:'text-neutral-400',
    ['WARNING']: 'text-warning-400 ',
    ['DANGER']: 'text-negative-400 '
})

const toasts = computed(()=> store.state.toast.toasts)

</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
    opacity: 0;
    transition-property: opacity;    
    transition-duration: 200ms;
}
.fade-enter, .fade-leave-to {
  opacity: 1;
}
</style>