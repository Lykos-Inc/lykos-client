<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

definePageMeta({
  layout: 'default'
})

const route = useRoute()
const gigId = route.params.id

// --- Estado dos Pacotes ---
const selectedPackage = ref('PADRAO') // BASICO, PADRAO, PREMIUM
const packageItems = [
  { label: 'Básico', slot: 'BASICO' },
  { label: 'Padrão', slot: 'PADRAO' },
  { label: 'Premium', slot: 'PREMIUM' }
]

// --- Mock do Serviço ---
const gig = ref({
  id: gigId,
  title: 'Eu vou criar uma identidade visual minimalista e atemporal para sua marca',
  category: 'Design Gráfico > Logo Design',
  images: [
    '/images/mock-gig-cover.jpg',
    '/images/mock-gig-2.jpg',
    '/images/mock-gig-3.jpg'
  ],
  description: `
    <p class="mb-4">Olá! Sou Bruno, designer sênior com foco em minimalismo.</p>
    <p class="mb-4">Você está procurando um logotipo que transmita modernidade e sofisticação? Você está no lugar certo.</p>
    <p class="mb-4"><strong>O que você vai receber:</strong></p>
    <ul class="list-disc pl-5 space-y-2 mb-4">
      <li>Conceitos originais e únicos</li>
      <li>Arquivos em alta resolução (PNG, JPG)</li>
      <li>Arquivos vetoriais (AI, EPS, SVG)</li>
      <li>Manual da marca (no pacote Premium)</li>
    </ul>
    <p>Vamos elevar o nível da sua marca juntos!</p>
  `,
  freelancer: {
    name: 'Bruno Nunes',
    username: 'brunonunes',
    avatar: '/images/avatar-placeholder.jpg',
    level: 'Nível 2',
    rating: 5.0,
    reviewsCount: 128,
    responseTime: '1 hora'
  },
  packages: {
    BASICO: {
      name: 'Startup Starter',
      description: '1 opção de logo + Arquivos PNG/JPG de alta qualidade.',
      price: 90.00,
      delivery: 3,
      revisions: 1,
      features: ['1 Conceito', 'Alta Resolução', 'Fundo Transparente']
    },
    PADRAO: {
      name: 'Business Pro',
      description: '2 opções de logo + Arquivos Vetoriais + Paleta de Cores.',
      price: 350.00,
      delivery: 5,
      revisions: 3,
      features: ['2 Conceitos', 'Alta Resolução', 'Arquivo Vetorial', 'Paleta de Cores', 'Mockup 3D']
    },
    PREMIUM: {
      name: 'Identidade Completa',
      description: '3 opções + Manual da Marca + Papelaria + Social Media Kit.',
      price: 800.00,
      delivery: 10,
      revisions: 99, // Ilimitado
      features: ['3 Conceitos', 'Tudo do Padrão', 'Manual da Marca', 'Social Media Kit', 'Suporte Prioritário']
    }
  },
  reviews: [
    {
      id: 1,
      user: 'Startup X',
      avatar: '',
      rating: 5,
      comment: 'Trabalho incrível! O Bruno captou exatamente a essência da nossa empresa.',
      date: 'Há 1 semana'
    },
    {
      id: 2,
      user: 'Roberto M.',
      avatar: '',
      rating: 5,
      comment: 'Muito profissional e rápido. Recomendo.',
      date: 'Há 2 semanas'
    }
  ]
})

// --- Computed ---
const currentPkg = computed(() => gig.value.packages[selectedPackage.value as keyof typeof gig.value.packages])

const money = (val: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val)
</script>

