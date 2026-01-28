<script setup lang="ts">
const { user, logout } = useAuth()

// Usamos computed para reagir quando o 'user' for carregado
const items = computed(() => [
  [
    {
      label: 'Meu Perfil',
      icon: 'i-heroicons-user',
      // Usa o campo 'nome_usuario' que vem do backend, ou 'me' como fallback
      to: `/u/${user.value?.nome_usuario || 'me'}`
    }
  ],
  [
    {
      label: 'Sair',
      icon: 'i-heroicons-arrow-left-on-rectangle',
      click: logout,
      iconClass: 'text-red-500',
      labelClass: 'text-red-500' // Deixa o texto vermelho para indicar ação destrutiva
    }
  ]
])
</script>

<template>
  <header class="border-b border-[var(--ui-border)] bg-[var(--ui-bg)] sticky top-0 z-50">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between gap-4">

        <NuxtLink to="/home" class="flex-shrink-0 flex items-center gap-2">
          <img src="~/assets/img/Logo.png" alt="Lykos" class="h-8 w-auto" />
        </NuxtLink>

        <div class="hidden md:flex flex-1 max-w-xl mx-8">
          <UInput
              icon="i-heroicons-magnifying-glass"
              placeholder="Encontre serviços ou freelancers..."
              color="gray"
              variant="outline"
              size="md"
              class="w-full"
              :ui="{ icon: { trailing: { pointer: '' } } }"
          />
        </div>

        <div class="flex items-center gap-3">

          <div class="relative">
            <UButton
                icon="i-heroicons-bell"
                color="neutral"
                variant="ghost"
                aria-label="Notificações"
            />
            <span class="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-[var(--ui-bg)]"></span>
          </div>

          <div class="h-6 w-px bg-[var(--ui-border)] mx-1"></div>

          <UDropdown
              :items="items"
              :popper="{ placement: 'bottom-end' }"
          >
            <UAvatar
                :src="user?.avatar_url || 'https://avatars.githubusercontent.com/u/739984?v=4'"
                alt="Avatar"
                size="sm"
                class="cursor-pointer ring-2 ring-transparent hover:ring-[var(--ui-primary)] transition-all"
            />

            <template #item="{ item }">
              <span class="truncate" :class="item.labelClass">{{ item.label }}</span>
              <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 ms-auto" :class="item.iconClass" />
            </template>
          </UDropdown>

        </div>

      </div>
    </div>
  </header>
</template>