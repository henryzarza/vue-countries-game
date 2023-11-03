<script setup lang="ts">
const { isVisible, hasWon } = defineProps<{
  isVisible: boolean,
  hasWon: boolean
}>()
const emit = defineEmits<{'resetGame': []}>()
</script>

<template>
  <div
    v-if="isVisible"
    class="fixed opacity-80 bg-black inset-0 z-10 transition-opacity"
  />
  <section
    class="
      flex flex-col fixed -bottom-1 left-0 right-0 bg-slate-100 dark:bg-slate-800 w-64 max-w-full mx-auto rounded
      border-2 border-slate-300 transition-transform z-20 dark:border-slate-700 items-center p-4
    "
    :class="isVisible ? 'translate-y-0' : 'translate-y-full'"
    aria-label="Game info result"
    aria-live="assertive"
  >
    <template v-if="hasWon">
      <h5 class="text-5xl" aria-label="celebrating emoji face">
        🥳
      </h5>
      <h6 class="text-xl font-semibold text-zinc-950 dark:text-zinc-50">You win</h6>
    </template>

    <template v-else>
      <h5 class="text-5xl" aria-label="crying emoji face">
        😭
      </h5>
      <h6 class="text-xl font-semibold text-zinc-950 dark:text-zinc-50">You lost</h6>
    </template>

    <button
      class="
        text-base text-zinc-50 py-2 px-3 rounded-sm transition-colors bg-violet-800
        hover:bg-violet-500 hover:font-medium hover:text-zinc-50 dark:hover:bg-emerald-500
        dark:bg-emerald-800 font-semibold mt-4
      "
      @click="emit('resetGame')"
    >
      Reset Game
    </button>
  </section>
</template>
