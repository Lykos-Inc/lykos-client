<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

definePageMeta({
  layout: 'default'
})

const route = useRoute()
const usernameParam = route.params.username

// --- Simulação de Auth (Para saber se sou EU vendo meu perfil) ---
// Em produção: const { user } = useAuth()
const currentUser = 'brunonunes' // Simula que estou logado como Bruno
const isOwner = computed(() => usernameParam === currentUser)

// --- Mock do Usuário (Comprador) ---
const profile = ref({
  name: 'Bruno Nunes',
  username: usernameParam,
  avatar: '/images/avatar-placeholder.jpg',
  location: 'São Paulo, Brasil',
  memberSince: 'Março 2025',
  isVerified: true,
  about: 'Apaixonado por tecnologia e design. Sempre buscando os melhores profissionais para colaborar nos meus projetos.',
  stats: {
    ordersCompleted: 42,
    totalSpent: 12500.00, // Só o dono vê
    avgRatingReceived: 4.9
  }
})

// --- Mock: Favoritos (Feature em Produção) ---
const favorites = ref([
  {
    id: 101,
    title: 'Edição de Vídeo Cinematográfica',
    image: '/images/mock-video-thumb.jpg',
    freelancer: 'Pedro Cuts',
    price: 300
  },
  {
    id: 102,
    title: 'Consultoria de SEO',
    image: '/images/mock-seo.jpg',
    freelancer: 'Ana SEO',
    price: 450
  }
])

// --- Mock: Avaliações Recebidas (Freelancer -> Cliente) ---
// Feature "Nova"
const reviewsReceived = ref([
  {
    id: 1,
    freelancerName: 'Carla Design',
    freelancerUsername: 'carladesign',
    avatar: '',
    rating: 5,
    comment: 'O Bruno é um cliente excelente! Briefing claro, pagou rápido e foi super educado. Recomendo!',
    date: 'Há 2 semanas',
    project: 'Identidade Visual'
  },
  {
    id: 2,
    freelancerName: 'Dev Master',
    freelancerUsername: 'devmaster',
    avatar: '',
    rating: 4.8,
    comment: 'Ótima experiência. Tivemos apenas alguns ajustes de escopo no meio, mas resolvemos tranquilamente.',
    date: 'Há 1 mês',
    project: 'Landing Page Vue'
  }
])

const money = (val: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val)
</script>

