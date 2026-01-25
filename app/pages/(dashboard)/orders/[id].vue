<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import { useRoute } from 'vue-router'

definePageMeta({
  layout: 'default'
})

const route = useRoute()
const orderId = route.params.id

// --- Simulação de Estado (Buyer vs Seller) ---
const isSeller = ref(false) // Toggle para testar interfaces
const currentUser = computed(() => isSeller.value ? 'Bruno Nunes' : 'Você (Cliente)')

// --- Mock do Pedido ---
const order = ref({
  id: orderId,
  serviceTitle: 'Criação de Identidade Visual Minimalista',
  amount: 500.00,
  deadline: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 dias
  status: 'IN_PROGRESS', // REQUIREMENTS, IN_PROGRESS, DELIVERED, COMPLETED
  freelancer: { name: 'Bruno Nunes', avatar: '' },
  client: { name: 'Cliente Teste', avatar: '' }
})

// --- Chat & Timeline ---
const newMessage = ref('')
const messages = ref([
  { id: 1, type: 'system', text: 'Pedido iniciado! O comprador enviou os requisitos.', date: new Date(Date.now() - 10000000) },
  { id: 2, type: 'text', sender: 'Bruno Nunes', text: 'Olá! Obrigado pelo pedido. Já recebi o briefing e vou começar os rascunhos.', isMe: false, date: new Date(Date.now() - 9000000) },
  { id: 3, type: 'text', sender: 'Você (Cliente)', text: 'Ótimo! Fico no aguardo.', isMe: true, date: new Date(Date.now() - 8000000) }
])

const chatContainer = ref<HTMLElement | null>(null)

// --- Ações ---
const sendMessage = () => {
  if (!newMessage.value.trim()) return

  messages.value.push({
    id: Date.now(),
    type: 'text',
    sender: currentUser.value,
    text: newMessage.value,
    isMe: true, // Sempre true pois quem envia é "eu" na interface
    date: new Date()
  })

  newMessage.value = ''
  scrollToBottom()

  // Simula resposta automática do "outro lado"
  setTimeout(() => {
    messages.value.push({
      id: Date.now() + 1,
      type: 'text',
      sender: isSeller.value ? 'Cliente Teste' : 'Bruno Nunes',
      text: isSeller.value ? 'Quando você consegue me entregar uma prévia?' : 'Estou trabalhando nisso agora mesmo!',
      isMe: false,
      date: new Date()
    })
    scrollToBottom()
  }, 2000)
}

