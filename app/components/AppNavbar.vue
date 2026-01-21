<script setup lang="ts">
import { Bell } from '@iconoir/vue'
import { useAuth } from '@/composables/useAuth'

const { isAuthenticated, isFreelancer, logout } = useAuth()
</script>

<template>
  <header
      class="border-b bg-[var(--ui-bg)] border-[var(--ui-border)]"
  >
    <div
        class="mx-auto max-w-7xl h-16
             flex items-center justify-between
             px-[var(--space-6)]"
    >

      <!-- LOGO -->
      <NuxtLink to="/" class="flex items-center gap-[var(--space-2)]">
        <img src="/assets/img/Logo.png" class="h-8" />
      </NuxtLink>

      <!-- SEARCH -->
      <div class="hidden md:flex flex-1 px-[var(--space-8)]">
        <input
            type="text"
            placeholder="Que serviço você está procurando hoje?"
            class="
            w-full
            rounded-[var(--ui-radius-md)]
            border border-[var(--ui-border)]
            bg-[var(--ui-bg-elevated)]
            px-[var(--space-4)]
            py-[var(--space-2)]
            text-[var(--ui-text)]
            placeholder:text-[var(--ui-text-muted)]
            focus:outline-none
            focus:ring-2
            focus:ring-[var(--ui-primary)]
          "
        />
      </div>

      <!-- AÇÕES -->
      <div class="flex items-center gap-[var(--space-4)]">

        <!-- NÃO LOGADO -->
        <template v-if="!isAuthenticated">
          <NuxtLink class="text-sm text-[var(--ui-text-muted)]" to="/explorar">
            Explorar
          </NuxtLink>

          <NuxtLink
              class="text-sm text-[var(--ui-text-muted)]"
              to="/freelancer/criar"
          >
            Torne-se um freelancer
          </NuxtLink>

          <NuxtLink
              to="/login"
              class="
              px-[var(--space-4)]
              py-[var(--space-2)]
              rounded-[var(--ui-radius-md)]
              bg-[var(--ui-bg-muted)]
              text-sm
            "
          >
            Entrar
          </NuxtLink>

          <NuxtLink
              to="/cadastro"
              class="
              px-[var(--space-4)]
              py-[var(--space-2)]
              rounded-[var(--ui-radius-md)]
              bg-[var(--ui-primary)]
              text-white
              text-sm
            "
          >
            Cadastre-se
          </NuxtLink>
        </template>

        <!-- LOGADO -->
        <template v-else>
          <NuxtLink class="text-sm" to="/explorar">
            Explorar
          </NuxtLink>

          <!-- NOTIFICAÇÕES -->
          <button
              class="
              relative
              rounded-[var(--ui-radius-sm)]
              p-[var(--space-2)]
              hover:bg-[var(--ui-bg-muted)]
            "
          >
            <Bell />
            <span
                class="
                absolute -top-1 -right-1
                h-2 w-2
                rounded-full
                bg-red-500
              "
            />
          </button>

          <ThemeSwitcher />

          <!-- AVATAR / DROPDOWN -->
          <div class="relative group">
            <img
                src="/assets/img/Lykos-Simbolo.png"
                class="
                h-9 w-9
                rounded-full
                cursor-pointer
                border border-[var(--ui-border)]
              "
            />

            <div
                class="
                absolute right-0 mt-[var(--space-2)]
                w-56
                rounded-[var(--ui-radius-lg)]
                border border-[var(--ui-border)]
                bg-[var(--ui-bg-elevated)]
                shadow-lg
                opacity-0
                pointer-events-none
                group-hover:opacity-100
                group-hover:pointer-events-auto
                transition
              "
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
  padding: var(--space-3) var(--space-4);
  font-size: 0.875rem;
  color: var(--ui-text);
}

.dropdown-item:hover {
  background-color: var(--ui-bg-muted);
}
</style>
