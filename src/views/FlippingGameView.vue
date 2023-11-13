<script setup lang="ts">
import { ref } from 'vue'
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'

import FlipCard from '@/components/Flipping/FlipCard.vue'
import StateUI from '@/components/StateUI.vue'
import GameResult from '@/components/Flipping/GameResult.vue'
import type { Country } from '@/types/Game'
import { createArrayToPlay } from '@/utils'
import { MAX_MOVEMENTS, TIME_TO_TURN_OVER } from '@/constants'
import { COUNTRIES_TO_PLAY } from '@/constants'

const COUNTRIES_QUERY = gql`
  query flippingGameData {
    countries {
      code
      emoji
      name
    }
  }
`

const { result, loading, error, onResult } = useQuery<{ countries: Country[] }>(COUNTRIES_QUERY)

const shuffleCountries = ref<Country[]>([])

onResult(({ data }) => {
  if (data?.countries) {
    shuffleCountries.value = createArrayToPlay(data.countries)
  }
})

// game logic
const quantityMovements = ref(MAX_MOVEMENTS)
const indexPicked = ref<number>()
const secondIndexPicked = ref<number>()
const isPlaying = ref<boolean>()
let indexesGuessed = Array(COUNTRIES_TO_PLAY * 2).fill(false)

const selectCountry = (index: number) => {
  if (quantityMovements.value > 0 && !isPlaying.value) {
    isPlaying.value = true
    if (indexPicked.value !== undefined) {
      if (shuffleCountries.value[indexPicked.value].code === shuffleCountries.value[index].code) {
        indexesGuessed[indexPicked.value] = true
        indexesGuessed[index] = true
        indexPicked.value = undefined
        isPlaying.value = false
      } else {
        secondIndexPicked.value = index
        setTimeout(() => {
          indexPicked.value = undefined
          secondIndexPicked.value = undefined
          isPlaying.value = false
        }, TIME_TO_TURN_OVER)
      }
      quantityMovements.value--
    } else {
      indexPicked.value = index
      isPlaying.value = false
    }
  }
}

const resetGame = () => {
  loading.value = true
  quantityMovements.value = MAX_MOVEMENTS
  indexPicked.value = undefined
  secondIndexPicked.value = undefined
  indexesGuessed = Array(COUNTRIES_TO_PLAY * 2).fill(false)
  shuffleCountries.value = createArrayToPlay(result.value?.countries || [])
  isPlaying.value = false

  // to avoid Vue not remounting cards components issue
  setTimeout(() => {
    loading.value = false
  }, 100)
}
// end game logic

</script>

<template>
  <h1 class="text-4xl font-bold text-zinc-950 dark:text-zinc-50 mb-4 text-center">
    Flipping Game
  </h1>
  <p class="text-base text-zinc-950 dark:text-zinc-50 max-w-xl w-full mx-auto mb-4">
    The idea of this memory game is: you click on a card, then the card flips over,
    you will see an emoji with the flag and the name of the country, then you click
    on a different card and if it matches (they are the same), well you have a <strong class="font-semibold">match</strong>.
    If there is no match both will turn over, so you must memorize the position of each
    country on the card to win the game. <strong class="font-semibold">Enjoy it and good luck!</strong>
  </p>

  <!-- When is loading -->
  <StateUI v-if="loading" type="loading" message="Loading..." />

  <!-- When there is an error -->
  <StateUI v-else-if="error" type="image" :message="error.message" />

  <!-- When there are data -->
  <template v-else-if="shuffleCountries.length > 0">
    <h6 class="flex items-center justify-center text-base text-zinc-950 dark:text-zinc-50 mb-6">
      Movements: <span class="text-4xl font-semibold ml-3">{{quantityMovements}}</span>
    </h6>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
      <FlipCard
        v-for="(country, index) in shuffleCountries"
        :key="country.code"
        :data="country"
        :index="index"
        :isGuessed="indexesGuessed[index]"
        :isPicked="indexPicked === index || secondIndexPicked === index"
        @selectCountry="selectCountry"
      />
    </div>

    <GameResult
      :hasWon="indexesGuessed.every(el => !!el)"
      :isVisible="quantityMovements === 0"
      @resetGame="resetGame"
    />
  </template>

  <!-- When result is empty -->
  <StateUI v-else type="image" message="Umm... There are no data to show" />
</template>
