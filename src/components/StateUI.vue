<script setup lang="ts">
import BaseLoader from './BaseLoader.vue'
import emptySrc from '@/assets/empty.svg'

const { type, message } = defineProps<{
  type: 'image' | 'loading'
  message: string
}>()
</script>

<template>
  <div class="flex flex-col gap-6 items-center justify-center min-h-[60vh] max-w-[30rem] mx-auto">
    <template v-if="type === 'image'">
      <img
        class="w-96 max-w-full"
        :src="emptySrc"
        alt="Man with a green t-shirt opening a purple folder"
      />
      <h3 class="text-xl text-zinc-950 dark:text-zinc-50">
        {{ message }}
      </h3>
    </template>
    <BaseLoader v-else :message="message" />
  </div>
</template>
