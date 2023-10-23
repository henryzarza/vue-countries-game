<script setup lang="ts">
import { computed } from 'vue'
import type { Country } from '@/types/Home'

const { countries } = defineProps<{ countries: Country[] }>()

const filterCountries = computed(() => countries.slice(0, 6))
</script>

<template>
  <ul class="grid md:grid-cols-2 grid-cols-1 gap-4">
    <li
      class="
        flex gap-3 items-center bg-teal-100 rounded-sm border-[1px] border-teal-300 py-2
        px-3 cursor-pointer hover:bg-teal-300 hover:shadow-lg transition-all
        dark:bg-slate-800 dark:border-slate-600 dark:hover:bg-slate-600
      "
      v-for="country in filterCountries"
      :key="country.code"
    >
      <span class="text-6xl" :aria-label="country.name + ' flag emoji'">
        {{ country.emoji }}
      </span>
      <div class="flex flex-col flex-1">
        <h5 class="text-xl font-bold text-zinc-950 dark:text-slate-50">
          {{ country.name }}
        </h5>
        <p class="text-base text-zinc-950 dark:text-slate-50">
          Capital: <strong class="font-bold">{{country.capital}}</strong>
        </p>
      </div>
      <h6 class="text-xl font-medium text-zinc-950 dark:text-slate-50 flex flex-col items-center">
        <small class="text-sm font-normal">Code</small>
        {{country.code}}
      </h6>
    </li>
  </ul>
</template>
