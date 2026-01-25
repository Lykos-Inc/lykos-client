<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  layout: 'default'
})

// --- Estado das Abas ---
const items = [
  { label: 'Ativos', slot: 'active', count: 2 },
  { label: 'Concluídos', slot: 'completed', count: 5 },
  { label: 'Cancelados', slot: 'canceled', count: 0 }
]

// --- Mock de Pedidos ---
const orders = ref([
  {
    id: 'ORD-9988',
    serviceTitle: 'Criação de Identidade Visual Minimalista',
    freelancer: { name: 'Bruno Nunes', avatar: '' },
    image: '/images/mock-gig-cover.jpg',
    price: 500.00,
    status: 'IN_PROGRESS',
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'ORD-7766',
    serviceTitle: 'Edição de Vídeo para Reels',
    freelancer: { name: 'Pedro Cuts', avatar: '' },
    image: '/images/mock-video-thumb.jpg',
    price: 150.00,
    status: 'DELIVERED',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
  },
  {
    id: 'ORD-5544',
    serviceTitle: 'Consultoria SEO Avançada',
    freelancer: { name: 'Ana SEO', avatar: '' },
    image: '/images/mock-seo.jpg',
    price: 300.00,
    status: 'COMPLETED',
    date: new Date('2025-10-10')
  }
])

// --- Filtros ---
const filterOrders = (slotName: string) => {
  return orders.value.filter(o => {
    if (slotName === 'active') return ['IN_PROGRESS', 'DELIVERED', 'LATE'].includes(o.status)
    if (slotName === 'completed') return o.status === 'COMPLETED'
    if (slotName === 'canceled') return o.status === 'CANCELED'
    return false
  })
}

// --- Helpers Visuais ---
const getStatusBadge = (status: string) => {
  switch (status) {
    case 'IN_PROGRESS': return { label: 'Em Andamento', color: 'blue', icon: 'i-heroicons-arrow-path' }
    case 'DELIVERED': return { label: 'Aguardando Aprovação', color: 'purple', icon: 'i-heroicons-gift' }
    case 'LATE': return { label: 'Atrasado', color: 'red', icon: 'i-heroicons-exclamation-circle' }
    case 'COMPLETED': return { label: 'Concluído', color: 'green', icon: 'i-heroicons-check-badge' }
    case 'CANCELED': return { label: 'Cancelado', color: 'gray', icon: 'i-heroicons-x-circle' }
    default: return { label: status, color: 'gray', icon: '' }
  }
}

const money = (val: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val)
const formatDate = (d: Date) => d.toLocaleDateString('pt-BR')
</script>

<template>
  <div class="max-w-5xl mx-auto p-[var(--space-6)] space-y-[var(--space-8)]">

    <div>
      <h1 class="text-3xl font-bold text-[var(--ui-text)]">Meus Pedidos</h1>
      <p class="text-[var(--ui-text-muted)]">Acompanhe suas compras e entregas.</p>
    </div>

    <UTabs :items="items" class="w-full">

      <template v-for="tab in items" :key="tab.slot" #[tab.slot]>
        <div class="mt-6 space-y-3">

          <div
              v-for="order in filterOrders(tab.slot)"
              :key="order.id"
              class="group"
          >
            <UCard
                :ui="{
                root: 'hover:ring-1 hover:ring-[var(--ui-primary)] transition cursor-pointer',
                body: { padding: 'p-3 sm:p-4' }
              }"
                @click="navigateTo(`/orders/${order.id}`)"
            >
              <div class="flex gap-4">

                <div class="w-20 h-20 sm:w-28 sm:h-20 bg-gray-100 rounded-lg border border-[var(--ui-border)] overflow-hidden flex-shrink-0">
                  <img :src="order.image" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                </div>

                <div class="flex-1 min-w-0 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">

                  <div class="flex-1 min-w-0 space-y-1">
                    <div class="flex items-center gap-2 text-[10px] sm:text-xs text-[var(--ui-text-muted)]">
                      <span class="font-mono">{{ order.id }}</span>
                      <span class="hidden sm:inline">•</span>
                      <span>{{ formatDate(order.date) }}</span>
                    </div>

                    <h3 class="text-sm sm:text-base font-bold text-[var(--ui-text)] truncate pr-2 group-hover:text-[var(--ui-primary)] transition">
                      {{ order.serviceTitle }}
                    </h3>

                    <div class="text-xs sm:text-sm text-[var(--ui-text-muted)] flex items-center gap-2">
                      <UAvatar :alt="order.freelancer.name" size="2xs" />
                      <span class="truncate">Vendedor: <strong>{{ order.freelancer.name }}</strong></span>
                    </div>
                  </div>

                  <div class="flex items-center justify-between sm:flex-col sm:items-end sm:justify-center gap-1 sm:gap-2 flex-shrink-0 mt-1 sm:mt-0 pt-2 sm:pt-0 border-t sm:border-0 border-dashed border-[var(--ui-border)]">

                    <div class="font-bold text-base sm:text-lg text-[var(--ui-text)]">
                      {{ money(order.price) }}
                    </div>

                    <UBadge
                        :label="getStatusBadge(order.status).label"
                        :color="getStatusBadge(order.status).color"
                        variant="subtle"
                        size="xs"
                        class="capitalize"
                    />
                  </div>

                </div>

                <div class="hidden sm:flex items-center justify-center pl-2 text-[var(--ui-text-muted)] group-hover:translate-x-1 transition">
                  <UIcon name="i-heroicons-chevron-right" class="w-5 h-5" />
                </div>

              </div>
            </UCard>
          </div>

          <div v-if="filterOrders(tab.slot).length === 0" class="text-center py-16 bg-[var(--ui-bg-elevated)] rounded-lg border border-dashed border-[var(--ui-border)]">
            <UIcon name="i-heroicons-shopping-bag" class="w-12 h-12 text-[var(--ui-text-muted)] opacity-50 mx-auto mb-4"/>
            <h3 class="text-lg font-bold text-[var(--ui-text)]">Nenhum pedido aqui</h3>
            <p class="text-[var(--ui-text-muted)] mb-6">Você não tem compras nesta categoria.</p>
            <UButton to="/explorer" size="lg" color="primary">Explorar Serviços</UButton>
          </div>

        </div>
      </template>

    </UTabs>

  </div>
</template>