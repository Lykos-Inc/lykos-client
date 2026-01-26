<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'

definePageMeta({ layout: 'default' })
const route = useRoute()
const gigId = route.params.id

// --- Estado ---
const loading = ref(true)
const activeTab = ref(0) // 0: Geral, 1: Preços, 2: Galeria

// Mock do Form (Simulando dados vindos do backend)
const form = reactive({
  title: 'Criação de Identidade Visual Minimalista',
  category: 'Design',
  active: true,
  packages: {
    basic: { price: 90, delivery: 3 },
    standard: { price: 350, delivery: 5 },
    premium: { price: 800, delivery: 10 }
  }
})

onMounted(async () => {
  // Simula fetch
  setTimeout(() => { loading.value = false }, 500)
})

const saveChanges = () => {
  alert('Alterações salvas com sucesso!')
  navigateTo('/selling/gigs')
}

const items = [{ label: 'Informações Básicas' }, { label: 'Preços' }, { label: 'Galeria' }]
</script>

<template>
  <div class="max-w-4xl mx-auto p-6 space-y-6">

    <div class="flex justify-between items-center">
      <div>
        <h1 class="text-2xl font-bold">Editar Serviço</h1>
        <p class="text-sm text-gray-500">Editando: {{ gigId }}</p>
      </div>
      <div class="flex gap-2">
        <UButton variant="ghost" to="/selling/gigs">Cancelar</UButton>
        <UButton color="success" @click="saveChanges">Salvar Alterações</UButton>
      </div>
    </div>

    <UTabs :items="items" class="w-full">
      <template #item="{ item, index }">
        <UCard class="mt-4">

          <div v-if="index === 0" class="space-y-4">
            <UFormField label="Título">
              <UInput v-model="form.title" class="w-full" />
            </UFormField>
            <UFormField label="Categoria">
              <USelectMenu v-model="form.category" :options="['Design', 'Dev', 'Marketing']" />
            </UFormField>
            <div class="flex items-center justify-between p-4 bg-gray-50 rounded">
              <span>Gig Ativo?</span>
              <UToggle v-model="form.active" />
            </div>
          </div>

          <div v-else-if="index === 1" class="space-y-4">
            <div class="grid grid-cols-3 gap-4">
              <div class="p-3 border rounded space-y-2">
                <h3 class="font-bold">Básico</h3>
                <UInput v-model="form.packages.basic.price" type="number" icon="i-heroicons-currency-dollar"/>
              </div>
              <div class="p-3 border rounded space-y-2">
                <h3 class="font-bold">Padrão</h3>
                <UInput v-model="form.packages.standard.price" type="number" icon="i-heroicons-currency-dollar"/>
              </div>
              <div class="p-3 border rounded space-y-2">
                <h3 class="font-bold">Premium</h3>
                <UInput v-model="form.packages.premium.price" type="number" icon="i-heroicons-currency-dollar"/>
              </div>
            </div>
          </div>

          <div v-else-if="index === 2">
            <div class="text-center p-8 border-2 border-dashed rounded">
              <UIcon name="i-heroicons-photo" class="w-8 h-8 text-gray-400"/>
              <p>Gerenciamento de imagens aqui</p>
            </div>
          </div>

        </UCard>
      </template>
    </UTabs>

  </div>
</template>