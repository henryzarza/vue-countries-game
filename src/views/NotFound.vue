<script setup lang="ts">
import StateUI from '@/components/StateUI.vue'
import { RouterLink } from 'vue-router'
</script>

<template>
  <h1 class="text-9xl font-bold text-zinc-950 dark:text-zinc-50 text-center">404</h1>
  <StateUI
    type="image"
    message="Ohh, it seems you're lost. The page you're trying to get doesn't exist 🤔"
  >
    <RouterLink
      class="text-lg text-zinc-50 py-2 px-3 rounded-sm transition-colors bg-violet-800 hover:bg-violet-500 hover:font-medium hover:text-zinc-50 dark:hover:bg-emerald-500 dark:bg-emerald-800 font-semibold mt-4"
      to="/"
    >
      Take me Home
    </RouterLink>
  </StateUI>
</template>
