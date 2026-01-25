<script setup lang="ts">
import { ref, reactive } from 'vue'

definePageMeta({
  layout: 'default'
})

// --- Mocks: Dados Financeiros ---
const finance = ref({
  pending: 2100.00,
  receivedMonth: 3200.00,
  lastPayout: {
    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    amount: 450.00
  }
})

// --- Mocks: Configuração de Pix ---
const payoutConfig = reactive({
  pixKeyType: 'CPF',
  pixKey: '123.***.***-99',
  isConfigured: true
})

// --- Controle de Edição (Inline) ---
const isEditingPix = ref(false)
const tempPixState = reactive({ pixKey: '', pixKeyType: '' })

// Mocks: Fila de Pedidos
const activeOrders = ref([
  {
    id: 'ORD-5544',
    service: 'Landing Page',
    client: { name: 'Startup X' },
    deadline: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    price: 1200.00,
    status: 'IN_PROGRESS'
  },
  {
    id: 'ORD-3322',
    service: 'Automação Python',
    client: { name: 'Roberto M.' },
    deadline: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    price: 450.00,
    status: 'LATE'
  },
  {
    id: 'ORD-1122',
    service: 'Correção Bug Django',
    client: { name: 'Ana Tech' },
    deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    price: 450.00,
    status: 'IN_PROGRESS'
  }
])

// Ações
const startEditing = () => {
  // Copia o valor atual para o temporário (limpando a máscara se necessário)
  tempPixState.pixKey = payoutConfig.isConfigured ? payoutConfig.pixKey : ''
  tempPixState.pixKeyType = payoutConfig.pixKeyType
  isEditingPix.value = true
}

const cancelEditing = () => {
  isEditingPix.value = false
}

const handleSavePix = () => {
  if (!tempPixState.pixKey) return alert('Digite uma chave válida')

  // Simula API Call
  payoutConfig.pixKey = tempPixState.pixKey
  payoutConfig.pixKeyType = tempPixState.pixKeyType
  payoutConfig.isConfigured = true
  isEditingPix.value = false
}

// Utils
const money = (val: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val)
const formatDate = (date: Date) => date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })
</script>

