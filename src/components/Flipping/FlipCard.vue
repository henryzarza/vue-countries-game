<script setup lang="ts">
import type { Country } from '@/types/Game'
import IconIdea from './IconIdea.vue'

const { data, index, isGuessed, isPicked } = defineProps<{
  data: Country
  index: number
  isGuessed?: boolean
  isPicked?: boolean
}>()
const emit = defineEmits<{ selectCountry: [index: number] }>()
</script>

<template>
  <button
    class="h-40 w-full rounded hover:shadow-md transition hover:scale-105 relative border-2 border-slate-300 dark:border-slate-600 cursor-pointer duration-500 ease-in-out card bg-violet-200 dark:bg-teal-900"
    :class="{
      'picked pointer-events-none': isPicked,
      'guessed pointer-events-none': isGuessed
    }"
    @click="isPicked || isGuessed ? {} : emit('selectCountry', index)"
  >
    <!-- Card front -->
    <div
      class="card-face card-face--front absolute inset-0 pointer-events-none flex flex-col items-center justify-center transition-colors"
      :class="{
        'bg-slate-200 dark:bg-slate-800': isPicked,
        'bg-slate-50 dark:bg-slate-700': isGuessed
      }"
    >
      <h6 class="text-8xl leading-[0.9]">
        {{ data.emoji }}
      </h6>
      <span class="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
        {{ data.name }}
      </span>
    </div>

    <!-- Card back -->
    <div
      class="card-face absolute inset-0 pointer-events-none flex flex-col items-center justify-center"
    >
      <IconIdea lineClass="fill-zinc-700 dark:fill-zinc-50" />
    </div>
  </button>
</template>

<style scoped>
.card {
  transform-style: preserve-3d;
}

.card-face {
  backface-visibility: hidden;
}

.card-face--front,
.picked {
  transform: rotateY(180deg);
}

.guessed {
  transform: rotateY(180deg) scale(0.9);
}
</style>
