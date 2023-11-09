<script setup lang="ts">
const {
  nameId,
  options,
  type,
  label,
  isRequired,
} = defineProps<{
  nameId: string,
  options: { id: string, name: string }[],
  type: 'radio' | 'checkbox',
  label: string,
  isRequired?: boolean,
}>()
defineEmits<{
  'updateValue': [value: string]
}>()
</script>

<template>
  <span class="text-sm font-medium mb-1 text-zinc-950 dark:text-zinc-50" :for="nameId">
    {{label}} {{ isRequired ? ' *' : '' }}
  </span>
  <div class="flex flex-wrap gap-3">
    <div class="flex gap-1" v-for="option in options" :key="option.id">
      <input
        class="custom-input hidden"
        :type="type"
        :name="nameId"
        :id="`${nameId}-${option.id}`"
        :value="option.id"
        @change="$emit('updateValue', ($event.target as HTMLInputElement).value)"
      >
      <label
        :for="`${nameId}-${option.id}`"
        class="
          text-md text-zinc-950 dark:text-zinc-50 p-2 ring-1 ring-inset ring-zinc-300
          bg-zinc-100 dark:ring-zinc-500 dark:bg-zinc-700 rounded-sm
          cursor-pointer transition-all hover:bg-violet-200 hover:shadow-md hover:ring-violet-300
          dark:hover:bg-emerald-900 dark:hover:ring-emerald-700 hover:font-semibold
        "
      >
        {{option.name}}
      </label>
    </div>
  </div>
  <slot />
</template>

<style scoped>
.custom-input:checked + label {
  box-shadow: inset 2px 2px 2px rgb(0 0 0 / 0.25), inset -2px -2px 2px rgb(0 0 0 / 0.2);
  font-weight: 600;
  transform: scale(0.9);
}
</style>
