<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  middleware: 'auth',
  layout: 'default'
})

// --- Mocks de Dados (Discovery) ---
const searchQuery = ref('')

const categories = [
  { label: 'Design Gráfico', icon: 'i-heroicons-paint-brush' },
  { label: 'Programação', icon: 'i-heroicons-code-bracket' },
  { label: 'Marketing Digital', icon: 'i-heroicons-megaphone' },
  { label: 'Vídeo e Animação', icon: 'i-heroicons-video-camera' },
  { label: 'Tradução', icon: 'i-heroicons-language' },
  { label: 'Música e Áudio', icon: 'i-heroicons-musical-note' },
  { label: 'Negócios', icon: 'i-heroicons-briefcase' },
  { label: 'IA e Dados', icon: 'i-heroicons-cpu-chip' }
]

// Helper para gerar slug (apenas para o mock funcionar com as novas rotas)
const makeSlug = (title: string) => title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
const makeUsername = (name: string) => name.toLowerCase().replace(/ /g, '')

// Simula serviços baseados em histórico
const recommendedGigs = ref([
  {
    id: 101,
    title: 'Design de Logo Minimalista e Moderno para Startups',
    freelancer: { name: 'Bruno Nunes', level: 'Nível 2', avatar: '' },
    rating: 5.0,
    reviews: 128,
    price: 500,
    image: '/images/mock-gig-1.jpg',
    video: false
  },
  {
    id: 102,
    title: 'Identidade Visual Completa com Manual da Marca',
    freelancer: { name: 'Carla Design', level: 'Top Seller', avatar: '' },
    rating: 4.9,
    reviews: 856,
    price: 1200,
    image: '/images/mock-gig-2.jpg',
    video: false
  },
  {
    id: 103,
    title: 'Criação de Logo 3D Profissional',
    freelancer: { name: 'Studio 3D', level: 'Nível 1', avatar: '' },
    rating: 4.7,
    reviews: 42,
    price: 350,
    image: '/images/mock-gig-3.jpg',
    video: false
  },
  {
    id: 104,
    title: 'Vetorização e Redesign de Logotipos Antigos',
    freelancer: { name: 'Art Vector', level: 'Nível 2', avatar: '' },
    rating: 4.8,
    reviews: 15,
    price: 150,
    image: '/images/mock-gig-4.jpg',
    video: false
  }
])

// Simula Feed Infinito
const feedGigs = ref([
  {
    id: 201,
    title: 'Edição de Vídeo Dinâmica para YouTube e TikTok',
    freelancer: { name: 'Pedro Cuts', level: 'Nível 2', avatar: '' },
    rating: 5.0,
    reviews: 32,
    price: 200,
    image: '/images/mock-video-thumb.jpg',
    video: true
  },
  {
    id: 202,
    title: 'Desenvolvimento de Site Institucional em Vue.js',
    freelancer: { name: 'Dev Master', level: 'Nível 2', avatar: '' },
    rating: 5.0,
    reviews: 12,
    price: 2500,
    image: '/images/mock-code.jpg',
    video: false
  },
  {
    id: 203,
    title: 'Locução Profissional em Português Nativo',
    freelancer: { name: 'Voz de Ouro', level: 'Top Seller', avatar: '' },
    rating: 4.9,
    reviews: 3200,
    price: 80,
    image: '/images/mock-audio.jpg',
    video: true
  },
  {
    id: 204,
    title: 'Consultoria de SEO para E-commerce',
    freelancer: { name: 'SEO Expert', level: 'Nível 1', avatar: '' },
    rating: 4.6,
    reviews: 8,
    price: 450,
    image: '/images/mock-seo.jpg',
    video: false
  },
  {
    id: 205,
    title: 'Ilustração Digital Estilo Cyberpunk',
    freelancer: { name: 'Artes Futuro', level: 'Novo', avatar: '' },
    rating: 0,
    reviews: 0,
    price: 300,
    image: '/images/mock-art.jpg',
    video: false
  }
])

const loadMore = () => {
  feedGigs.value.push(...feedGigs.value)
}

// Formatação
const formatPrice = (val: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val)

const handleSearch = () => {
  navigateTo({ path: '/search', query: { q: searchQuery.value } })
}
</script>

