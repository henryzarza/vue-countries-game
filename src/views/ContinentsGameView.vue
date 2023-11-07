<script setup lang="ts">
import { ref } from 'vue'
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'

import Card from '@/components/Continents/Card.vue'
import type { Continent } from '@/types/Game'
import StateUI from '@/components/StateUI.vue'
import { type Country, CONTINENTS_CODES } from '@/types/Game'
import { shuffleArray } from '@/utils'
import { COUNTRIES_TO_DRAG } from '@/constants'

const CONTINENTS_QUERY = gql`
  query continentsGameData {
    continents {
      code
      name
    }
    countries {
      code
      name
      emoji
      continent {
        code
      }
    }
  }
`
const { result, loading, error, onResult } = useQuery<{
    continents: Continent[],
    countries: Country[]
  }>(CONTINENTS_QUERY)

const isHard = ref(true)
const hasWon = ref(false)
const quantityMisplaced = ref(0)
const dropInteraction = ref<{ [T in CONTINENTS_CODES | 'ALL']: Country[] }>({
  [CONTINENTS_CODES.AF]: [],
  [CONTINENTS_CODES.AN]: [],
  [CONTINENTS_CODES.AS]: [],
  [CONTINENTS_CODES.EU]: [],
  [CONTINENTS_CODES.NA]: [],
  [CONTINENTS_CODES.OC]: [],
  [CONTINENTS_CODES.SA]: [],
  ALL: [],
})

onResult(({ data }) => {
  if (data?.countries) {
    dropInteraction.value.ALL = shuffleArray(data.countries).slice(0, COUNTRIES_TO_DRAG)
  }
})

// Start game logic
const startDrag = (event: DragEvent, data: { country: Country, continentCode: CONTINENTS_CODES | 'ALL' }) => {
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move'
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('country', JSON.stringify(data.country))
    event.dataTransfer.setData('entryCode', data.continentCode)
  }
}

const onDrop = (event: DragEvent, continent: CONTINENTS_CODES) => {
  if (event.dataTransfer) {
    const country = JSON.parse(event.dataTransfer.getData('country')) as Country
    const entryCode = event.dataTransfer.getData('entryCode') as CONTINENTS_CODES
  
    if (country) {
      dropInteraction.value[entryCode] = dropInteraction.value[entryCode].filter(el => el.code !== country.code)
      dropInteraction.value[continent].push(country)
    }
  }
}

const validateCountries = () => {
  let counter = 0
  for (const key in dropInteraction.value) {
    if (key !== 'ALL') {
      dropInteraction.value[key as CONTINENTS_CODES].forEach(el => {
        if (el.continent?.code !== key) {
          counter++
        }
      })
    }
  }
  quantityMisplaced.value = counter
  if (counter === 0) {
    hasWon.value = true
  }
}

const playAgain = () => {
  if (result.value?.countries) {
    hasWon.value = false
    quantityMisplaced.value = 0
    dropInteraction.value = {
      [CONTINENTS_CODES.AF]: [],
      [CONTINENTS_CODES.AN]: [],
      [CONTINENTS_CODES.AS]: [],
      [CONTINENTS_CODES.EU]: [],
      [CONTINENTS_CODES.NA]: [],
      [CONTINENTS_CODES.OC]: [],
      [CONTINENTS_CODES.SA]: [],
      'ALL': shuffleArray(result.value.countries).slice(0, COUNTRIES_TO_DRAG)
    }
  }
}
// End game logic 

</script>

<template>
  <h1 class="text-4xl font-bold text-zinc-950 dark:text-zinc-50 mb-4 text-center">
    Continents Game
  </h1>
  <p class="text-base text-zinc-950 dark:text-zinc-50 max-w-xl w-full mx-auto mb-4">
    The idea of this game is: you <strong class="font-semibold">drag</strong> a country
    card and <strong class="font-semibold">drop</strong> it to the continent section
    you think it belongs to. When you are sure everything is ok, you should press the button
    and see the result <span aria-label="Cross fingers emoji">🤞</span>.
    <strong class="font-semibold">Enjoy it and good luck!</strong>
  </p>

  <!-- When is loading -->
  <StateUI v-if="loading" type="loading" message="Loading..." />

  <!-- When there is an error -->
  <StateUI v-else-if="error" type="image" :message="error.message" />

  <!-- When there are data -->
  <template v-else-if="result?.continents">
    <!-- Interactions buttons -->
    <div class="flex justify-center mb-6 gap-6 flex-col sm:flex-row">
      <div class="flex items-center">
        <input class="w-5 h-5" v-model="isHard" type="checkbox" name="toggleHard" id="toggleHard">
        <label
          class="text-lg font-semibold text-zinc-800 dark:text-zinc-50 ml-2"
          for="toggleHard"
        >
          Hard Mode
        </label>
      </div>
      <button
        class="
          text-base text-zinc-50 py-2 px-3 rounded-sm transition-colors
          bg-emerald-600 font-medium dark:bg-violet-800
          hover:bg-emerald-800 dark:hover:bg-violet-600
        "
        @click="playAgain"
        v-if="hasWon"
      >
        ¡Yay you won 🥳! Play Again
      </button>
      <button
        v-else
        class="
          text-base text-zinc-50 py-2 px-3 rounded-sm transition-colors
          bg-violet-800 font-medium hover:text-zinc-50 dark:bg-emerald-600
          hover:bg-violet-600 dark:hover:bg-emerald-400 disabled:opacity-80 disabled:cursor-not-allowed
        "
        @click="validateCountries"
        :disabled="dropInteraction.ALL.length > 0"
      >
        Let's Check 🤞
      </button>
    </div>

    <!-- Status message -->
    <h6
      v-if="quantityMisplaced > 0"
      class="mb-4 text-center text-lg font-semibold text-violet-900 dark:text-emerald-200 message"
    >
      {{ quantityMisplaced === 1 ? `There is ${quantityMisplaced} country that is poorly` : `There are ${quantityMisplaced} countries that are poorly` }} positioned. Try again 💪
    </h6>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div
        v-for="(continent, i) in result.continents"
        :key="continent.code"
        class="
          w-full min-h-[10rem] border-dashed border-2 border-violet-400 dark:border-teal-700
          bg-violet-100 dark:bg-teal-900 relative flex flex-wrap pt-10 p-3 gap-3 content-start
        "
        :class="{ 'row-start-3': i > 3}"
        @drop="onDrop($event, continent.code)"
        @dragover.prevent
        @dragenter.prevent
      >
        <h6 class="text-lg absolute top-1 left-3 font-bold text-zinc-700 dark:text-zinc-50">
          {{continent.name}} ({{ continent.code }})
        </h6>
        <Card
          v-for="country in dropInteraction[continent.code]"
          :key="country.code"
          :data="country"
          :show-name="!isHard"
          :continent-code="continent.code"
          @start-drag="startDrag"
        />
      </div>

      <div class="flex flex-wrap col-start-2 col-end-4 gap-3 my-4 items-start">
        <Card
          v-for="country in dropInteraction.ALL"
          :key="country.code"
          :data="country"
          :show-name="!isHard"
          continent-code="ALL"
          @start-drag="startDrag"
        />
      </div>
    </div>
  </template>

  <!-- When result is empty -->
  <StateUI v-else type="image" message="Umm... There are no data to show" />
</template>

<style scoped>
.message {
  animation: shake 80ms ease-in 5 alternate;
}

@keyframes shake {
  from {
    transform: translateX(-0.5rem);
  }
  to {
    transform: translateX(0.5rem);
  }
}
</style>
