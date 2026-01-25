<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'

definePageMeta({
  layout: 'default'
})

const route = useRoute()
const username = route.params.username

// --- Mock do Perfil Profissional (Freelancer) ---
const profile = ref({
  name: 'Bruno Nunes',
  username: username, // Vem da URL /f/brunonunes
  level: 'Nível 2',
  avatar: '/images/avatar-placeholder.jpg',
  banner: '/images/profile-banner.jpg',
  location: 'Brasil',
  memberSince: 'Maio 2024',
  avgResponseTime: '1 hora',
  lastDelivery: 'Há 2 dias',
  bio: `Olá! Sou um Desenvolvedor Full Stack e Designer com mais de 5 anos de experiência. Especialista em criar identidades visuais minimalistas e aplicações web performáticas usando Vue.js e Django.`,
  languages: [
    { name: 'Português', level: 'Nativo' },
    { name: 'Inglês', level: 'Fluente' },
    { name: 'Espanhol', level: 'Básico' }
  ],
  skills: [
    'Vue.js', 'Nuxt', 'Django', 'Python', 'Tailwind', 'Docker', 'Figma', 'UI/UX'
  ],
  // Diferencial do perfil /f/: Educação e Certificados
  education: [
    { title: 'Ciência da Computação', school: 'USP', year: '2022' }
  ]
})

// --- Mock de Gigs Ativos (Vitrine) ---
const activeGigs = ref([
  {
    id: 101,
    title: 'Criação de Identidade Visual Minimalista',
    image: '/images/mock-gig-cover.jpg',
    rating: 5.0,
    reviews: 128,
    price: 500.00
  },
  {
    id: 102,
    title: 'Desenvolvimento Front-end com Vue.js',
    image: '/images/mock-code.jpg',
    rating: 4.9,
    reviews: 45,
    price: 1200.00
  },
  {
    id: 103,
    title: 'Consultoria de Arquitetura de Software',
    image: '/images/mock-seo.jpg',
    rating: 5.0,
    reviews: 12,
    price: 350.00
  }
])

// --- Mock de Avaliações (Prova Social) ---
const reviews = ref([
  {
    id: 1,
    buyer: 'Startup Tech',
    // Linkaria para o perfil /u/startuptech (perfil de comprador)
    buyerUrl: '/u/startuptech',
    avatar: '',
    rating: 5,
    comment: 'O Bruno foi excepcional! Entregou antes do prazo e o código estava impecável.',
    date: 'Há 1 semana'
  },
  {
    id: 2,
    buyer: 'Roberto M.',
    buyerUrl: '/u/robertom',
    avatar: '',
    rating: 5,
    comment: 'Ótima comunicação e resultado fantástico. Recomendo muito.',
    date: 'Há 2 semanas'
  }
])

const money = (val: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val)
</script>

