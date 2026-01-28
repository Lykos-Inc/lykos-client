<script setup lang="ts">
// Navbar para visitantes (Não logados)
</script>

<template>
  <header class="border-b border-[var(--ui-border)] bg-[var(--ui-bg)]/80 backdrop-blur-md sticky top-0 z-50">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between gap-4">

        <NuxtLink to="/" class="flex-shrink-0 flex items-center gap-2">
          <img src="~/assets/img/Logo.png" alt="Lykos" class="h-8 w-auto" />
        </NuxtLink>

        <div class="hidden md:flex flex-1 max-w-md mx-4">
          <UInput
              icon="i-heroicons-magnifying-glass"
              placeholder="Que serviço você procura?"
              color="neutral"
              variant="outline"
              size="md"
              class="w-full"
              :ui="{ icon: { trailing: { pointer: '' } } }"
          />
        </div>

        <div class="flex items-center gap-2 sm:gap-4">

          <div class="hidden md:flex items-center gap-4">
            <UButton
                to="/explorar"
                variant="ghost"
                color="neutral"
                label="Explorar"
                class="font-medium"
            />

            <UButton
                to="/freelancer/criar"
                variant="ghost"
                color="neutral"
                label="Seja um Freelancer"
                class="font-medium text-[var(--ui-primary)]"
            />
          </div>

          <div class="hidden md:block h-6 w-px bg-[var(--ui-border)] mx-1"></div>

          <UButton
              to="/login"
              variant="ghost"
              color="neutral"
              label="Entrar"
              class="font-bold"
          />

          <UButton
              to="/signup"
              color="primary"
              variant="solid"
              label="Cadastre-se"
              class="font-bold"
          />
        </div>

      </div>
    </div>
  </header>
</template>