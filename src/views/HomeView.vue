<script setup lang="ts">
import { ref, computed } from 'vue'
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'

const COUNTRIES_QUERY = gql`
  query getCountries {
    countries {
      code
      emoji
      name
      capital
    }
  }
`

const view = ref('card')
const { result, loading, error } = useQuery<{
  countries: {
    code: string;
    emoji: string;
    name: string;
    capital: string;
  }[]
}>(COUNTRIES_QUERY)

// TODO: add lazy loading to replace 50 for dynamic value
const filterCountries = computed(() => result.value?.countries.slice(0, 50) ?? [])

</script>

<template>
  <header class="flex gap-4 flex-col md:flex-row mb-8 items-center">
    <h1 class="text-4xl font-bold text-zinc-950 dark:text-zinc-50 flex-1">Countries</h1>
    <div class="flex border-solid border-[1px] border-zinc-950 rounded-sm overflow-hidden">
      <input class="radio hidden" type="radio" v-model="view" value="card" id="card" />
      <label
        for="card"
        class="
          py-2 px-4 flex items-center bg-zinc-200 cursor-pointer hover:bg-violet-200 transition-all
          border-solid border-r-[1px] border-r-zinc-950 border-zinc-950
        "
      >
        <img class="w-8" src="assets/continents.png" alt="Continents icon">
      </label>
      <input class="radio hidden" type="radio" v-model="view" value="map" id="map" />
      <label
        for="map"
        class="py-2 px-4 flex items-center bg-zinc-200 cursor-pointer hover:bg-violet-200 transition-all"
      >
        <img class="w-6" src="assets/checklist.png" alt="Checklist icon">
      </label>
    </div>
  </header>

  <div v-if="loading">
    <h2>Loading...</h2>
  </div>

  <div v-else-if="error">
    <h3>Error: {{ error.message }}</h3>
  </div>

  <template v-else>
    <ul
      class="grid md:grid-cols-2 grid-cols-1 gap-4"
      v-if="view === 'card'"
    >
      <li
        class="
          flex gap-3 items-center bg-violet-100 rounded-sm border-[1px] border-violet-300 py-2
          px-3 cursor-pointer hover:bg-violet-300 hover:shadow-lg transition-all
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
  
    <div class="flex" v-else>
      Map content
    </div>
  </template>

</template>

<style scoped>
.radio:checked + label {
  box-shadow:
    inset 2px 2px 3px rgba(0 0 0 / .15),
    inset -3px -3px 3px rgba(0 0 0 / .15);
  background-color: rgb(221 214 254 / var(--tw-bg-opacity));
}
</style>