<template>
  <div class="max-w-7xl mx-auto px-[var(--space-4)] py-[var(--space-8)]">

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-[var(--space-8)]">

      <div class="lg:col-span-1 space-y-[var(--space-6)]">

        <UCard :ui="{ root: 'bg-[var(--ui-bg-elevated)] ring-1 ring-[var(--ui-border)] overflow-hidden' }">

          <div class="flex justify-end mb-[-20px] relative z-10 p-2">
            <UBadge color="green" variant="subtle" size="xs">Disponível</UBadge>
          </div>

          <div class="flex flex-col items-center text-center space-y-3 pb-4 border-b border-[var(--ui-border)]">
            <div class="relative">
              <UAvatar :alt="profile.name" size="3xl" class="ring-4 ring-[var(--ui-bg)]" />
              <div class="absolute bottom-0 right-0 bg-[var(--ui-primary)] text-white text-[10px] px-2 py-0.5 rounded-full font-bold shadow-sm">
                {{ profile.level }}
              </div>
            </div>

            <div>
              <h1 class="font-bold text-xl text-[var(--ui-text)]">{{ profile.name }}</h1>
              <p class="text-[var(--ui-text-muted)]">@{{ profile.username }}</p>
            </div>

            <div class="w-full pt-2 space-y-2">
              <UButton block size="lg" color="primary" variant="solid">Contactar</UButton>
              <UButton block size="sm" variant="ghost" color="gray">Solicitar Orçamento Personalizado</UButton>
            </div>
          </div>

          <div class="py-4 space-y-3 border-b border-[var(--ui-border)]">
            <div class="flex justify-between text-sm">
              <span class="text-[var(--ui-text-muted)] flex items-center gap-2">
                <UIcon name="i-heroicons-map-pin" /> Local
              </span>
              <span class="font-bold text-[var(--ui-text)]">{{ profile.location }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-[var(--ui-text-muted)] flex items-center gap-2">
                <UIcon name="i-heroicons-user" /> Membro desde
              </span>
              <span class="font-bold text-[var(--ui-text)]">{{ profile.memberSince }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-[var(--ui-text-muted)] flex items-center gap-2">
                <UIcon name="i-heroicons-chat-bubble-left-ellipsis" /> Tempo de resp.
              </span>
              <span class="font-bold text-[var(--ui-text)]">{{ profile.avgResponseTime }}</span>
            </div>
          </div>

          <div class="py-4 border-b border-[var(--ui-border)]">
            <p class="text-sm text-[var(--ui-text-muted)] leading-relaxed">
              {{ profile.bio }}
            </p>
          </div>

          <div class="pt-4 space-y-4">
            <div>
              <h3 class="font-bold text-[var(--ui-text)] text-sm mb-2">Idiomas</h3>
              <div v-for="lang in profile.languages" :key="lang.name" class="flex text-sm justify-between">
                <span class="text-[var(--ui-text-muted)]">{{ lang.name }}</span>
                <span class="text-[var(--ui-text-muted)] opacity-70 text-xs uppercase font-bold">{{ lang.level }}</span>
              </div>
            </div>

            <div>
              <h3 class="font-bold text-[var(--ui-text)] text-sm mb-2">Habilidades</h3>
              <div class="flex flex-wrap gap-2">
                <UBadge
                    v-for="skill in profile.skills"
                    :key="skill"
                    color="gray"
                    variant="subtle"
                    :ui="{ rounded: 'rounded-full' }"
                >
                  {{ skill }}
                </UBadge>
              </div>
            </div>
          </div>

        </UCard>
      </div>

      <div class="lg:col-span-2 space-y-[var(--space-8)]">

        <section>
          <h2 class="text-xl font-bold text-[var(--ui-text)] mb-4">Gigs de {{ profile.name }}</h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div
                v-for="gig in activeGigs"
                :key="gig.id"
                class="group cursor-pointer bg-[var(--ui-bg-elevated)] border border-[var(--ui-border)] rounded-lg overflow-hidden hover:shadow-lg transition"
                @click="navigateTo(`/explorer/${gig.id}`)"
            >
              <div class="aspect-[4/3] bg-gray-200 overflow-hidden relative">
                <img :src="gig.image" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
              </div>

              <div class="p-3 space-y-2">
                <h3 class="font-medium text-[var(--ui-text)] line-clamp-2 text-sm group-hover:text-[var(--ui-primary)] transition">
                  {{ gig.title }}
                </h3>

                <div class="flex justify-between items-center pt-2 border-t border-[var(--ui-border)]">
                  <div class="flex items-center gap-1 text-xs">
                    <UIcon name="i-heroicons-star-solid" class="text-yellow-400 w-3 h-3" />
                    <span class="font-bold text-[var(--ui-text)]">{{ gig.rating }}</span>
                    <span class="text-[var(--ui-text-muted)]">({{ gig.reviews }})</span>
                  </div>
                  <div class="text-[var(--ui-text-muted)] text-xs uppercase font-bold">
                    <span class="text-[var(--ui-text)] text-sm">{{ money(gig.price) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div class="flex items-center gap-3 mb-6">
            <h2 class="text-xl font-bold text-[var(--ui-text)]">O que dizem os clientes</h2>
            <div class="flex items-center gap-1 text-yellow-500 font-bold">
              <UIcon name="i-heroicons-star-solid" />
              <span>5.0</span>
              <span class="text-[var(--ui-text-muted)] font-normal">(128 reviews)</span>
            </div>
          </div>

          <div class="space-y-4">
            <div
                v-for="review in reviews"
                :key="review.id"
                class="border-b border-[var(--ui-border)] pb-6 last:border-0"
            >
              <div class="flex gap-4">
                <UAvatar :alt="review.buyer" size="md" class="cursor-pointer" @click="navigateTo(review.buyerUrl)" />
                <div class="space-y-1">
                  <div class="flex items-center gap-2">
                    <span
                        class="font-bold text-[var(--ui-text)] cursor-pointer hover:underline"
                        @click="navigateTo(review.buyerUrl)"
                    >
                      {{ review.buyer }}
                    </span>
                    <span class="text-xs text-[var(--ui-text-muted)]">• {{ review.date }}</span>
                  </div>
                  <div class="flex text-yellow-400 text-xs">
                    <UIcon v-for="i in 5" :key="i" name="i-heroicons-star-solid" />
                  </div>
                  <p class="text-sm text-[var(--ui-text-muted)] mt-2">
                    {{ review.comment }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <UButton variant="outline" block class="mt-4">Carregar mais avaliações</UButton>
        </section>

      </div>

    </div>
  </div>
</template>