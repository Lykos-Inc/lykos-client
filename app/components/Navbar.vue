<script setup lang="ts">
import { Bell, Mail } from '@iconoir/vue'
import { useAuth } from '@/composables/useAuth'

const { isAuthenticated, isFreelancer, logout } = useAuth()
</script>

<template>
  <header class="border-b border-[var(--ui-border)] bg-[var(--ui-bg)]">
    <div class="mx-auto max-w-7xl h-16 flex items-center justify-between px-6">

      <!-- LOGO -->
      <NuxtLink to="/" class="flex items-center gap-2">
        <img src="/assets/img/Logo.png" class="h-8" />
      </NuxtLink>

      <!-- SEARCH -->
      <div class="hidden md:flex flex-1 px-8">
        <input
            type="text"
            placeholder="Que serviço você está procurando hoje?"
            class="w-full rounded-lg border border-[var(--ui-border)] px-4 py-2
                 bg-[var(--ui-bg-elevated)] text-[var(--ui-text)]"
        />


      </div>

      <!-- AÇÕES -->
      <div class="flex items-center gap-4">

        <!-- NÃO LOGADO -->
        <template v-if="!isAuthenticated">
          <NuxtLink to="/explorar">Explorar</NuxtLink>
          <NuxtLink to="/freelancer/criar">Torne-se um freelancer</NuxtLink>

          <NuxtLink
              to="/login"
              class="px-4 py-2 rounded-lg bg-[var(--ui-bg-muted)]"
          >
            Entrar
          </NuxtLink>

          <NuxtLink
              to="/cadastro"
              class="px-4 py-2 rounded-lg bg-[var(--ui-primary)] text-white"
          >
            Cadastre-se
          </NuxtLink>
        </template>

        <!-- LOGADO -->
        <template v-else>
          <NuxtLink to="/explorar">Explorar</NuxtLink>

          <!-- ÍCONES -->
          <button class="relative">
            <Bell />
            <span class="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </button>

          <button>
            <Mail />
          </button>

          <!-- AVATAR / DROPDOWN -->
          <div class="relative group">
            <img
                src="/assets/img/Lykos-Simbolo.png"
                class="h-9 w-9 rounded-full cursor-pointer"
            />

            <div
                class="absolute right-0 mt-2 w-56 rounded-lg shadow-lg
                     bg-[var(--ui-bg-elevated)] border border-[var(--ui-border)]
                     opacity-0 group-hover:opacity-100 pointer-events-none
                     group-hover:pointer-events-auto transition"
            >
              <NuxtLink class="dropdown-item" to="/perfil">Perfil</NuxtLink>

              <NuxtLink
                  v-if="!isFreelancer"
                  class="dropdown-item"
                  to="/freelancer/criar"
              >
                Torne-se um freelancer
              </NuxtLink>

              <NuxtLink class="dropdown-item" to="/configuracoes">
                Configurações
              </NuxtLink>

              <NuxtLink class="dropdown-item" to="/pagamentos">
                Faturamentos e pagamentos
              </NuxtLink>

              <button
                  class="dropdown-item text-red-600"
                  @click="logout"
              >
                Sair
              </button>
            </div>
          </div>
        </template>

      </div>
    </div>
  </header>
</template>

<style scoped>
.dropdown-item {
  display: block;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
}

.dropdown-item:hover {
  background-color: var(--ui-bg-muted);
}
</style>
