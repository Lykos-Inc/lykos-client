<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
definePageMeta({ layout: 'default' })

const route = useRoute()
// username e slug estão em route.params

// Mock
const gig = ref({
  title: 'Eu vou criar uma identidade visual minimalista',
  image: '/images/mock-gig-cover.jpg',
  freelancer: { name: 'Bruno Nunes', username: route.params.username, avatar: '', level: 'Nível 2' },
  description: '<p>Criação profissional de logos e marcas.</p>',
  packages: {
    BASICO: { name: 'Básico', price: 90, desc: 'Logo simples' },
    PADRAO: { name: 'Padrão', price: 350, desc: 'Logo + Vetores' },
    PREMIUM: { name: 'Pro', price: 800, desc: 'Identidade Completa' }
  }
})
const selectedPkg = ref('PADRAO')
const currentPkg = computed(() => gig.value.packages[selectedPkg.value])
</script>

<template>
  <div class="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
    <div class="lg:col-span-8 space-y-6">
      <h1 class="text-3xl font-bold">{{ gig.title }}</h1>
      <div class="flex items-center gap-2 text-sm">
        <UAvatar :alt="gig.freelancer.name" size="xs"/>
        <NuxtLink :to="`/${gig.freelancer.username}`" class="font-bold hover:underline">{{ gig.freelancer.name }}</NuxtLink>
        <span class="text-gray-400">|</span> <span>{{ gig.freelancer.level }}</span>
      </div>
      <img :src="gig.image" class="w-full rounded-xl object-cover aspect-video bg-gray-100"/>
      <div class="prose max-w-none" v-html="gig.description"></div>
    </div>

    <div class="lg:col-span-4 sticky top-24 h-fit">
      <UCard :ui="{ body: { padding: 'p-0' } }">
        <div class="grid grid-cols-3 text-center text-sm font-bold border-b bg-gray-50">
          <div v-for="(val, key) in gig.packages" :key="key" @click="selectedPkg = key"
               class="py-3 cursor-pointer border-b-2 transition"
               :class="selectedPkg === key ? 'border-primary text-primary bg-white' : 'border-transparent text-gray-500'">
            {{ val.name }}
          </div>
        </div>
        <div class="p-6 space-y-4">
          <div class="flex justify-between font-bold text-lg">
            <span>{{ currentPkg.name }}</span> <span>R$ {{ currentPkg.price }}</span>
          </div>
          <p class="text-sm text-gray-500">{{ currentPkg.desc }}</p>
          <UButton block size="xl" color="green" :to="`/checkout/123?pacote=${selectedPkg}`">
            Continuar (R$ {{ currentPkg.price }})
          </UButton>
        </div>
      </UCard>
    </div>
  </div>
</template>