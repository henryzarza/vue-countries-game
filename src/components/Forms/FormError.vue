<script setup lang="ts">
import { type ErrorObject } from '@vuelidate/core'

const { errors } = defineProps<{
  errors: ErrorObject[]
}>()
</script>

<template>
  <div class="flex flex-col" v-for="error of errors" :key="error.$uid">
    <span
      class="text-sm text-red-500 dark:text-red-600 font-medium mt-2"
      aria-role="alert"
      aria-live="assertive"
    >
      {{ error.$message }}
    </span>
  </div>
</template>
