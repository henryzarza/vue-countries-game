<script setup lang="ts">
import { RouterView } from 'vue-router'
import BaseNavbar from './components/BaseNavbar.vue'
import BaseFooter from './components/BaseFooter.vue'
</script>

<template>
  <BaseNavbar />

  <main class="pb-10 pt-16 px-4 max-w-full w-[1280px] mx-auto">
    <RouterView />
  </main>

  <BaseFooter />
</template>
