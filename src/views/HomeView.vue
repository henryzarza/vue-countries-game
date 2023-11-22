<script setup lang="ts">
import { ref } from 'vue'
import { useQuery } from '@vue/apollo-composable'

import type { Country } from '@/types/Home'
import ListView from '@/components/Home/ListView.vue'
import MapView from '@/components/Home/MapView.vue'
import StateUI from '@/components/StateUI.vue'
import CountryDetail from '@/components/Home/CountryDetail.vue'
import { COUNTRIES_QUERY } from '@/constants/queries'

const view = ref('map')
const selectedCountryCode = ref()
const { result, loading, error } = useQuery<{ countries: Country[] }>(COUNTRIES_QUERY)

const selectCountry = (code?: string) => {
  selectedCountryCode.value = code
}
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
        aria-label="Show on map view"
      >
        <img class="w-8" src="assets/continents.png" alt="Continents icon">
      </label>
      <input class="radio hidden" type="radio" v-model="view" value="card" id="card" />
      <label
        for="card"
        class="py-2 px-4 flex items-center bg-zinc-200 cursor-pointer hover:bg-violet-200 transition-all"
        aria-label="Show on cards list"
      >
        <img class="w-6" src="assets/checklist.png" alt="Checklist icon">
      </label>
    </div>
  </header>

  <!-- When is loading -->
  <StateUI v-if="loading" type="loading" message="Loading..." />

  <!-- When there is an error -->
  <StateUI v-else-if="error" type="image" :message="error.message" />

  <!-- When there are data -->
  <template v-else-if="result?.countries && result.countries.length > 0">
    <!-- Map view -->
    <MapView
      :hidden="view !== 'map'"
      @selectCountry="selectCountry"
    />

    <!-- List view -->
    <ListView
      v-if="view === 'card'"
      :countries="result.countries"
      @selectCountry="selectCountry"
    />

    <!-- Modal to show the country detail -->
    <CountryDetail
      :code="selectedCountryCode"
      @closeModal="selectCountry"
    />
  </template>

  <!-- When result is empty -->
  <StateUI v-else type="image" message="Umm... There are no data to show" />

</template>

<style scoped>
.radio:checked + label {
  box-shadow:
    inset 2px 2px 3px rgba(0 0 0 / .15),
    inset -3px -3px 3px rgba(0 0 0 / .15);
  background-color: rgb(221 214 254 / var(--tw-bg-opacity));
}
</style>
