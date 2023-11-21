<script setup lang="ts">
import type { Country, CONTINENTS_CODES } from '@/types/Game'

const {
  data,
  showName,
  continentCode,
} = defineProps<{
  data: Country,
  showName: boolean,
  continentCode: CONTINENTS_CODES | 'ALL',
}>()
const emit = defineEmits<{
  'startDrag': [
    event: DragEvent,
    data: {
      country: Country,
      continentCode: CONTINENTS_CODES | 'ALL'
    }
  ]}>()
</script>

<template>
  <div
    class="
      max-w-[10rem] rounded hover:shadow-md transition hover:scale-105 p-2
      border-2 border-solid border-slate-200 dark:border-slate-600
      cursor-pointer bg-slate-100 dark:bg-slate-900 flex flex-col text-center
    "
    draggable="true"
    @dragstart="emit('startDrag', $event, { country: data, continentCode })"
    aria-label="Drag country item"
  >
    <h6 class="text-6xl leading-[0.9]">
      {{data.emoji}}
    </h6>
    <span v-if="showName" class="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
      {{data.name}}
    </span>
  </div>
</template>
