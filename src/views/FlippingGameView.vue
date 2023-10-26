<script setup lang="ts">
import Card from '@/components/Flipping/Card.vue'
</script>

<template>
  <h1 class="text-4xl font-bold text-zinc-950 dark:text-zinc-50 mb-4 text-center">
    Flipping Game
  </h1>
  <p class="text-base text-zinc-950 dark:text-zinc-50 max-w-xl w-full mx-auto mb-4">
    The idea of this memory game is: you click on a card, then the card flips over,
    you will see an emoji with the flag and the name of the country, then you click
    on a different card and if it matches (they are the same), well you have a <strong class="font-semibold">match</strong>.
    If there is no match both will turn over, so you must memorize the position of each
    country on the card to win the game. <strong class="font-semibold">Enjoy it and good luck!</strong>
  </p>
  <h6 class="flex items-center justify-center text-base text-zinc-950 dark:text-zinc-50 mb-6">
    Movements: <span class="text-4xl font-semibold ml-3">25</span>
  </h6>
  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
    <Card emoji="🇲🇰" />
    <Card emoji="🇲🇽" />
    <Card emoji="🇩🇪" />
    <Card emoji="🇦🇱" />
    <Card emoji="🇸🇮" is-guessed />
    <Card emoji="🇨🇴" />
    <Card emoji="🇨🇿" />
    <Card emoji="🇧🇦" is-picked />
    <Card emoji="🇷🇸" />
    <Card emoji="🇭🇷" />
  </div>
</template>
