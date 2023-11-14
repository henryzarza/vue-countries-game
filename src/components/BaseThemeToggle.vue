<script setup lang="ts">
import { ref, watch, onMounted, onUnmounted } from 'vue'

const isDark = ref(false)

onMounted(() => {
  isDark.value = localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
})

onUnmounted(() => {
  localStorage.removeItem('theme')
})

watch(isDark, () => {
  if (isDark.value) {
    document.documentElement.classList.add('dark')
    localStorage.theme = 'dark'
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.theme = 'light'
  }
})
</script>

<template>
  <input
    class="hidden toggle-input"
    type="checkbox"
    name="theme"
    id="theme"
    v-model="isDark"
  />
  <label
    class="
      label cursor-pointer absolute transition-all bg-repeat-x right-0 top-0 h-8 w-16
      after:rounded-full after:absolute after:h-6 after:w-6 after:transition-all after:left-1
    "
    for="theme"
    :aria-label="isDark ? 'Dark theme on' : 'Light theme on'"
  />
</template>

<style scoped>
.label {
  background: linear-gradient(white 50%, transparent 0) 0 0,
    radial-gradient(circle closest-side, white 53%, transparent 0) 0 0,
    radial-gradient(circle closest-side, white 50%, transparent 0) 3.5rem 0
    #ADE1F8;
  background-size: 1rem 2rem;
  border: 0.1rem solid #93C2D5;
  border-radius: 2rem;
}

.label::after {
  background-color: #FADF7E;
  border: 0.05rem solid #DCC35E;
  position: absolute;
  top: 0.2rem;
  transform: translateX(0);
}

.toggle-input:checked + .label {
  background: radial-gradient(white 15%, transparent 16%),
    radial-gradient(white 15%, transparent 16%);
  background-color: #3D4145;
  background-position: 0 0, 1.5rem 1.5rem;
  background-size: 2.5rem 2.5rem;
  border-color: #1E1E1D;
}

.toggle-input:checked + .label::after {
  background-color: white;
  border-color: #E4E6CA;
  transform: translateX(1.85rem);
}
</style>
