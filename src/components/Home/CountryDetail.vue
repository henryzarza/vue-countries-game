<script setup lang="ts">
const { code } = defineProps<{ code: string | undefined | null }>()
const emit = defineEmits<{'closeModal': []}>()
</script>

<template>
  <div
    v-if="code"
    class="fixed opacity-80 bg-black inset-0 z-10 transition-opacity"
  />
  <section
    class="
      flex flex-col fixed -bottom-1 left-0 right-0 bg-slate-100 dark:bg-slate-800 w-[30rem] max-w-full mx-auto rounded
      border-2 border-slate-300 transition-transform z-20
    "
    :class="code ? 'translate-y-0' : 'translate-y-full'"
    aria-label="Country detail"
    aria-live="assertive"
  >
    <button
      aria-label="close"
      class="
        absolute -top-10 right-4 py-2 px-4 text-2xl bg-slate-200 text-slate-900
        transition-colors hover:text-violet-500 font-extrabold rounded delay-200
      "
      :class="code ? 'translate-y-0' : 'translate-y-10'"
      @click="emit('closeModal')"
    >
      &times;
    </button>
    <header class="bg-slate-200 px-4 pb-4 border-b-2 border-b-slate-300 flex flex-col gap-1">
      <h3 class="text-3xl font-bold text-zinc-950 dark:text-slate-50 flex items-center">
        <span class="text-7xl mr-1" aria-label="Mexico flag emoji">
          🇲🇽
        </span>
        Mexico
      </h3>
      <div class="flex gap-3 flex-col md:flex-row justify-between">
        <h6 class="text-xl text-zinc-950 dark:text-slate-50">
          Capital: <strong class="font-semibold">Mexico City</strong>
        </h6>
        <h6 class="text-xl text-zinc-950 dark:text-slate-50">
          Code: <strong class="font-semibold">{{code}}</strong>
        </h6>
      </div>
    </header>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
      <div class="flex flex-col gap-1">
        <span class="text-sm font-semibold text-zinc-950 dark:text-slate-50">
          Currencies
        </span>
        <span class="text-base text-zinc-950 dark:text-slate-50">
          USD / USN / USS
        </span>
      </div>
      <div class="flex flex-col gapp-1">
        <span class="text-sm font-semibold text-zinc-950 dark:text-slate-50">
          Indicators
        </span>
        <span class="text-base text-zinc-950 dark:text-slate-50 font-bold">
          +1
        </span>
      </div>
      <div class="flex flex-col">
        <span class="text-sm font-semibold text-zinc-950 dark:text-slate-50">
          Continent
        </span>
        <span class="text-base text-zinc-950 dark:text-slate-50">
          North America
        </span>
      </div>
      <div class="flex flex-col gap-1 col-span-2">
        <span class="text-sm font-semibold text-zinc-950 dark:text-slate-50">
          Languages
        </span>
        <span class="text-base text-zinc-950 dark:text-slate-50">
          English (English) - <strong class="font-semibold">en</strong>
        </span>
        <span class="text-base text-zinc-950 dark:text-slate-50">
          Español (Spaninsh) - <strong>es</strong>
        </span>
      </div>
      <div class="flex flex-col">
        <span class="text-sm font-semibold text-zinc-950 dark:text-slate-50">
          AWS Region
        </span>
        <span class="text-base text-zinc-950 dark:text-slate-50">
          us-west-1
        </span>
      </div>
    </div>
    <hr class="w-full h-[1px] bg-slate-300 mb-2" />
    <h6 class="px-4 text-lg text-zinc-950 dark:text-slate-50 font-semibold mb-2">
      States
    </h6>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 px-4 pb-4 max-h-72 overflow-y-auto">
      <span
        v-for="state in [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]"
        :key="state"
        class="text-base text-zinc-950 dark:text-slate-50"
      >
        Alabama {{ state }} (<strong class="font-extrabold">AL</strong>)
      </span>
    </div>
  </section>
</template>
