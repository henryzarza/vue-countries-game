<script setup lang="ts">
import { RouterLink } from 'vue-router'
import BaseThemeToggle from './BaseThemeToggle.vue'

const ROUTES = [
  {
    route: '/',
    name: 'Home'
  },
  {
    route: '/continents-game',
    name: 'Continents Game'
  },
  {
    route: '/flipping-game',
    name: 'Flipping Game'
  },
  {
    route: '/about',
    name: 'About'
  }
]
</script>

<template>
  <nav class="fixed bg-white dark:bg-slate-800 w-full py-2 shadow-md z-10">
    <div class="w-full max-w-[1280px] flex gap-6 items-center mx-auto px-4">
      <div class="flex-1 flex gap-2 items-center">
        <RouterLink
          v-for="route in ROUTES"
          :key="route.route"
          class="
            text-base dark:text-zinc-50 py-2 px-3 rounded-sm transition-all
            hover:bg-violet-800 hover:font-medium hover:text-zinc-50 dark:hover:bg-emerald-500
          "
          :to="route.route"
          active-class="bg-violet-800 dark:bg-emerald-500 font-medium text-zinc-50"
        >
          {{route.name}}
        </RouterLink>
      </div>

      <div class="relative w-24 h-8 hidden md:block">
        <BaseThemeToggle />
      </div>
    </div>
  </nav>
</template>
