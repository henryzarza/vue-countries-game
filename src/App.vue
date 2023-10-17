<script setup lang="ts">
import { RouterView } from 'vue-router'
import BaseNavbar from './components/BaseNavbar.vue'
import BaseFooter from './components/BaseFooter.vue'
</script>

<template>
  <BaseNavbar />

  <RouterView />

  <BaseFooter />
</template>
