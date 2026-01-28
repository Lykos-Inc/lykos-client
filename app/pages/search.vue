<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

definePageMeta({
  layout: 'default'
})

const route = useRoute()
const router = useRouter()

// --- Estado dos Filtros ---
const filters = ref({
  category: (route.query.category as string) || 'all',
  minPrice: undefined as number | undefined,
  maxPrice: undefined as number | undefined,
  deliveryTime: undefined as number | undefined,
  sortBy: 'recommended'
})

// --- Opções ---
const categories = [
  { label: 'Todas as Categorias', value: 'all' },
  { label: 'Design Gráfico', value: 'design' },
  { label: 'Desenvolvimento', value: 'dev' },
  { label: 'Marketing Digital', value: 'marketing' },
  { label: 'Vídeo e Animação', value: 'video' },
  { label: 'Escrita e Tradução', value: 'writing' }
]

const deliveryOptions = [
  { label: 'Qualquer prazo', value: undefined },
  { label: 'Até 24 horas', value: 1 },
  { label: 'Até 3 dias', value: 3 },
  { label: 'Até 7 dias', value: 7 }
]

const sortOptions = [
  { label: 'Recomendados', value: 'recommended' },
  { label: 'Mais Vendidos', value: 'best_selling' },
  { label: 'Novos', value: 'newest' },
  { label: 'Preço: Menor para Maior', value: 'price_asc' },
  { label: 'Preço: Maior para Menor', value: 'price_desc' }
]

// --- Mock de Gigs ---
const allGigs = [
  {
    id: 101,
    title: 'Criação de Identidade Visual Minimalista',
    freelancer: { name: 'Bruno Nunes', level: 'Nível 2', avatar: '' },
    image: '/images/mock-gig-cover.jpg',
    rating: 5.0,
    reviews: 128,
    price: 500.00,
    category: 'design',
    deliveryDays: 5
  },
  {
    id: 102,
    title: 'Desenvolvimento de Landing Page Alta Conversão',
    freelancer: { name: 'Dev Master', level: 'Top Seller', avatar: '' },
    image: '/images/mock-code.jpg',
    rating: 4.9,
    reviews: 856,
    price: 1200.00,
    category: 'dev',
    deliveryDays: 10
  },
  {
    id: 103,
    title: 'Edição de Vídeo para YouTube',
    freelancer: { name: 'Pedro Cuts', level: 'Nível 1', avatar: '' },
    image: '/images/mock-video-thumb.jpg',
    rating: 4.8,
    reviews: 42,
    price: 200.00,
    category: 'video',
    deliveryDays: 3
  },
  {
    id: 104,
    title: 'Artigos SEO Otimizados',
    freelancer: { name: 'Ana Writer', level: 'Nível 2', avatar: '' },
    image: '/images/mock-doc.jpg',
    rating: 5.0,
    reviews: 15,
    price: 80.00,
    category: 'writing',
    deliveryDays: 2
  },
  {
    id: 105,
    title: 'Logotipo 3D Profissional',
    freelancer: { name: 'Studio 3D', level: 'Novo', avatar: '' },
    image: '/images/mock-gig-3.jpg',
    rating: 0,
    reviews: 0,
    price: 350.00,
    category: 'design',
    deliveryDays: 7
  }
]

// --- Lógica de Filtragem ---
const filteredGigs = computed(() => {
  let result = allGigs

  if (filters.value.category !== 'all') {
    result = result.filter(g => g.category === filters.value.category)
  }

  if (filters.value.minPrice) {
    result = result.filter(g => g.price >= filters.value.minPrice!)
  }
  if (filters.value.maxPrice) {
    result = result.filter(g => g.price <= filters.value.maxPrice!)
  }

  if (filters.value.deliveryTime !== undefined) {
    result = result.filter(g => g.deliveryDays <= filters.value.deliveryTime!)
  }

  if (filters.value.sortBy === 'price_asc') {
    result = [...result].sort((a, b) => a.price - b.price)
  } else if (filters.value.sortBy === 'price_desc') {
    result = [...result].sort((a, b) => b.price - a.price)
  }

  return result
})

watch(filters, () => {
  router.push({ query: { ...route.query, ...filters.value } })
}, { deep: true })

const money = (val: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val)
</script>