<template>
  <div class="max-w-6xl mx-auto px-[var(--space-4)] py-[var(--space-8)]">

    <div class="grid grid-cols-1 md:grid-cols-12 gap-[var(--space-8)]">

      <div class="md:col-span-4 space-y-[var(--space-6)]">

        <UCard :ui="{ root: 'bg-[var(--ui-bg-elevated)] ring-1 ring-[var(--ui-border)] overflow-hidden sticky top-6' }">

          <div class="flex flex-col items-center text-center space-y-4 pb-6 border-b border-[var(--ui-border)]">
            <div class="relative mt-4">
              <UAvatar :alt="profile.name" size="3xl" class="ring-4 ring-[var(--ui-bg)]" />
              <div v-if="profile.isVerified" class="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-1 border-2 border-[var(--ui-bg)]" title="Identidade Verificada">
                <UIcon name="i-heroicons-check" class="w-3 h-3" />
              </div>
            </div>

            <div>
              <h1 class="font-bold text-xl text-[var(--ui-text)]">{{ profile.name }}</h1>
              <p class="text-[var(--ui-text-muted)]">@{{ profile.username }}</p>
            </div>

            <div class="flex gap-2 justify-center">
              <UBadge color="gray" variant="solid">Cliente</UBadge>
              <UBadge v-if="isOwner" color="primary" variant="subtle">Você</UBadge>
            </div>
          </div>

          <div class="py-6 space-y-3">
            <div class="flex justify-between text-sm">
              <span class="text-[var(--ui-text-muted)] flex items-center gap-2">
                <UIcon name="i-heroicons-map-pin" /> Local
              </span>
              <span class="font-bold text-[var(--ui-text)]">{{ profile.location }}</span>
            </div>
            <div class="flex justify-between text-sm">
              <span class="text-[var(--ui-text-muted)] flex items-center gap-2">
                <UIcon name="i-heroicons-calendar" /> Membro desde
              </span>
              <span class="font-bold text-[var(--ui-text)]">{{ profile.memberSince }}</span>
            </div>

            <div class="flex justify-between text-sm">
              <span class="text-[var(--ui-text-muted)] flex items-center gap-2">
                <UIcon name="i-heroicons-shopping-bag" /> Pedidos
              </span>
              <span class="font-bold text-[var(--ui-text)]">{{ profile.stats.ordersCompleted }}</span>
            </div>

            <div v-if="isOwner" class="flex justify-between text-sm bg-gray-50 p-2 rounded">
              <span class="text-[var(--ui-text-muted)] flex items-center gap-2">
                <UIcon name="i-heroicons-banknotes" /> Total Investido
              </span>
              <span class="font-bold text-green-600">{{ money(profile.stats.totalSpent) }}</span>
            </div>
          </div>

          <div class="pt-4 border-t border-[var(--ui-border)]">
            <p class="text-sm text-[var(--ui-text-muted)] leading-relaxed italic">
              "{{ profile.about }}"
            </p>
          </div>

          <div v-if="isOwner" class="pt-6 mt-4 border-t border-[var(--ui-border)] space-y-2">
            <UButton block to="/dashboard/settings" color="gray" variant="ghost" icon="i-heroicons-cog-6-tooth">
              Configurações
            </UButton>
            <UButton block to="/dashboard/purchases" color="primary" variant="solid" icon="i-heroicons-list-bullet">
              Meus Pedidos
            </UButton>
          </div>

        </UCard>
      </div>

      <div class="md:col-span-8 space-y-[var(--space-8)]">

        <div v-if="isOwner" class="space-y-4">
          <div class="flex items-center gap-3">
            <h2 class="text-xl font-bold text-[var(--ui-text)]">Meus Favoritos</h2>
            <UBadge label="Em Breve" color="orange" variant="subtle" size="xs" />
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
                v-for="fav in favorites"
                :key="fav.id"
                class="flex gap-3 p-3 rounded-lg border border-[var(--ui-border)] bg-[var(--ui-bg-elevated)] opacity-75 hover:opacity-100 transition cursor-not-allowed"
                title="Feature em desenvolvimento"
            >
              <img :src="fav.image" class="w-16 h-16 rounded object-cover grayscale" />
              <div>
                <div class="font-bold text-sm line-clamp-1">{{ fav.title }}</div>
                <div class="text-xs text-[var(--ui-text-muted)]">{{ fav.freelancer }}</div>
                <div class="font-bold text-sm mt-1">{{ money(fav.price) }}</div>
              </div>
            </div>

            <div class="flex items-center justify-center p-4 border border-dashed border-[var(--ui-border)] rounded-lg text-sm text-[var(--ui-text-muted)]">
              + Adicionar lista (Em breve)
            </div>
          </div>
        </div>

        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <h2 class="text-xl font-bold text-[var(--ui-text)]">Reputação como Cliente</h2>
              <UBadge label="Novo" color="blue" variant="solid" size="xs" />
            </div>
            <div class="flex items-center gap-1 font-bold text-yellow-500">
              <UIcon name="i-heroicons-star-solid" />
              {{ profile.stats.avgRatingReceived }}
            </div>
          </div>

          <p class="text-sm text-[var(--ui-text-muted)]">
            O que os freelancers dizem sobre trabalhar com {{ profile.name.split(' ')[0] }}.
          </p>

          <div class="space-y-4">
            <UCard
                v-for="review in reviewsReceived"
                :key="review.id"
                :ui="{ body: { padding: 'p-4 sm:p-6' } }"
            >
              <div class="flex gap-4">
                <UAvatar :alt="review.freelancerName" size="md" />
                <div class="space-y-1 flex-1">
                  <div class="flex justify-between items-start">
                    <div>
                      <span class="font-bold text-[var(--ui-text)]">{{ review.freelancerName }}</span>
                      <div class="text-xs text-[var(--ui-text-muted)]">Freelancer contratado</div>
                    </div>
                    <span class="text-xs text-[var(--ui-text-muted)]">{{ review.date }}</span>
                  </div>

                  <div class="flex text-yellow-400 text-xs py-1">
                    <UIcon v-for="i in 5" :key="i" :name="i <= review.rating ? 'i-heroicons-star-solid' : 'i-heroicons-star'" />
                  </div>

                  <p class="text-sm text-[var(--ui-text)] italic">"{{ review.comment }}"</p>

                  <div class="mt-2 pt-2 border-t border-[var(--ui-border)] inline-block">
                    <UBadge color="gray" variant="soft" size="xs">Projeto: {{ review.project }}</UBadge>
                  </div>
                </div>
              </div>
            </UCard>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>
