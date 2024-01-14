<template>
  <textarea :name="nameModel" :placeholder="placeholder" :value="value"
    class="text-primary-500 p-2 w-full h-28 border rounded-md border-primary-500 focus-within:ring-primary-500 focus:outline-none placeholder-primary-500"
    :class="{ 'border border-negative-300': errorMessage }" :maxlength="maxlength" @change="handleChange" @blur="handleBlur" />
    <div v-show="errorMessage" class="text-negative-300 text-sm">{{ errorMessage }}</div>
  </template> 
<script setup>
import { useField } from 'vee-validate'

const props = defineProps({
  nameModel: {
    type: String,
    required: true
  },
  maxlength: {
    type: Number,
    required: false
  },
  placeholder: {
    type: String,
    required: false
  }
})

const { value, errorMessage, handleChange, handleBlur } = useField(props.nameModel)

</script>