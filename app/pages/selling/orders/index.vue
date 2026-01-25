<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  layout: 'default'
})

// --- Mock de Vendas (Orders Received) ---
const orders = ref([
  {
    id: 'ORD-8855',
    buyer: { name: 'Startup Solar', avatar: '' },
    gigTitle: 'Criação de Identidade Visual Minimalista',
    price: 500.00,
    status: 'IN_PROGRESS', // IN_PROGRESS, LATE, DELIVERED, COMPLETED, CANCELED
    deadline: '2025-11-20',
    createdAt: '2025-11-15'
  },
  {
    id: 'ORD-1234',
    buyer: { name: 'Roberto M.', avatar: '' },
    gigTitle: 'Landing Page Vue.js',
    price: 1200.00,
    status: 'COMPLETED',
    deadline: '2025-10-10',
    createdAt: '2025-10-01'
  }
])

// Helpers
const money = (val: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val)

const getStatusColor = (status: string) => {
  switch (status) {
    case 'IN_PROGRESS': return 'blue'
    case 'LATE': return 'red'
    case 'DELIVERED': return 'purple'
    case 'COMPLETED': return 'green'
    default: return 'gray'
  }
}
</script>

<template>
  <div class="max-w-7xl mx-auto p-6 space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-[var(--ui-text)]">Gerenciar Vendas</h1>
    </div>

    <UCard :ui="{ body: { padding: 'p-0' } }">
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left">
          <thead class="bg-[var(--ui-bg-elevated)] text-[var(--ui-text-muted)] uppercase text-xs">
          <tr>
            <th class="p-4">Comprador</th>
            <th class="p-4">Serviço</th>
            <th class="p-4">Prazo</th>
            <th class="p-4">Valor</th>
            <th class="p-4">Status</th>
            <th class="p-4 text-right">Ação</th>
          </tr>
          </thead>
          <tbody class="divide-y divide-[var(--ui-border)]">
          <tr v-for="order in orders" :key="order.id" class="hover:bg-[var(--ui-bg-hover)]">
            <td class="p-4 font-medium">
              <div class="flex items-center gap-2">
                <UAvatar :alt="order.buyer.name" size="xs" />
                <span>{{ order.buyer.name }}</span>
              </div>
            </td>
            <td class="p-4 max-w-xs truncate" :title="order.gigTitle">{{ order.gigTitle }}</td>
            <td class="p-4 text-[var(--ui-text-muted)]">{{ order.deadline }}</td>
            <td class="p-4 font-bold">{{ money(order.price) }}</td>
            <td class="p-4">
              <UBadge :color="getStatusColor(order.status)" variant="subtle" size="xs">{{ order.status }}</UBadge>
            </td>
            <td class="p-4 text-right">
              <UButton size="xs" color="gray" :to="`/u/orders/${order.id}`">Ver Pedido</UButton>
            </td>
          </tr>
          </tbody>
        </table>
      </div>

      <div v-if="orders.length === 0" class="p-8 text-center text-[var(--ui-text-muted)]">
        <UIcon name="i-heroicons-inbox" class="w-12 h-12 mx-auto mb-2 opacity-50"/>
        <p>Você ainda não tem vendas ativas.</p>
      </div>
    </UCard>
  </div>
</template>