<script setup lang="ts">
// Esta parte é opcional, serve para corrigir o erro do ESLint que vimos antes
defineOptions({
  name: 'DefaultLayout'
})
</script>

<template>
  <div>
    <AppNavbar />

    <main>
      <slot />
    </main>

    <AppFooter />
  </div>
</template>