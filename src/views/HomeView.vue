<script setup lang="ts">
import { ref } from 'vue'
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'
import type { Country } from '@/types/Home'
import ListView from '@/components/Home/ListView.vue'
import MapView from '@/components/Home/MapView.vue'

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

const view = ref('map')
const { result, loading, error } = useQuery<{ countries: Country[] }>(COUNTRIES_QUERY)
</script>

<template>
  <header class="flex gap-4 mb-8 items-center">
    <h1 class="text-4xl font-bold text-zinc-950 dark:text-zinc-50 flex-1">Countries</h1>
    <div class="flex border-solid border-[1px] border-zinc-950 rounded-sm overflow-hidden">
      <input class="radio hidden" type="radio" v-model="view" value="map" id="map" />
      <label
        for="map"
        class="
          py-2 px-4 flex items-center bg-zinc-200 cursor-pointer hover:bg-violet-200 transition-all
          border-solid border-r-[1px] border-r-zinc-950 border-zinc-950
        "
      >
        <img class="w-8" src="assets/continents.png" alt="Continents icon">
      </label>
      <input class="radio hidden" type="radio" v-model="view" value="card" id="card" />
      <label
        for="card"
        class="py-2 px-4 flex items-center bg-zinc-200 cursor-pointer hover:bg-violet-200 transition-all"
      >
        <img class="w-6" src="assets/checklist.png" alt="Checklist icon">
      </label>
    </div>
  </header>

  <!-- When is loading -->
  <div v-if="loading">
    <h2>Loading...</h2>
  </div>

  <!-- When there is an error -->
  <div v-else-if="error">
    <h3>Error: {{ error.message }}</h3>
  </div>

  <!-- When there are data -->
  <template v-else-if="result?.countries && result.countries.length > 0">
    <!-- Map view -->
    <MapView :hidden="view !== 'map'" />

    <!-- List view -->
    <ListView v-if="view === 'card'" :countries="result.countries" />
  </template>

  <!-- When result is empty -->
  <div v-else>
    <h3>No Data</h3>
  </div>

</template>

<style scoped>
.radio:checked + label {
  box-shadow:
    inset 2px 2px 3px rgba(0 0 0 / .15),
    inset -3px -3px 3px rgba(0 0 0 / .15);
  background-color: rgb(221 214 254 / var(--tw-bg-opacity));
}
</style>