<template>
  <div class="max-w-7xl mx-auto p-[var(--space-6)] space-y-[var(--space-8)]">

    <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
      <div>
        <h1 class="text-3xl font-bold text-[var(--ui-text)]">Painel de Vendas</h1>
        <p class="text-[var(--ui-text-muted)]">Gerencie seus projetos e recebimentos automáticos.</p>
      </div>
      <UButton to="/dashboard/sales/gigs/create" icon="i-heroicons-plus" size="lg" color="primary">
        Criar Novo Gig
      </UButton>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-[var(--space-6)]">

      <UCard :ui="{ root: 'bg-[var(--ui-bg-elevated)] ring-1 ring-[var(--ui-border)] relative overflow-visible' }">
        <div class="absolute -top-2 -right-2 p-2 opacity-5 pointer-events-none">
          <UIcon name="i-heroicons-qr-code" class="w-32 h-32"/>
        </div>

        <div class="flex flex-col h-full justify-between space-y-4 relative z-10">

          <div class="flex items-center gap-2 text-[var(--ui-primary)]">
            <UIcon name="i-heroicons-banknotes" class="w-5 h-5"/>
            <span class="text-sm font-bold uppercase">Recebimento Automático</span>
          </div>

          <div v-if="!isEditingPix">
            <div v-if="payoutConfig.isConfigured">
              <div class="text-sm text-[var(--ui-text-muted)]">Chave Pix ({{ payoutConfig.pixKeyType }})</div>
              <div class="font-mono font-bold text-lg truncate tracking-wider">{{ payoutConfig.pixKey }}</div>
              <div class="text-xs text-green-600 mt-2 flex items-center gap-1 font-medium bg-green-50 w-fit px-2 py-1 rounded">
                <UIcon name="i-heroicons-check-circle" class="w-3 h-3"/>
                Ativo e Validado
              </div>
            </div>
            <div v-else>
              <div class="text-red-500 font-bold text-sm">Nenhuma conta configurada!</div>
              <div class="text-xs text-[var(--ui-text-muted)]">Configure agora para receber seus pagamentos.</div>
            </div>

            <div class="pt-4">
              <UButton
                  size="sm"
                  variant="outline"
                  block
                  :color="payoutConfig.isConfigured ? 'gray' : 'primary'"
                  @click="startEditing"
              >
                {{ payoutConfig.isConfigured ? 'Alterar Chave Pix' : 'Configurar Agora' }}
              </UButton>
            </div>
          </div>

          <div v-else class="space-y-3 bg-[var(--ui-bg)] p-3 rounded border border-[var(--ui-border)] -mx-2">
            <div class="flex justify-between items-center mb-2">
              <span class="text-xs font-bold text-[var(--ui-text)]">Editar Chave</span>
              <UButton icon="i-heroicons-x-mark" size="2xs" color="gray" variant="ghost" @click="cancelEditing" />
            </div>

            <USelectMenu
                v-model="tempPixState.pixKeyType"
                :options="['CPF', 'CNPJ', 'EMAIL', 'TELEFONE', 'ALEATORIA']"
                placeholder="Tipo"
                size="sm"
            />

            <UInput
                v-model="tempPixState.pixKey"
                placeholder="Sua chave pix..."
                icon="i-heroicons-key"
                size="sm"
                autofocus
            />

            <UButton block size="sm" color="primary" @click="handleSavePix">
              Salvar
            </UButton>
          </div>

        </div>
      </UCard>

      <UCard :ui="{ root: 'bg-[var(--ui-bg-elevated)] ring-1 ring-[var(--ui-border)]' }">
        <div class="flex flex-col h-full justify-between space-y-4">
          <div class="flex items-center gap-2 text-[var(--ui-text-muted)]">
            <UIcon name="i-heroicons-clock" class="w-5 h-5"/>
            <span class="text-sm font-medium">Previsão de Entrada</span>
          </div>
          <div>
            <div class="text-3xl font-bold text-[var(--ui-text)]">{{ money(finance.pending) }}</div>
            <div class="text-xs text-[var(--ui-text-muted)] mt-1">
              Referente a {{ activeOrders.length }} pedidos em andamento
            </div>
          </div>
        </div>
      </UCard>

      <UCard :ui="{ root: 'bg-green-50 border border-green-200 dark:bg-green-900/10 dark:border-green-800' }">
        <div class="flex flex-col h-full justify-between space-y-4">
          <div class="flex items-center gap-2 text-green-700 dark:text-green-400">
            <UIcon name="i-heroicons-arrow-down-left" class="w-5 h-5"/>
            <span class="text-sm font-bold">Recebido este Mês</span>
          </div>
          <div>
            <div class="text-3xl font-bold text-green-800 dark:text-green-300">{{ money(finance.receivedMonth) }}</div>
            <div class="text-xs text-green-700 dark:text-green-500 mt-1">
              Último pagto: {{ formatDate(finance.lastPayout.date) }} ({{ money(finance.lastPayout.amount) }})
            </div>
          </div>
        </div>
      </UCard>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-[var(--space-8)]">

      <div class="lg:col-span-2 space-y-4">
        <h2 class="text-xl font-bold text-[var(--ui-text)]">Pedidos em Andamento</h2>

        <div class="space-y-3">
          <UCard
              v-for="order in activeOrders"
              :key="order.id"
              :ui="{ root: 'hover:ring-1 hover:ring-[var(--ui-primary)] cursor-pointer' }"
              @click="navigateTo(`/orders/${order.id}`)"
          >
            <div class="flex items-center gap-4">
              <div class="p-3 rounded-full flex-shrink-0" :class="order.status === 'LATE' ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'">
                <UIcon :name="order.status === 'LATE' ? 'i-heroicons-exclamation-circle' : 'i-heroicons-inbox-arrow-down'" class="w-6 h-6"/>
              </div>
              <div class="flex-1">
                <div class="font-bold text-[var(--ui-text)]">{{ order.service }}</div>
                <div class="text-sm text-[var(--ui-text-muted)]">Cliente: {{ order.client.name }}</div>
              </div>
              <div class="text-right">
                <div class="font-bold">{{ money(order.price) }}</div>
                <div class="text-xs" :class="order.status === 'LATE' ? 'text-red-500 font-bold' : 'text-[var(--ui-text-muted)]'">
                  {{ order.status === 'LATE' ? 'Atrasado' : formatDate(order.deadline) }}
                </div>
              </div>
            </div>
          </UCard>
        </div>
      </div>

      <div class="space-y-6">
        <UCard>
          <h3 class="font-bold mb-4">Qualidade de Entrega</h3>
          <div class="space-y-4">
            <div>
              <div class="flex justify-between text-xs mb-1">
                <span>No Prazo</span>
                <span class="font-bold">95%</span>
              </div>
              <UProgress value="95" color="green" size="xs" />
            </div>
            <div>
              <div class="flex justify-between text-xs mb-1">
                <span>Satisfação (5.0)</span>
                <span class="font-bold">100%</span>
              </div>
              <UProgress value="100" color="green" size="xs" />
            </div>
          </div>
        </UCard>
      </div>

    </div>

  </div>
</template>