<template>
  <div class="max-w-7xl mx-auto px-[var(--space-4)] py-[var(--space-6)]">

    <div class="mb-8">
      <h1 class="text-3xl font-bold text-[var(--ui-text)]">
        Resultados para "{{ route.query.q || 'Todos os serviços' }}"
      </h1>
      <p class="text-[var(--ui-text-muted)]">{{ filteredGigs.length }} serviços encontrados</p>
    </div>

    <div class="flex flex-col lg:flex-row gap-8">

      <aside class="w-full lg:w-64 flex-shrink-0 space-y-6">

        <UCard class="p-4">
          <h3 class="font-bold text-[var(--ui-text)] mb-3">Categorias</h3>

          <div class="flex flex-col gap-2">
            <label
                v-for="cat in categories"
                :key="cat.value"
                class="flex items-center gap-3 cursor-pointer hover:opacity-80 transition"
            >
              <URadio
                  v-model="filters.category"
                  :value="cat.value"
                  name="category"
                  :ui="{ wrapper: 'relative flex items-start' }"
              />
              <span class="text-sm text-[var(--ui-text)]">{{ cat.label }}</span>
            </label>
          </div>
        </UCard>

        <UCard class="p-4">
          <h3 class="font-bold text-[var(--ui-text)] mb-3">Faixa de Preço</h3>
          <div class="grid grid-cols-2 gap-2 mb-2">
            <UInput v-model="filters.minPrice" type="number" placeholder="Min" size="sm" />
            <UInput v-model="filters.maxPrice" type="number" placeholder="Max" size="sm" />
          </div>
        </UCard>

        <UCard class="p-4">
          <h3 class="font-bold text-[var(--ui-text)] mb-3">Prazo de Entrega</h3>

          <div class="flex flex-col gap-2">
            <label
                v-for="opt in deliveryOptions"
                :key="opt.label"
                class="flex items-center gap-3 cursor-pointer hover:opacity-80 transition"
            >
              <URadio
                  v-model="filters.deliveryTime"
                  :value="opt.value"
                  name="delivery"
              />
              <span class="text-sm text-[var(--ui-text)]">{{ opt.label }}</span>
            </label>
          </div>
        </UCard>

      </aside>

      <div class="flex-1">

        <div class="flex justify-between items-center mb-6 bg-[var(--ui-bg-elevated)] p-3 rounded-lg border border-[var(--ui-border)]">
          <div class="text-sm text-[var(--ui-text-muted)] hidden sm:block">
            Mostrando {{ filteredGigs.length }} resultados
          </div>
          <div class="flex items-center gap-2 ml-auto">
            <span class="text-sm text-[var(--ui-text-muted)]">Ordenar por:</span>
            <USelectMenu
                v-model="filters.sortBy"
                :options="sortOptions"
                option-attribute="label"
                value-attribute="value"
                class="w-48"
            />
          </div>
        </div>

        <div v-if="filteredGigs.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
              v-for="gig in filteredGigs"
              :key="gig.id"
              class="group cursor-pointer bg-[var(--ui-bg-elevated)] border border-[var(--ui-border)] rounded-lg overflow-hidden hover:shadow-lg transition flex flex-col h-full"
              @click="navigateTo(`/explorer/${gig.id}`)"
          >
            <div class="relative aspect-video bg-gray-200 overflow-hidden">
              <img :src="gig.image" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
            </div>

            <div class="p-3 flex-1 flex flex-col gap-2">
              <div class="flex items-center gap-2">
                <UAvatar :alt="gig.freelancer.name" size="xs" />
                <div class="text-xs font-bold text-[var(--ui-text)]">{{ gig.freelancer.name }}</div>
                <div class="text-[10px] text-[var(--ui-text-muted)] border border-[var(--ui-border)] px-1 rounded">
                  {{ gig.freelancer.level }}
                </div>
              </div>

              <h3 class="font-medium text-[var(--ui-text)] line-clamp-2 hover:text-[var(--ui-primary)] transition">
                {{ gig.title }}
              </h3>

              <div class="mt-auto flex items-center gap-1 text-sm">
                <UIcon name="i-heroicons-star-solid" class="text-yellow-400 w-4 h-4" />
                <span class="font-bold text-[var(--ui-text)]">{{ gig.rating > 0 ? gig.rating : 'Novo' }}</span>
                <span v-if="gig.reviews" class="text-[var(--ui-text-muted)]">({{ gig.reviews }})</span>
              </div>
            </div>

            <div class="px-3 py-2 border-t border-[var(--ui-border)] flex justify-between items-center bg-[var(--ui-bg)]">
              <div class="flex items-center gap-1 text-[10px] text-[var(--ui-text-muted)]">
                <UIcon name="i-heroicons-clock" class="w-3 h-3"/>
                {{ gig.deliveryDays }} dias
              </div>
              <div class="font-bold text-[var(--ui-text)]">
                <span class="text-[10px] font-normal text-[var(--ui-text-muted)] mr-1">A partir de</span>
                {{ money(gig.price) }}
              </div>
            </div>
          </div>
        </div>

        <div v-else class="text-center py-20 bg-[var(--ui-bg-elevated)] rounded-lg border border-dashed border-[var(--ui-border)]">
          <UIcon name="i-heroicons-magnifying-glass" class="w-16 h-16 text-[var(--ui-text-muted)] opacity-50 mx-auto mb-4"/>
          <h3 class="text-xl font-bold text-[var(--ui-text)]">Nenhum serviço encontrado</h3>
          <p class="text-[var(--ui-text-muted)] mt-2">Tente ajustar seus filtros.</p>
          <UButton
              label="Limpar Filtros"
              color="neutral"
              variant="ghost"
              class="mt-4"
              @click="filters.category = 'all'; filters.minPrice = undefined; filters.maxPrice = undefined; filters.deliveryTime = undefined"
          />
        </div>

      </div>

    </div>
  </div>
</template>