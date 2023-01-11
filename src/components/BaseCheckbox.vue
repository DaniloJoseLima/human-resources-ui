<template>
  <div>
    <Field v-slot="{ field, errors }" :name="name" type="checkbox" :value="value" :unchecked-value="false"
      :validate-on-input="true">
      <div class="flex items-center space-x-2">
        <input :id="`${name}_${value}`" v-bind="field" :value="value" type="checkbox"
          class="inline w-5 h-5 cursor-pointer accent-primary-500 focus:accent-pink-100 shadow"
          :class="{ 'border-red-500': errors.length, 'hidden': hidden }">
        <label :for="`${name}_${value}`" class="inline cursor-pointer text-primary-500" v-if="label">{{ label }}</label>
        <slot v-bind:field="field"></slot>
      </div>
    </Field>
    <ErrorMessage :name="name" class="text-negative-300 text-sm" />
  </div>
</template>

<script setup>
import { Field, ErrorMessage } from 'vee-validate'
const props = defineProps({
  name: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: false
  },
  value: {
    required: false
  },
  hidden: {
    type: Boolean,
    required: false
  },
})

</script>