const scrollToBottom = async () => {
  await nextTick()
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

// Ação de Entrega (Apenas Freelancer)
const handleDeliver = () => {
  messages.value.push({
    id: Date.now(),
    type: 'system',
    text: '🚀 O Freelancer entregou o trabalho. Verifique os arquivos.',
    date: new Date()
  })
  messages.value.push({
    id: Date.now() + 1,
    type: 'file',
    sender: 'Bruno Nunes',
    fileName: 'Identidade_Visual_Final.zip',
    fileSize: '45 MB',
    isMe: true,
    date: new Date()
  })
  order.value.status = 'DELIVERED'
}

// Ação de Aprovação (Apenas Cliente)
const handleApprove = () => {
  messages.value.push({
    id: Date.now(),
    type: 'system',
    text: '🎉 Pedido aprovado e concluído! O pagamento foi liberado.',
    date: new Date()
  })
  order.value.status = 'COMPLETED'
}

// Formatação
const formatDate = (d: Date) => d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
const daysLeft = computed(() => {
  const diff = order.value.deadline.getTime() - Date.now()
  return Math.ceil(diff / (1000 * 3600 * 24))
})
</script>

<template>
  <div class="h-[calc(100vh-64px)] flex flex-col md:flex-row bg-[var(--ui-bg)]">

    <div class="flex-1 flex flex-col h-full relative">

      <div class="top-4 left-4 z-10">
        <UBadge
            :color="isSeller ? 'blue' : 'green'"
            variant="solid"
            class="cursor-pointer opacity-80 hover:opacity-100 mb"
            @click="isSeller = !isSeller"
        >
          👁 Visão: {{ isSeller ? 'Freelancer' : 'Cliente' }} (Clique para trocar)
        </UBadge>
      </div>

      <div class="p-4 border-b border-[var(--ui-border)] bg-[var(--ui-bg-elevated)] flex justify-between items-center shadow-sm">
        <div class="ml-auto md:ml-0 text-center md:text-left">
          <h2 class="font-bold text-[var(--ui-text)]">Pedido #{{ order.id.slice(0,8) }}</h2>
          <p class="text-xs text-[var(--ui-text-muted)]">{{ order.serviceTitle }}</p>
        </div>
        <div class="text-right hidden md:block">
          <span class="text-xs font-bold text-[var(--ui-text-muted)] uppercase">Status</span>
          <div class="font-bold" :class="{
            'text-blue-500': order.status === 'IN_PROGRESS',
            'text-purple-500': order.status === 'DELIVERED',
            'text-green-500': order.status === 'COMPLETED'
          }">
            {{ order.status === 'IN_PROGRESS' ? 'Em Andamento' : (order.status === 'DELIVERED' ? 'Entregue' : 'Concluído') }}
          </div>
        </div>
      </div>

      <div ref="chatContainer" class="flex-1 overflow-y-auto p-4 space-y-6 bg-gray-50/50">

        <div v-for="msg in messages" :key="msg.id">

          <div v-if="msg.type === 'system'" class="flex justify-center my-4">
            <span class="text-xs font-medium text-gray-500 bg-gray-200 px-3 py-1 rounded-full">
              {{ msg.text }}
            </span>
          </div>

          <div v-else class="flex gap-3" :class="msg.isMe ? 'flex-row-reverse' : ''">
            <UAvatar :alt="msg.sender" size="sm" class="mt-1" />

            <div
                class="max-w-[75%] p-3 rounded-lg text-sm shadow-sm"
                :class="msg.isMe
                ? 'bg-[var(--ui-primary)] text-white rounded-tr-none'
                : 'bg-white text-[var(--ui-text)] border border-[var(--ui-border)] rounded-tl-none'"
            >
              <p v-if="msg.type === 'text'">{{ msg.text }}</p>

              <div v-if="msg.type === 'file'" class="flex items-center gap-3 bg-black/10 p-2 rounded">
                <UIcon name="i-heroicons-document-arrow-down" class="w-8 h-8" />
                <div class="overflow-hidden">
                  <div class="font-bold truncate">{{ msg.fileName }}</div>
                  <div class="text-xs opacity-80">{{ msg.fileSize }}</div>
                </div>
              </div>

              <div class="text-[10px] mt-1 opacity-70 text-right">
                {{ formatDate(msg.date) }}
              </div>
            </div>
          </div>

        </div>
      </div>

      <div class="p-4 bg-[var(--ui-bg-elevated)] border-t border-[var(--ui-border)]">
        <form @submit.prevent="sendMessage" class="flex gap-2">
          <UButton icon="i-heroicons-paper-clip" color="gray" variant="ghost" />
          <UInput
              v-model="newMessage"
              placeholder="Digite uma mensagem..."
              class="flex-1"
              :ui="{ rounded: 'rounded-full' }"
              autocomplete="off"
          />
          <UButton type="submit" icon="i-heroicons-paper-airplane" color="primary" variant="solid" :disabled="!newMessage" />
        </form>
      </div>
    </div>

    <div class="w-full md:w-80 bg-[var(--ui-bg-elevated)] border-l border-[var(--ui-border)] p-6 space-y-6 h-auto md:h-full overflow-y-auto">

      <div v-if="order.status !== 'COMPLETED'" class="text-center p-4 bg-[var(--ui-bg)] rounded-xl border border-[var(--ui-border)]">
        <div class="text-[var(--ui-text-muted)] text-sm mb-1">Tempo Restante</div>
        <div class="text-2xl font-bold text-[var(--ui-text)]">{{ daysLeft }} dias</div>
      </div>

      <div class="space-y-4">
        <h3 class="font-bold text-[var(--ui-text)] border-b border-[var(--ui-border)] pb-2">Detalhes</h3>

        <div class="flex items-center gap-3">
          <div class="w-12 h-12 bg-gray-200 rounded bg-cover bg-center" style="background-image: url(/images/mock-gig-cover.jpg)"></div>
          <div class="text-sm">
            <div class="font-medium text-[var(--ui-text)] line-clamp-2">{{ order.serviceTitle }}</div>
            <div class="text-[var(--ui-primary)] font-bold mt-1">R$ {{ order.amount }}</div>
          </div>
        </div>

        <div class="text-sm text-[var(--ui-text-muted)] space-y-2">
          <div class="flex justify-between">
            <span>Pedido:</span>
            <span class="font-mono">#{{ order.id.slice(0,8) }}</span>
          </div>
          <div class="flex justify-between">
            <span>Data:</span>
            <span>{{ new Date().toLocaleDateString() }}</span>
          </div>
        </div>
      </div>

      <div class="pt-4 border-t border-[var(--ui-border)]">

        <div v-if="isSeller && order.status === 'IN_PROGRESS'" class="space-y-3">
          <UButton block size="lg" color="primary" icon="i-heroicons-rocket-launch" @click="handleDeliver">
            Entregar Trabalho
          </UButton>
          <UButton block variant="soft" color="yellow" icon="i-heroicons-clock">
            Pedir Extensão de Prazo
          </UButton>
        </div>

        <div v-if="!isSeller && order.status === 'DELIVERED'" class="space-y-3">
          <div class="p-3 bg-green-50 border border-green-200 rounded text-sm text-green-800 mb-2">
            O freelancer entregou o trabalho! Revise os arquivos.
          </div>
          <UButton block size="lg" color="green" icon="i-heroicons-check-badge" @click="handleApprove">
            Aprovar e Finalizar
          </UButton>
          <UButton block variant="outline" color="red" icon="i-heroicons-exclamation-triangle">
            Solicitar Revisão
          </UButton>
        </div>

        <div v-if="order.status === 'COMPLETED'" class="text-center p-4 bg-green-100 rounded-lg text-green-800 font-bold">
          Pedido Concluído! 🌟
        </div>

      </div>

      <div class="text-center pt-8">
        <UButton variant="link" color="gray" size="xs">Precisa de ajuda com este pedido?</UButton>
      </div>

    </div>

  </div>
</template>