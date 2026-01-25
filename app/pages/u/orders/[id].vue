<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
definePageMeta({ layout: 'default' })
const route = useRoute()

const order = ref({
  id: route.params.id,
  status: 'IN_PROGRESS',
  title: 'Criação de Identidade Visual',
  freelancer: 'Bruno Nunes',
  deadline: '2025-11-20',
  price: 500,
  chat: [
    { id: 1, user: 'System', text: 'Pedido iniciado. O prazo conta a partir de agora.', date: 'Hoje 10:00' },
    { id: 2, user: 'Bruno Nunes', text: 'Olá! Obrigado pelo pedido. Pode me enviar as referências?', date: 'Hoje 10:05' }
  ]
})
const message = ref('')
const sendMessage = () => {
  if(!message.value) return
  order.value.chat.push({ id: Date.now(), user: 'Me', text: message.value, date: 'Agora' })
  message.value = ''
}
</script>

<template>
  <div class="max-w-6xl mx-auto p-4 h-[calc(100vh-80px)] flex gap-6">
    <div class="flex-1 flex flex-col bg-[var(--ui-bg-elevated)] border rounded-lg overflow-hidden">
      <div class="p-4 border-b bg-[var(--ui-bg)] flex justify-between">
        <h1 class="font-bold">Pedido #{{ order.id }} - {{ order.status }}</h1>
        <div class="text-sm text-gray-500">Entrega: {{ order.deadline }}</div>
      </div>

      <div class="flex-1 overflow-y-auto p-4 space-y-4">
        <div v-for="msg in order.chat" :key="msg.id" :class="msg.user === 'Me' ? 'text-right' : 'text-left'">
          <div class="inline-block p-3 rounded-lg max-w-md text-sm"
               :class="msg.user === 'System' ? 'bg-gray-200 text-center w-full' : (msg.user === 'Me' ? 'bg-primary text-white' : 'bg-gray-100')">
            <div v-if="msg.user !== 'System' && msg.user !== 'Me'" class="font-bold text-xs mb-1">{{ msg.user }}</div>
            {{ msg.text }}
          </div>
          <div v-if="msg.user !== 'System'" class="text-[10px] text-gray-400 mt-1">{{ msg.date }}</div>
        </div>
      </div>

      <div class="p-4 border-t bg-[var(--ui-bg)] flex gap-2">
        <UInput v-model="message" placeholder="Digite uma mensagem..." class="flex-1" @keyup.enter="sendMessage"/>
        <UButton icon="i-heroicons-paper-airplane" @click="sendMessage"/>
      </div>
    </div>

    <div class="w-80 space-y-4">
      <UCard>
        <template #header><h3 class="font-bold">Detalhes</h3></template>
        <div class="text-sm space-y-2">
          <p><strong>Serviço:</strong> {{ order.title }}</p>
          <p><strong>Vendedor:</strong> {{ order.freelancer }}</p>
          <p><strong>Valor:</strong> R$ {{ order.price }}</p>
        </div>
        <template #footer><UButton block color="gray" variant="outline">Central de Ajuda</UButton></template>
      </UCard>
    </div>
  </div>
</template>