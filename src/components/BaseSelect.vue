<template>
  <Listbox v-model="nameModel">
    <div class="relative w-full">
      <ListboxButton class="relative text-left border border-primary-500 rounded-md w-full h-11 p-2 text-primary-500">
        <span class="block truncate">{{ nameModel.title ? nameModel.title : label }}</span>
        <ChevronUpDownIcon class="absolute right-2 top-3 h-5 w-5" aria-hidden="true" />
      </ListboxButton>

      <transition leave-active-class="transition duration-100 ease-in" leave-from-class="opacity-100"
        leave-to-class="opacity-0">
        <ListboxOptions
          class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
          <ListboxOption v-slot="{ active, selected }" v-for="item in listItens" :key="item.id" :value="item"
            as="template">
            <li
              :class="[ active ? 'bg-neutral-50 text-primary-500 font-bold' : 'text-primary-100','relative cursor-default select-none py-2 pl-10 pr-4',]">
              <span :class="[ selected ? 'font-medium' : 'font-normal', 'block truncate', ]">{{ item.title }}</span>
              <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-500">
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script setup>
import { Listbox, ListboxButton, ListboxOptions, ListboxOption, } from '@headlessui/vue'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/vue/20/solid'

const props = defineProps({
  nameModel: {
    type: String,
    required: true
  },
  listItens: {
    type: Array,
    required: true
  },
  label: {
    type: String,
    required: true
  },
})
</script>
