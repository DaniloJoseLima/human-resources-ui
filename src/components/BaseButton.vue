<template>
  <button
    class="flex items-center justify-center w-full h-14 font-bold rounded-md transition-colors duration-200 disabled:cursor-not-allowed hover:opacity-70"
    :class="getStyles()" :disabled="disabled" @click="onClick">
    <BaseIcons v-if="loading" name="spin" class="animate-spin w-6" />
    <template v-else>
      <slot />
    </template>
  </button>
</template>

<script setup>
import BaseIcons from '@/components/BaseIcons.vue'

const props = defineProps({
  loading: {
    type: Boolean,
    default: false
  },
  outline: {
    type: Boolean,
    default: false
  },  
  red: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['click'])

function getStyles() {
  const style = props.outline ? 'outline' : props.red ? 'red' : 'default'

  if (props.disabled === true) {
    return {
      outline: ['text-neutral-400', 'border', 'border-neutral-400', 'bg-transparent', 'hover:bg-transparent', 'active:bg-transparent'],
      red: ['text-neutral-400', 'border', 'border-neutral-400', 'bg-transparent', 'hover:bg-transparent', 'active:bg-transparent'],
      default: ['text-neutral-400', 'bg-neutral-500', 'hover:bg-neutral-500', 'active:bg-neutral-500']
    }[style]
  }

  return {
    outline: ['text-primary-300', 'border', 'border-primary-300', 'hover:text-primary-200', 'active:text-primary-100', 'hover:border-primary-200', 'active:border-primary-100', 'disabled:text-neutral-400', 'disabled:border-neutral-400'],
    red: ['text-negative-300', 'border', 'border-negative-300', 'hover:text-negative-200', 'active:text-negative-100', 'hover:border-negative-200', 'active:border-negative-100', 'disabled:text-neutral-400', 'disabled:border-neutral-400'],
    default: ['text-primary-500', 'bg-white', 'hover:bg-neutral-100', 'active:bg-neutral-200', 'disabled:text-neutral-300', 'disabled:bg-neutral-500']
  }[style]
}

function onClick(ev) {
  if (props.loading || props.disabled) {
    ev.preventDefault()
    return
  }

  emits('click', ev)
}
</script>