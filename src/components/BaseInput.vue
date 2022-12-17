<template>
  <div>
    <div
      class="flex flex-col justify-center relative w-full h-11 p-2 bg-white rounded-md focus-within:ring-1 focus-within:ring-inset border border-primary-500 focus-within:ring-primary-500"
      :class="{ 'border-negative-300': errorMessage, 'bg-neutral-50 border-neutral-50': disabled }">
      <input :id="name" :name="name" :type="props.type" :value="value ? formattedValue : undefined" :disabled="disabled"
        v-bind="$attrs" class="block bg-transparent w-full border-none focus:ring-0 focus:outline-none transform text-primary-500"
        :class="{ 'translate-y-2': !!value && props.label, 'focus:translate-y-2': props.label }" @change="handleChange"
        @blur="handleBlur">
      <label v-show="label" :for="name"
        class="absolute text-primary-500 transform-gpu transition-all duration-200 select-none pointer-events-none"
        :class="{ '-translate-y-3 text-xs': !!value, 'text-neutral-200': disabled }">{{ props.label }}</label>
    </div>
    <div v-show="errorMessage" class="text-negative-300 text-sm">{{ errorMessage }}</div>
  </div>
</template>

<script setup>
import { watch, ref } from 'vue'
import { useField } from 'vee-validate'
import { mask } from 'maska'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  mask: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

let formattedValue = ref()

const { value, errorMessage, handleChange, handleBlur } = useField(props.name)

watch(value, (newValue) => {
  if (newValue) {
    if (!props.mask) {
      formattedValue.value = newValue
      handleChange(newValue)
      return
    }

    formattedValue.value = mask(newValue, props.mask)
    handleChange(newValue.replace(/[\W_]+/g, ''))
  }
})
</script>

<style lang="postcss" scoped>
input[type="number"]::-webkit-inner-spin-button,

input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}

input:focus-within~label {
  @apply -translate-y-3 text-xs;
}

input:autofill,
input:autofill:hover,
input:autofill:focus {
  -webkit-text-fill-color: white;
  box-shadow: 0 0 0px 1000px #112A3C inset;
  transition: background-color 5000s ease-in-out 0s;
}
</style>