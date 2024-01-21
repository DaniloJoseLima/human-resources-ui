<template>
  <teleport to="body">
    <transition
        enter-active-class="transition-opacity duration-200"
        leave-active-class="transition-opacity duration-200"
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
        @after-enter="afterBackdropEnter"
        @after-leave="afterBackdropLeave"
      >
        <div v-if="showingBackdrop" class="fixed inset-0 bg-black bg-opacity-75 backdrop-filter backdrop-blur z-40"></div>
    </transition>
    <transition
      enter-active-class="transition-all duration-200"
      leave-active-class="transition-all duration-200"
      enter-from-class="opacity-0 transform translate-y-24"
      leave-to-class="opacity-0 transform translate-y-24"
      @after-enter="afterModalEnter"
      @after-leave="afterModalLeave"
    >
      <div v-if="showingModal" class="fixed inset-0 flex flex-col justify-center items-center z-40"  @click.self="close">
          <div class="relative w-full md:w-auto bg-white rounded-[4px] h-screen md:h-auto overflow-auto py-4 border border-neutral-100">
            <button type="button" class="absolute p-2 top-3 right-4" @click.stop="close">
                <BaseIcons name="close" class="w-4 h-4 text-neutral-200" />
            </button>
            <slot v-bind="data" />
          </div>
      </div>
    </transition>
  </teleport>
</template>


<script setup>
import { ref } from 'vue'
import { onKeyStroke, createEventHook } from '@vueuse/core'

import BaseIcons from '@/components/BaseIcons.vue'

let removeKeyStrokeListener = ref()

const openHook = createEventHook()
const closeHook = createEventHook()

let showingBackdrop = ref(false)
let showingModal = ref(false)
let data = ref()

defineExpose({ open, close })

const emit = defineEmits(['open', 'close'])

function open (params) {
  data.value = params

  return new Promise(resolve => {
    removeKeyStrokeListener = onKeyStroke('Escape', close)
    
    requestAnimationFrame(() => {
      showingBackdrop.value = true
      openHook.on(resolve)
    })
  })
}

function close () {
  
  return new Promise(resolve => {
    removeKeyStrokeListener()
  
    requestAnimationFrame(() => {
      showingModal.value = false
      closeHook.on(resolve)
    })
  })
}

function afterBackdropEnter () {
  requestAnimationFrame(() => {
    showingModal.value = true
    openHook.trigger()
  })
}

function afterModalLeave () {
  requestAnimationFrame(() => {
    showingBackdrop.value = false
    closeHook.trigger()
  })
}

function afterModalEnter () {
  emit('open')  
}

function afterBackdropLeave () {
  emit('close')  
}
</script>