<template>
  <div class="max-w-7xl mx-auto px-[var(--space-4)] py-[var(--space-8)]">

    <nav class="text-sm text-[var(--ui-text-muted)] mb-6">
      <NuxtLink to="/dashboard/home" class="hover:text-[var(--ui-primary)]">Home</NuxtLink>
      <span class="mx-2">/</span>
      <NuxtLink to="/explorer" class="hover:text-[var(--ui-primary)]">Explorer</NuxtLink>
      <span class="mx-2">/</span>
      <span class="text-[var(--ui-text)]">{{ gig.category }}</span>
    </nav>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

      <div class="lg:col-span-8 space-y-8">

        <div>
          <h1 class="text-2xl md:text-3xl font-bold text-[var(--ui-text)] mb-4 leading-tight">
            {{ gig.title }}
          </h1>

          <div class="flex items-center gap-4 text-sm">
            <div class="flex items-center gap-2">
              <UAvatar :src="gig.freelancer.avatar" :alt="gig.freelancer.name" size="xs" />
              <NuxtLink :to="`/f/${gig.freelancer.username}`" class="font-bold text-[var(--ui-text)] hover:underline">
                {{ gig.freelancer.name }}
              </NuxtLink>
              <span class="text-[var(--ui-text-muted)]">|</span>
              <span class="text-[var(--ui-text-muted)]">{{ gig.freelancer.level }}</span>
            </div>

            <div class="flex items-center gap-1 text-yellow-500">
              <div class="flex">
                <UIcon name="i-heroicons-star-solid" v-for="i in 5" :key="i" class="w-4 h-4" />
              </div>
              <span class="font-bold text-[var(--ui-text)]">{{ gig.freelancer.rating }}</span>
              <span class="text-[var(--ui-text-muted)]">({{ gig.freelancer.reviewsCount }})</span>
            </div>
          </div>
        </div>

        <div class="rounded-xl overflow-hidden bg-gray-100 aspect-video relative group">
          <img :src="gig.images[0]" class="w-full h-full object-cover" />

          <div class="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition">
            <UButton icon="i-heroicons-chevron-left" color="white" variant="solid" :ui="{ rounded: 'rounded-full' }" />
            <UButton icon="i-heroicons-chevron-right" color="white" variant="solid" :ui="{ rounded: 'rounded-full' }" />
          </div>

          <div class="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            <div v-for="(img, idx) in gig.images" :key="idx" class="w-2 h-2 rounded-full bg-white shadow" :class="idx === 0 ? 'bg-white scale-125' : 'bg-white/50'"></div>
          </div>
        </div>

        <div>
          <h2 class="text-xl font-bold text-[var(--ui-text)] mb-4">Sobre este serviço</h2>
          <div class="prose dark:prose-invert max-w-none text-[var(--ui-text)]" v-html="gig.description"></div>
        </div>

        <UDivider />

        <div>
          <h2 class="text-xl font-bold text-[var(--ui-text)] mb-6">Sobre o Vendedor</h2>
          <div class="flex gap-4 md:gap-6">
            <UAvatar :src="gig.freelancer.avatar" :alt="gig.freelancer.name" size="2xl" />
            <div class="space-y-3">
              <div>
                <NuxtLink :to="`/f/${gig.freelancer.username}`" class="text-lg font-bold text-[var(--ui-text)] hover:underline">
                  {{ gig.freelancer.name }}
                </NuxtLink>
                <div class="text-[var(--ui-text-muted)]">{{ gig.category.split('>')[0] }} Specialist</div>
              </div>

              <div class="flex gap-4 text-sm">
                <div class="flex items-center gap-1 text-[var(--ui-text-muted)]">
                  <UIcon name="i-heroicons-star-solid" />
                  <strong>{{ gig.freelancer.rating }}</strong>
                </div>
                <div class="flex items-center gap-1 text-[var(--ui-text-muted)]">
                  <UIcon name="i-heroicons-chat-bubble-left-ellipsis" />
                  Resp. média: <strong>{{ gig.freelancer.responseTime }}</strong>
                </div>
              </div>

              <p class="text-sm text-[var(--ui-text)]">
                Especialista em identidades visuais com mais de 5 anos de experiência ajudando startups a se destacarem.
              </p>

              <UButton variant="outline" :to="`/f/${gig.freelancer.username}`">Ver Perfil Completo</UButton>
            </div>
          </div>
        </div>

        <UDivider />

        <div>
          <h2 class="text-xl font-bold text-[var(--ui-text)] mb-6">Avaliações</h2>
          <div class="space-y-6">
            <div v-for="review in gig.reviews" :key="review.id" class="border-b border-[var(--ui-border)] pb-6 last:border-0">
              <div class="flex gap-3 mb-2">
                <UAvatar :alt="review.user" size="sm" />
                <div>
                  <div class="text-sm font-bold text-[var(--ui-text)]">{{ review.user }}</div>
                  <div class="flex text-yellow-400 text-xs">
                    <UIcon v-for="i in 5" :key="i" name="i-heroicons-star-solid" />
                    <span class="ml-2 text-[var(--ui-text-muted)] text-xs">{{ review.date }}</span>
                  </div>
                </div>
              </div>
              <p class="text-sm text-[var(--ui-text)]">{{ review.comment }}</p>
            </div>
          </div>
        </div>

      </div>

      <div class="lg:col-span-4">
        <div class="sticky top-24 space-y-6">

          <UCard :ui="{ root: 'bg-[var(--ui-bg-elevated)] ring-1 ring-[var(--ui-border)] shadow-lg overflow-hidden', body: { padding: 'p-0' } }">

            <div class="grid grid-cols-3 border-b border-[var(--ui-border)] text-center text-sm font-bold bg-[var(--ui-bg)]">
              <button
                  v-for="pkg in packageItems"
                  :key="pkg.slot"
                  class="py-3 px-1 transition-all border-b-2 hover:bg-[var(--ui-bg-hover)]"
                  :class="selectedPackage === pkg.slot
                  ? 'border-[var(--ui-primary)] text-[var(--ui-primary)] bg-[var(--ui-bg-active)]'
                  : 'border-transparent text-[var(--ui-text-muted)]'"
                  @click="selectedPackage = pkg.slot"
              >
                {{ pkg.label }}
              </button>
            </div>

            <div class="p-6 space-y-6">
              <div class="flex justify-between items-start">
                <h3 class="font-bold text-lg text-[var(--ui-text)]">{{ currentPkg.name }}</h3>
                <span class="text-2xl font-bold text-[var(--ui-text)]">{{ money(currentPkg.price) }}</span>
              </div>

              <p class="text-sm text-[var(--ui-text-muted)]">
                {{ currentPkg.description }}
              </p>

              <div class="flex items-center gap-4 text-sm font-bold text-[var(--ui-text)]">
                <div class="flex items-center gap-1">
                  <UIcon name="i-heroicons-clock" class="text-[var(--ui-primary)]"/>
                  {{ currentPkg.delivery }} dias
                </div>
                <div class="flex items-center gap-1">
                  <UIcon name="i-heroicons-arrow-path" class="text-[var(--ui-text-muted)]"/>
                  {{ currentPkg.revisions === 99 ? '∞' : currentPkg.revisions }} Revisões
                </div>
              </div>

              <ul class="space-y-2 text-sm">
                <li v-for="feat in currentPkg.features" :key="feat" class="flex items-start gap-2 text-[var(--ui-text-muted)]">
                  <UIcon name="i-heroicons-check" class="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  <span>{{ feat }}</span>
                </li>
              </ul>

              <div class="space-y-3">
                <UButton
                    block
                    size="xl"
                    color="green"
                    trailing-icon="i-heroicons-arrow-right"
                    :to="`/purchase/checkout/${gig.id}?pacote=${selectedPackage}`"
                >
                  Continuar ({{ money(currentPkg.price) }})
                </UButton>

                <UButton block variant="outline" color="gray">
                  Contactar Vendedor
                </UButton>
              </div>
            </div>

          </UCard>

          <div class="text-center text-xs text-[var(--ui-text-muted)] px-4">
            <p>Sua segurança é nossa prioridade.</p>
            <p class="mt-1">Pagamento protegido até a aprovação do serviço.</p>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>