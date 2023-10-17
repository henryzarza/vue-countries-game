<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
    <RouterLink to="/continents-game">Continents Game</RouterLink>
    <RouterLink to="/flipping-game">Flipping Game</RouterLink>
  </nav>
</template>