<template>
  <div class="min-h-screen bg-[var(--ui-bg)]">

    <div class="bg-[var(--ui-bg-elevated)] border-b border-[var(--ui-border)] py-12 px-4">
      <div class="max-w-4xl mx-auto text-center space-y-6">
        <h1 class="text-3xl md:text-5xl font-bold text-[var(--ui-text)]">
          Encontre o serviço freelance <i class="font-serif italic text-[var(--ui-primary)]">perfeito</i> para seu negócio
        </h1>

        <div class="relative max-w-2xl mx-auto">
          <div class="flex shadow-lg rounded-lg overflow-hidden">
            <input
                v-model="searchQuery"
                type="text"
                placeholder="Qual serviço você está procurando hoje?"
                class="flex-1 px-6 py-4 text-gray-700 focus:outline-none"
                @keyup.enter="handleSearch"
            />
            <button
                class="bg-[var(--ui-primary)] text-white px-8 font-bold hover:brightness-110 transition"
                @click="handleSearch"
            >
              <UIcon name="i-heroicons-magnifying-glass" class="w-6 h-6" />
            </button>
          </div>
          <div class="flex gap-3 justify-center mt-4 text-sm text-[var(--ui-text-muted)]">
            <span>Populares:</span>
            <button class="hover:underline">Logo Design</button>
            <button class="hover:underline">WordPress</button>
            <button class="hover:underline">Voice Over</button>
          </div>
        </div>
      </div>
    </div>

    <div class="border-b border-[var(--ui-border)] bg-[var(--ui-bg)] sticky top-0 z-10 shadow-sm opacity-95 backdrop-blur">
      <div class="max-w-7xl mx-auto px-4 py-3">
        <div class="flex gap-8 overflow-x-auto no-scrollbar justify-center">
          <button
              v-for="cat in categories"
              :key="cat.label"
              class="flex flex-col items-center gap-1 min-w-[80px] group cursor-pointer"
          >
            <div class="text-[var(--ui-text-muted)] group-hover:text-[var(--ui-primary)] transition">
              <UIcon :name="cat.icon" class="w-6 h-6" />
            </div>
            <span class="text-xs font-medium text-[var(--ui-text-muted)] group-hover:text-[var(--ui-text)] whitespace-nowrap">
              {{ cat.label }}
            </span>
            <div class="h-0.5 w-0 bg-[var(--ui-primary)] group-hover:w-full transition-all duration-300"></div>
          </button>
        </div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto px-4 py-8 space-y-12">

      <section>
        <div class="flex justify-between items-end mb-6">
          <div>
            <h2 class="text-2xl font-bold text-[var(--ui-text)]">Baseado no seu histórico</h2>
            <p class="text-[var(--ui-text-muted)]">Porque você visualizou "Identidade Visual"</p>
          </div>
          <UButton variant="link" color="neutral" trailing-icon="i-heroicons-arrow-right" to="/search">Ver tudo</UButton>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div
              v-for="gig in recommendedGigs"
              :key="gig.id"
              class="group cursor-pointer"
              @click="navigateTo(`/${makeUsername(gig.freelancer.name)}/${makeSlug(gig.title)}`)"
          >
            <div class="bg-[var(--ui-bg-elevated)] border border-[var(--ui-border)] rounded-lg overflow-hidden hover:shadow-lg transition duration-300 flex flex-col h-full">
              <div class="relative aspect-[4/3] bg-gray-200 overflow-hidden">
                <img :src="gig.image" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <div v-if="gig.video" class="absolute top-2 right-2 bg-black/50 p-1 rounded text-white">
                  <UIcon name="i-heroicons-video-camera" />
                </div>
              </div>

              <div class="p-3 flex-1 flex flex-col gap-2">
                <div class="flex items-center gap-2">
                  <UAvatar :alt="gig.freelancer.name" size="xs" />
                  <div class="text-xs font-bold text-[var(--ui-text)]">{{ gig.freelancer.name }}</div>
                  <div class="text-[10px] text-[var(--ui-text-muted)]">{{ gig.freelancer.level }}</div>
                </div>

                <h3 class="text-[var(--ui-text)] font-medium line-clamp-2 hover:text-[var(--ui-primary)] transition">
                  {{ gig.title }}
                </h3>

                <div class="flex items-center gap-1 text-sm mt-auto">
                  <UIcon name="i-heroicons-star-solid" class="text-yellow-400" />
                  <span class="font-bold text-[var(--ui-text)]">{{ gig.rating }}</span>
                  <span class="text-[var(--ui-text-muted)]">({{ gig.reviews }})</span>
                </div>
              </div>

              <div class="px-3 py-2 border-t border-[var(--ui-border)] flex justify-between items-center bg-[var(--ui-bg)]">
                <UIcon name="i-heroicons-heart" class="text-[var(--ui-text-muted)] hover:text-red-500 cursor-pointer" />
                <div class="text-right">
                  <span class="text-[10px] text-[var(--ui-text-muted)] uppercase font-bold">A partir de</span>
                  <div class="font-bold text-[var(--ui-text)]">{{ formatPrice(gig.price) }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="bg-gradient-to-r from-purple-900 to-indigo-900 rounded-2xl p-8 md:p-12 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
        <div class="absolute -top-10 -left-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl opacity-30"></div>

        <div class="relative z-10 max-w-xl">
          <h2 class="text-2xl md:text-3xl font-bold mb-4 font-serif">Lykos Pro.</h2>
          <p class="text-purple-100 mb-6 text-lg">
            Talentos verificados para projetos críticos. A melhor qualidade, garantida.
          </p>
          <UButton color="neutral" variant="solid" size="lg" class="text-purple-900 font-bold">
            Explorar Lykos Pro
          </UButton>
        </div>
        <div class="relative z-10 hidden md:block">
          <img src="https://placehold.co/300x200/png?text=Pro+Talent" class="rounded-lg shadow-lg rotate-3 border-4 border-white/20" />
        </div>
      </div>

      <section>
        <h2 class="text-2xl font-bold text-[var(--ui-text)] mb-6">Explore o Marketplace</h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          <div
              v-for="gig in feedGigs"
              :key="gig.id"
              class="group cursor-pointer"
              @click="navigateTo(`/${makeUsername(gig.freelancer.name)}/${makeSlug(gig.title)}`)"
          >
            <div class="bg-[var(--ui-bg-elevated)] border border-[var(--ui-border)] rounded-lg overflow-hidden hover:shadow-lg transition duration-300 h-full flex flex-col">
              <div class="relative aspect-video bg-gray-200">
                <img :src="gig.image" class="w-full h-full object-cover group-hover:brightness-95 transition" />
              </div>

              <div class="p-3 flex-1 flex flex-col gap-1">
                <div class="flex items-center gap-2 mb-1">
                  <UAvatar :alt="gig.freelancer.name" size="2xs" />
                  <span class="text-xs font-bold text-[var(--ui-text-muted)]">{{ gig.freelancer.name }}</span>
                </div>
                <h3 class="text-sm text-[var(--ui-text)] font-medium line-clamp-2 leading-tight">
                  {{ gig.title }}
                </h3>
                <div class="mt-auto pt-2 flex items-center gap-1 text-xs">
                  <UIcon name="i-heroicons-star-solid" class="text-yellow-400 w-3 h-3" />
                  <span class="font-bold text-[var(--ui-text)]">{{ gig.rating > 0 ? gig.rating : 'Novo' }}</span>
                  <span class="text-[var(--ui-text-muted)]" v-if="gig.reviews">({{ gig.reviews }})</span>
                </div>
              </div>

              <div class="px-3 py-2 border-t border-[var(--ui-border)] flex justify-between items-center bg-[var(--ui-bg)]">
                <UIcon name="i-heroicons-heart" class="w-4 h-4 text-[var(--ui-text-muted)] hover:text-red-500" />
                <div class="font-bold text-[var(--ui-text)] text-sm">{{ formatPrice(gig.price) }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-12 text-center">
          <UButton
              variant="outline"
              size="xl"
              class="px-12 rounded-full"
              @click="loadMore"
          >
            Carregar mais serviços
          </UButton>
        </div>
      </section>

    </div>
  </div>
</template>

<style scoped>
/* Esconde barra de rolagem no menu de categorias */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>