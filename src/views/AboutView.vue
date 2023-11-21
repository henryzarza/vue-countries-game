<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { computed, reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import {
  required,
  email,
  numeric,
  minLength,
  helpers,
  maxValue
} from '@vuelidate/validators'

import FormInput from '@/components/Forms/FormInput.vue'
import FormRadioCheckbox from '@/components/Forms/FormRadioCheckbox.vue'
import FormSelect from '@/components/Forms/FormSelect.vue'
import FormTextarea from '@/components/Forms/FormTextarea.vue'
import FormError from '@/components/Forms/FormError.vue'
import type { Country } from '@/types/Home'
import { SA_COUNTRIES_QUERY } from '@/constants/queries'

const CUISINE_COUNTRIES = [
  { id: 'AR', name: '🇦🇷 Argentinian' },
  { id: 'CO', name: '🇨🇴 Colombian' },
  { id: 'MX', name: '🇲🇽 Mexican' },
  { id: 'PE', name: '🇵🇪 Peruvian' },
]

const { result } = useQuery<{ continents: { countries: Omit<Country, 'capital'>[] }[] }>(SA_COUNTRIES_QUERY)

const filterCountries = computed(
  () => {
    if (result.value?.continents && result.value.continents.length > 0) {
      return result.value.continents[0].countries.map(({ code, name, emoji }) => ({ id: code, name: `${emoji} ${name}` }))
    }

    return []
  })

const formState = reactive({
  fullName: '',
  email: '',
  countriesVisited: '',
  countriesThisYear: '',
  favoriteCountry: '',
  leastFavoriteCountry: '',
  favoriteFood: '',
  andeanCountries: new Set(),
  password: '',
  randomContent: ''
})
const v$ = useVuelidate({
  fullName: {
    required: helpers.withMessage('This field is required', required),
    minLength: helpers.withMessage('Full Name must be at least 3 characters', minLength(3)),
    $autoDirty: true
  },
  email: {
    required: helpers.withMessage('This field is required', required),
    email: helpers.withMessage('Email format is invalid', email),
    minLength: helpers.withMessage('Email must be at least 6 characters', minLength(6)),
    $autoDirty: true
  },
  countriesVisited: {
    required: helpers.withMessage('This field is required', required),
    numeric: helpers.withMessage('This field must be numeric', numeric),
    maxValue: helpers.withMessage('There are only 195 countries in the world. Did you travel to Mars?', maxValue(195)),
    $autoDirty: true
  },
  countriesThisYear: {
    required: helpers.withMessage('This field is required', required),
    numeric: helpers.withMessage('This field must be numeric', numeric),
    maxValue: helpers.withMessage('There are only 195 countries in the world. Did you travel to Mars?', maxValue(195)),
    $autoDirty: true
  },
  favoriteCountry: {
    required: helpers.withMessage('This field is required', required),
    $autoDirty: true
  },
  favoriteFood: {
    required: helpers.withMessage('This field is required', required)
  },
  password: {
    required: helpers.withMessage('This field is required', required),
    minLength: helpers.withMessage('Email must be at least 8 characters', minLength(8)),
    $autoDirty: true
  },
  randomContent: {
    minLength: helpers.withMessage('This field must be at least 3 characters', minLength(10)),
    $autoDirty: true
  }
}, formState)

const updateCheckboxValue = (value: string) => {
  if (formState.andeanCountries.has(value)) {
    formState.andeanCountries.delete(value)
  } else {
    formState.andeanCountries.add(value)
  }
}

const onSubmit = () => {
  v$.value.$touch()
}

</script>

<template>
  <h1 class="text-4xl font-bold text-zinc-950 dark:text-zinc-50 mb-4 text-center">
    About
  </h1>
  <p class="text-base text-zinc-950 dark:text-zinc-50 max-w-md w-full mx-auto mb-6">
    This page is just for testing and learning purposes about working with forms validations
    in VueJS, it's me just playing around 🤷
  </p>
  <div class="flex flex-col md:flex-row gap-4 justify-center items-start" v-if="!!formState">
    <form class="flex flex-col w-full max-w-md gap-5 mx-auto" @submit.prevent="onSubmit">
      <div class="flex flex-col">
        <FormInput
          label="Full Name"
          nameId="fullName"
          placeholder="Jane Doe"
          v-model="formState.fullName"
          :hasError="v$.fullName.$errors.length > 0"
          isRequired
        >
          <FormError :errors="v$.fullName.$errors" />
        </FormInput>
      </div>
      <div class="flex flex-col">
        <FormInput
          label="Email"
          nameId="email"
          placeholder="jane_doe@example.io"
          autocomplete="email"
          v-model="formState.email"
          :hasError="v$.email.$errors.length > 0"
          isRequired
        >
          <FormError :errors="v$.email.$errors" />
        </FormInput>
      </div>
      <div class="flex flex-col sm:flex-row gap-4">
        <div class="flex flex-col flex-1">
          <FormInput
            label="How many countries have you visited?"
            nameId="countriesVisited"
            placeholder="7"
            type="number"
            v-model="formState.countriesVisited"
            :hasError="v$.countriesVisited.$errors.length > 0"
            isRequired
          >
            <FormError :errors="v$.countriesVisited.$errors" />
          </FormInput>
        </div>
        <div class="flex flex-col flex-1">
          <FormInput
            label="How many countries did you visit this year?"
            nameId="countriesThisYear"
            placeholder="2"
            type="number"
            v-model="formState.countriesThisYear"
            :hasError="v$.countriesThisYear.$errors.length > 0"
            isRequired
          >
            <FormError :errors="v$.countriesThisYear.$errors" />
          </FormInput>
        </div>
      </div>
      <div class="flex flex-col" v-if="filterCountries.length > 0">
        <FormSelect
          label="Favorite South America Country"
          nameId="favoriteCountry"
          placeholder="Which country..."
          :options="filterCountries"
          :hasError="v$.favoriteCountry.$errors.length > 0"
          v-model="formState.favoriteCountry"
          isRequired
        >
          <FormError :errors="v$.favoriteCountry.$errors" />
        </FormSelect>
      </div>
      <div class="flex flex-col" v-if="filterCountries.length > 0">
        <FormSelect
          label="Least favorite South America Country"
          nameId="leastFavoriteCountry"
          placeholder="Which country..."
          :options="filterCountries"
          v-model="formState.leastFavoriteCountry"
        />
      </div>
      <div class="flex flex-col">
        <FormRadioCheckbox
          label="What is your favorite cuisine?"
          nameId="favoriteFood"
          type="radio"
          :options="CUISINE_COUNTRIES"
          @updateValue="value => formState.favoriteFood = value"
          isRequired
        >
          <FormError :errors="v$.favoriteFood.$errors" />
        </FormRadioCheckbox>
      </div>
      <div class="flex flex-col">
        <FormRadioCheckbox
          label="Which countries are Andean?"
          nameId="andeanCountries"
          type="checkbox"
          :options="filterCountries"
          @updateValue="updateCheckboxValue"
        />
      </div>
      <div class="flex flex-col">
        <FormInput
          label="Password"
          nameId="password"
          placeholder="••••••••••"
          type="password"
          v-model="formState.password"
          :hasError="v$.password.$errors.length > 0"
          isRequired
        >
          <FormError :errors="v$.password.$errors" />
        </FormInput>
      </div>
      <div class="flex flex-col">
        <FormTextarea
          label="A random content"
          nameId="randomContent"
          placeholder="Lorem ipsum..."
          :hasError="v$.randomContent.$errors.length > 0"
          v-model="formState.randomContent"
        >
          <FormError :errors="v$.randomContent.$errors" />
        </FormTextarea>
      </div>
      <button
        type="submit"
        class="
          text-base text-zinc-50 py-2 px-3 rounded-sm transition-colors mt-6
          bg-violet-800 font-bold hover:text-zinc-50 dark:bg-emerald-700
          hover:bg-violet-600 dark:hover:bg-emerald-600
        "
        @click="onSubmit"
      >
        Let's Go
      </button>
    </form>
  
    <div class="flex flex-col w-full max-w-md sticky top-24" v-if="!v$.$invalid">
      <h6 class="text-lg font-bold text-zinc-950 dark:text-zinc-50 mb-2">Form is Valid 🥳</h6>
      <pre
        data-testid="form-result"
        class="
          w-full border-2 border-zinc-300 bg-zinc-100 p-3 dark:bg-zinc-800
          dark:border-zinc-400 border-dashed text-zinc-950 dark:text-zinc-50
        "
      >{{ JSON.stringify({ ...formState, andeanCountries: Array.from(formState.andeanCountries) }, undefined, 2) }}</pre>
    </div>
  </div>
</template>
