<script setup lang="ts">
import { RouterView } from 'vue-router'
import BaseNavbar from './components/BaseNavbar.vue'
import BaseFooter from './components/BaseFooter.vue'
</script>

<template>
  <BaseNavbar />

  <main class="py-10 px-4 max-w-full w-[1280px] mx-auto">
    <RouterView />
  </main>

  <BaseFooter />
</template>
