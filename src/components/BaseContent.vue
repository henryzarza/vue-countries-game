<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <h1 class="text-green-700 mb-4 text-4xl">{{ title }}</h1>
  <slot />
</template>
