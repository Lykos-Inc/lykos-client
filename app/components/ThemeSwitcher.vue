<script setup lang="ts">
const colorMode = useColorMode()

const toggleTheme = () => {
  colorMode.preference =
      colorMode.preference === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <UButton
      variant="ghost"
      @click="toggleTheme"
      :aria-label="`Ativar tema ${colorMode.preference === 'dark' ? 'claro' : 'escuro'}`"
  >
    <UIcon
        :name="colorMode.preference === 'dark'
        ? 'i-heroicons-sun'
        : 'i-heroicons-moon'"
    />
  </UButton>
</template>
