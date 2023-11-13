<script setup lang="ts">
const { nameId, type = "text", label, placeholder } = defineProps<{
  nameId: string,
  type?: HTMLInputElement['type'],
  label: string,
  placeholder?: string
}>()
</script>

<template>
  <label
    :for="nameId"
    class="text-sm font-medium mb-1 text-zinc-950 dark:text-zinc-50 capitalize"
  >
    {{label}}
  </label>
  <input
    :type="type"
    :id="nameId"
    :placeholder="placeholder"
    class="
      w-full rounded-sm border-0 py-2 px-3 text-zinc-950 dark:text-zinc-50 shadow-sm
      ring-1 ring-inset ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset
      focus:ring-violet-600 dark:focus:ring-emerald-600 bg-zinc-50 dark:bg-zinc-800
      dark:placeholder:text-zinc-500 dark:ring-zinc-700 outline-none
    "
  >
</template>
