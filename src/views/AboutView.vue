<script setup lang="ts">
import FormInput from '@/components/Forms/FormInput.vue'
import FormRadioCheckbox from '@/components/Forms/FormRadioCheckbox.vue'
import FormSelect from '@/components/Forms/FormSelect.vue'
import FormTextarea from '@/components/Forms/FormTextarea.vue'

// TODO: replace this with backend integration
const MOCK_COUNTRIES = [
  { id: 'AR', name: '🇦🇷 Argentina' },
  { id: 'CO', name: '🇨🇴 Colombia' },
  { id: 'CH', name: '🇨🇱 Chile' },
  { id: 'PE', name: '🇵🇪 Peru' },
  { id: 'PA', name: '🇵🇾 Paraguay' },
]
// TODO: replace this with backend integration
const MOCK_RADIO_DATA = [
  { id: 'AR', name: '🇦🇷 Argentinian' },
  { id: 'CO', name: '🇨🇴 Colombian' },
  { id: 'MX', name: '🇲🇽 Mexican' },
  { id: 'PE', name: '🇵🇪 Peruvian' },
]

const onSubmit = () => {
  console.log('validate')
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
  <!-- Interactions buttons -->
  <form class="flex flex-col w-full max-w-md gap-5 mx-auto" @submit.prevent="onSubmit">
    <div class="flex flex-col">
      <FormInput label="Full Name" nameId="fullName" placeholder="Jane Doe" />
    </div>
    <div class="flex flex-col">
      <FormInput label="Email" nameId="email" placeholder="jane_doe@example.io" />
    </div>
    <div class="flex flex-col sm:flex-row gap-4">
      <div class="flex flex-col">
        <FormInput label="How many countries have you visited?" nameId="countriesVisited" placeholder="7" type="number" />
      </div>
      <div class="flex flex-col">
        <FormInput label="How many countries did you visit this year?" nameId="countriesThisYear" placeholder="2" type="number" />
      </div>
    </div>
    <div class="flex flex-col">
      <FormSelect
        label="Favorite South America Country"
        nameId="favoriteCountry"
        placeholder="Which country..."
        :options="MOCK_COUNTRIES"
      />
    </div>
    <div class="flex flex-col">
      <FormSelect
        label="Least favorite South America Country"
        nameId="leastFavoriteCountry"
        placeholder="Which country..."
        :options="MOCK_COUNTRIES"
      />
    </div>
    <div class="flex flex-col">
      <FormRadioCheckbox
        label="What is your favorite cuisine?"
        nameId="favoriteFood"
        type="radio"
        :options="MOCK_RADIO_DATA"
      />
    </div>
    <div class="flex flex-col">
      <FormRadioCheckbox
        label="Which countries are Andean?"
        nameId="andeanCountries"
        type="checkbox"
        :options="MOCK_COUNTRIES"
      />
    </div>
    <div class="flex flex-col">
      <FormInput label="Password" nameId="password" placeholder="••••••••••" type="password" />
    </div>
    <div class="flex flex-col">
      <FormInput label="Repeat Password" nameId="repeatPassword" placeholder="••••••••••" type="password" />
    </div>
    <div class="flex flex-col">
      <FormTextarea
        label="A random content"
        nameId="randomContent"
        placeholder="Lorem ipsum..."
      />
    </div>

    <button
      type="submit"
      class="
        text-base text-zinc-50 py-2 px-3 rounded-sm transition-colors mt-6
        bg-violet-800 font-bold hover:text-zinc-50 dark:bg-emerald-700
        hover:bg-violet-600 dark:hover:bg-emerald-600
      "
    >
      Let's Go
    </button>
  </form>
</template>
