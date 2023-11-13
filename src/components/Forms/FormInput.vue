<script setup lang="ts">
const {
  nameId,
  type,
  label,
  placeholder,
  autocomplete,
  modelValue,
  isRequired,
  hasError
} = defineProps<{
  nameId: string,
  type?: HTMLInputElement['type'],
  label: string,
  placeholder?: string,
  autocomplete?: string
  modelValue: string,
  isRequired?: boolean,
  hasError?: boolean
}>()
defineEmits<{
  'update:modelValue': [value: string | null]
}>()
</script>

<template>
  <label
    :for="nameId"
    class="text-sm font-medium mb-1 text-zinc-950 dark:text-zinc-50 capitalize"
  >
    {{label}} {{ isRequired ? ' *' : '' }}
  </label>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
    :type="type || 'text'"
    :id="nameId"
    :placeholder="placeholder"
    class="
      w-full rounded-sm border-0 py-2 px-3 text-zinc-950 dark:text-zinc-50 shadow-sm
      ring-1 ring-inset placeholder:text-zinc-400 focus:ring-2 focus:ring-inset
      focus:ring-violet-600 dark:focus:ring-emerald-600 bg-zinc-50 dark:bg-zinc-800
      dark:placeholder:text-zinc-500 outline-none
    "
    :class="hasError ?
      'ring-red-500 dark:ring-red-600 shake' :
      'ring-zinc-300 dark:ring-zinc-700'
    "
    :autocomplete="autocomplete"
  >
  <slot />
</template>
