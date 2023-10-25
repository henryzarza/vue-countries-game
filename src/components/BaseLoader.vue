<script setup lang="ts">
const { message } = defineProps<{
  message: string
  }>()
</script>

<template>
  <span
    class="
      loader w-16 h-16 relative
      before:animate-spin before:w-16 before:h-16 before:border-2 before:border-violet-300 dark:before:border-teal-200 before:absolute before:left-0 before:top-0
      after:animate-spin after:w-16 after:h-16 after:border-2 after:border-violet-800 dark:after:border-teal-500 after:absolute after:left-0 after:top-0
    "
  />
  <h3 class="text-xl text-zinc-950 dark:text-zinc-50">
    {{message}}
  </h3>
</template>

<style scoped>

.loader::after,
.loader::before {
  animation: rotation 2s ease-in-out infinite;
}
.loader::after {
  animation-delay: 1s;
}

@keyframes rotation {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
} 
</style>
