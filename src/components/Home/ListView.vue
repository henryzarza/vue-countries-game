<script setup lang="ts">
import { computed, onMounted, ref, onUnmounted } from 'vue'
import type { Country } from '@/types/Home'

const REGISTER_PER_PAGE = 40

const { countries } = defineProps<{ countries: Country[] }>()
const emit = defineEmits<{'selectCountry': [code: string]}>()

const lastIndex = ref(REGISTER_PER_PAGE)
const filterCountries = computed(() => countries.slice(0, lastIndex.value) ?? [])
const intersectionRef = ref()
let observer: IntersectionObserver

onMounted(() => {
  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        lastIndex.value = lastIndex.value + REGISTER_PER_PAGE > countries.length
          ? countries.length : lastIndex.value + REGISTER_PER_PAGE

        if (lastIndex.value === countries.length)
          observer.unobserve(intersectionRef.value)
      }
    })
  }
  
  observer = new IntersectionObserver(handleIntersection, {
    rootMargin: '100px'
  })

  observer.observe(intersectionRef.value)
})

onUnmounted(() => {
  if (observer && intersectionRef.value) {
    observer.unobserve(intersectionRef.value)
  }
})

</script>

<template>
  <ul class="grid md:grid-cols-2 grid-cols-1 gap-4">
    <li
      class="
        flex gap-3 items-center bg-violet-100 rounded-sm border-[1px] border-violet-300 py-2
        px-3 cursor-pointer hover:bg-violet-300 hover:shadow-lg transition-all hover:scale-105
        dark:bg-slate-800 dark:border-slate-600 dark:hover:bg-slate-600
      "
      v-for="country in filterCountries"
      :key="country.code"
      @click="emit('selectCountry', country.code)"
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

  <!-- this element is for infinite scroll functionality with the Intersection Observer API -->
  <div class="w-full h-6" ref="intersectionRef" />
</template>
