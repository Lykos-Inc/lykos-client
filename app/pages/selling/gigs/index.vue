<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  layout: 'default'
})

// --- Estado das Abas ---
const items = [{
  label: 'Ativos',
  slot: 'active', // O template vai procurar um slot com este nome
  count: 2
}, {
  label: 'Pausados',
  slot: 'paused',
  count: 1
}, {
  label: 'Rascunhos',
  slot: 'draft',
  count: 0
}]

// --- Mock de Dados ---
const gigs = ref([
  {
    id: 101,
    title: 'Criação de Identidade Visual Minimalista',
    image: '/images/mock-gig-cover.jpg',
    price: 500.00,
    ordersQueue: 3,
    impressions: 1250,
    clicks: 45,
    status: 'ACTIVE'
  },
  {
    id: 102,
    title: 'Consultoria de SEO para E-commerce',
    image: '/images/mock-seo.jpg',
    price: 350.00,
    ordersQueue: 0,
    impressions: 300,
    clicks: 12,
    status: 'ACTIVE'
  },
  {
    id: 103,
    title: 'Automação de Planilhas com Python',
    image: '/images/mock-code.jpg',
    price: 150.00,
    ordersQueue: 0,
    impressions: 0,
    clicks: 0,
    status: 'PAUSED'
  }
])

// --- Filtros ---
// Mapeia o nome do slot (active/paused/draft) para o status do dado (ACTIVE/PAUSED/DRAFT)
const getStatusFromSlot = (slotName: string) => {
  if (slotName === 'active') return 'ACTIVE'
  if (slotName === 'paused') return 'PAUSED'
  return 'DRAFT'
}

const filterGigs = (slotName: string) => {
  const status = getStatusFromSlot(slotName)
  return gigs.value.filter(g => g.status === status)
}

// --- Ações de Menu (Dropdown) ---
const getRowActions = (row: any) => [
  [
    {
      label: 'Ver no Marketplace',
      icon: 'i-heroicons-eye',
      click: () => navigateTo(`/explorer/${row.id}`)
    },
    {
      label: 'Editar',
      icon: 'i-heroicons-pencil-square',
      click: () => navigateTo(`/dashboard/sales/gigs/create?edit=${row.id}`)
    }
  ],
  [
    {
      label: row.status === 'ACTIVE' ? 'Pausar' : 'Ativar',
      icon: row.status === 'ACTIVE' ? 'i-heroicons-pause' : 'i-heroicons-play',
      click: () => toggleStatus(row)
    }
  ],
  [
    {
      label: 'Excluir',
      icon: 'i-heroicons-trash',
      class: 'text-red-500',
      click: () => deleteGig(row.id)
    }
  ]
]

const toggleStatus = (row: any) => {
  row.status = row.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE'
  // TODO: Integrar API
}

const deleteGig = (id: number) => {
  if (confirm('Tem certeza que deseja excluir este serviço?')) {
    gigs.value = gigs.value.filter(g => g.id !== id)
  }
}

const money = (val: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val)
</script>

<template>
  <div class="max-w-7xl mx-auto p-[var(--space-6)] space-y-[var(--space-8)]">

    <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
      <div>
        <h1 class="text-3xl font-bold text-[var(--ui-text)]">Meus Gigs</h1>
        <p class="text-[var(--ui-text-muted)]">Gerencie seus serviços e acompanhe métricas.</p>
      </div>
      <UButton to="/dashboard/sales/gigs/create" icon="i-heroicons-plus" size="lg" color="primary">
        Criar Novo Gig
      </UButton>
    </div>

    <UTabs :items="items" class="w-full">

      <template v-for="tab in items" :key="tab.slot" #[tab.slot]>

        <UCard :ui="{ root: 'mt-4', body: { padding: 'p-0 sm:p-0' } }">
          <div class="overflow-x-auto">
            <table class="w-full text-left text-sm">
              <thead class="text-[var(--ui-text-muted)] font-medium border-b border-[var(--ui-border)]">
              <tr>
                <th class="p-4 w-[40%]">Serviço</th>
                <th class="p-4">Preço Base</th>
                <th class="p-4 text-center">Fila</th>
                <th class="p-4 text-center">Impressões</th>
                <th class="p-4 text-center">Cliques</th>
                <th class="p-4 text-right">Ações</th>
              </tr>
              </thead>

              <tbody class="divide-y divide-[var(--ui-border)]">
              <tr
                  v-for="gig in filterGigs(tab.slot)"
                  :key="gig.id"
                  class="group hover:bg-[var(--ui-bg-hover)] transition"
              >
                <td class="p-4">
                  <div class="flex items-center gap-4">
                    <div class="w-16 h-10 bg-gray-200 rounded border border-[var(--ui-border)] overflow-hidden">
                      <img v-if="gig.image" :src="gig.image" class="w-full h-full object-cover" />
                    </div>

                    <span class="font-medium text-[var(--ui-text)] line-clamp-2 group-hover:text-[var(--ui-primary)] cursor-pointer" @click="navigateTo(`/explorer/${gig.id}`)">
                        {{ gig.title }}
                      </span>
                  </div>
                </td>

                <td class="p-4 font-bold text-[var(--ui-text)]">
                  {{ money(gig.price) }}
                </td>

                <td class="p-4 text-center">
                  <UBadge v-if="gig.ordersQueue > 0" color="orange" variant="subtle">{{ gig.ordersQueue }} ped.</UBadge>
                  <span v-else class="text-[var(--ui-text-muted)]">-</span>
                </td>

                <td class="p-4 text-center text-[var(--ui-text-muted)]">{{ gig.impressions }}</td>
                <td class="p-4 text-center text-[var(--ui-text-muted)]">{{ gig.clicks }}</td>

                <td class="p-4 text-right">
                  <UDropdown :items="getRowActions(gig)">
                    <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
                  </UDropdown>
                </td>
              </tr>

              <tr v-if="filterGigs(tab.slot).length === 0">
                <td colspan="6" class="p-12 text-center text-[var(--ui-text-muted)]">
                  <div class="flex flex-col items-center gap-2">
                    <UIcon name="i-heroicons-archive-box" class="w-8 h-8 opacity-50"/>
                    <span>Nenhum serviço encontrado nesta aba.</span>
                  </div>
                </td>
              </tr>
              </tbody>
            </table>
          </div>
        </UCard>
      </template>
    </UTabs>
  </div>
</template>