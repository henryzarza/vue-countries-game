<script setup lang="ts">
import gql from 'graphql-tag'
import { useQuery } from '@vue/apollo-composable'
import BaseLoader from '../BaseLoader.vue'
import type { CountryDetail } from '@/types/Home'

const COUNTRY_DETAIL = gql`
  query countryDetail($code: ID!) {
    country(code: $code) {
      emoji
      name
      capital
      awsRegion
      currencies
      phone
      states {
        code
        name
      }
      continent {
        name
      }
      languages {
        code
        name
        native
      }
    }
  }
`
const props = defineProps<{ code: string | undefined | null }>()
const emit = defineEmits<{'closeModal': []}>()

const { result, error, loading } = useQuery<{
    country: CountryDetail
  }>(
    COUNTRY_DETAIL,
    () => ({ code: props.code }),
    () => ({ enabled: !!props.code })
  )
</script>

<template>
  <div
    v-if="code"
    class="fixed opacity-80 bg-black inset-0 z-10 transition-opacity"
  />
  <section
    class="
      flex flex-col fixed -bottom-1 left-0 right-0 bg-slate-100 dark:bg-slate-800 w-[30rem] max-w-full mx-auto rounded
      border-2 border-slate-300 transition-transform z-20 dark:border-slate-700
    "
    :class="code ? 'translate-y-0' : 'translate-y-full'"
    aria-label="Country detail"
    aria-live="assertive"
    :aria-hidden="!code"
  >
    <button
      aria-label="close"
      class="
        absolute -top-12 right-4 py-2 px-4 text-2xl bg-slate-200 dark:bg-slate-900 text-slate-900
        transition-all hover:bg-violet-200 hover:text-violet-700 font-extrabold rounded delay-200 dark:text-slate-50
        dark:hover:bg-teal-100 dark:hover:text-teal-700 border-2 border-slate-300 z-20 dark:border-slate-700 border-b-0
      "
      :class="code ? 'translate-y-0' : 'translate-y-10'"
      @click="emit('closeModal')"
    >
      &times;
    </button>

    <!-- Loading and error state -->
    <div v-if="loading" class="flex flex-col gap-6 items-center justify-center min-h-[20rem]">
      <BaseLoader message="Loading..." />
    </div>

    <!-- Empty data or error -->
    <div v-else-if="!result?.country || error"
      class="flex flex-col gap-6 items-center justify-center min-h-[20rem]"
    >
      <h3 class="text-xl text-zinc-950 dark:text-zinc-50">
        {{ error ? error.message : "There are no data to show 😭" }}
      </h3>
    </div>

    <!-- Country detail layout -->
    <template v-else>
      <header
        class="
          bg-slate-200 dark:bg-slate-900 px-4 pb-4 border-b-2 flex flex-col gap-1
          border-b-slate-300 dark:border-b-slate-700
        "
      >
        <h3 class="text-3xl font-bold text-zinc-950 dark:text-slate-50 flex items-center">
          <span class="text-7xl mr-1" :aria-label="`${result.country.name} flag emoji`">
            {{ result.country.emoji }}
          </span>
          {{result.country.name}}
        </h3>
        <div class="flex gap-3 flex-col md:flex-row justify-between">
          <h6 class="text-xl text-zinc-950 dark:text-slate-50">
            Capital: <strong class="font-semibold">{{result.country.capital}}</strong>
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
            {{ result.country.currencies.join(' / ') }}
          </span>
        </div>
        <div class="flex flex-col gapp-1">
          <span class="text-sm font-semibold text-zinc-950 dark:text-slate-50">
            Indicator
          </span>
          <span class="text-base text-zinc-950 dark:text-slate-50 font-bold">
            +{{ result.country.phone}}
          </span>
        </div>
        <div class="flex flex-col">
          <span class="text-sm font-semibold text-zinc-950 dark:text-slate-50">
            Continent
          </span>
          <span class="text-base text-zinc-950 dark:text-slate-50">
            {{result.country.continent?.name || 'Unknown'}}
          </span>
        </div>
        <div class="flex flex-col gap-1 col-span-2">
          <span class="text-sm font-semibold text-zinc-950 dark:text-slate-50">
            Languages
          </span>
          <span
            v-for="language in result.country.languages"
            class="text-base text-zinc-950 dark:text-slate-50"
            :key="language.code"
          >
            {{language.native}} ({{language.name}}) - <strong class="font-semibold">{{language.code}}</strong>
          </span>
        </div>
        <div class="flex flex-col">
          <span class="text-sm font-semibold text-zinc-950 dark:text-slate-50">
            AWS Region
          </span>
          <span class="text-base text-zinc-950 dark:text-slate-50">
            {{result.country.awsRegion}}
          </span>
        </div>
      </div>

      <hr class="w-full h-[1px] border-slate-300 dark:border-slate-700 mb-2" />

      <template v-if="result.country.states && result.country.states.length > 0">
        <h6 class="px-4 text-lg text-zinc-950 dark:text-slate-50 font-semibold mb-2">
          States
        </h6>
        <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 px-4 pb-4 max-h-72 overflow-y-auto" aria-label="States list">
          <li
            v-for="state in result.country.states"
            :key="state.code"
            class="text-base text-zinc-950 dark:text-slate-50"
          >
            {{state.name}}
            <strong v-if="state.code" class="font-extrabold">({{state.code}})</strong>
        </li>
        </ul>
      </template>
    </template>
  </section>
</template>
