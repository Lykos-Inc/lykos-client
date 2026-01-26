<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
definePageMeta({ layout: 'default' })
const route = useRoute()
const username = route.params.username

const profile = ref({
  name: 'Bruno Nunes', username, level: 'Nível 2',
  bio: 'Desenvolvedor Full Stack e Designer com foco em UX/UI.',
  avatar: '/images/avatar-placeholder.jpg',
  skills: ['Vue.js', 'Nuxt', 'Design'],
  gigs: [
    { id: 101, title: 'Criação de Identidade Visual', image: '/images/mock-gig-cover.jpg', price: 500, rating: 5.0, slug: 'identidade-visual-minimalista' },
    { id: 102, title: 'Landing Page Vue.js', image: '/images/mock-code.jpg', price: 1200, rating: 4.9, slug: 'landing-page-vue' }
  ]
})
</script>

<template>
  <div class="max-w-7xl mx-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
    <div class="space-y-6">
      <UCard class="text-center">
        <UAvatar :alt="profile.name" size="3xl" class="mx-auto mb-4 ring-4 ring-gray-100"/>
        <h1 class="text-xl font-bold">{{ profile.name }}</h1>
        <p class="text-gray-500">@{{ profile.username }}</p>
        <div class="my-4"><UBadge color="primary">{{ profile.level }}</UBadge></div>
        <UButton block>Contactar</UButton>
        <div class="mt-6 text-left text-sm space-y-2">
          <p>{{ profile.bio }}</p>
          <div class="pt-2"><strong class="block mb-1">Skills:</strong>
            <div class="flex flex-wrap gap-1"><UBadge v-for="s in profile.skills" :key="s" color="neutral" variant="soft">{{ s }}</UBadge></div>
          </div>
        </div>
      </UCard>
    </div>

    <div class="lg:col-span-2">
      <h2 class="text-2xl font-bold mb-6">Gigs de {{ profile.name }}</h2>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="gig in profile.gigs" :key="gig.id" class="border rounded-lg overflow-hidden hover:shadow-lg cursor-pointer transition"
             @click="navigateTo(`/${username}/${gig.slug}`)">
          <img :src="gig.image" class="aspect-video object-cover"/>
          <div class="p-3">
            <h3 class="font-bold text-sm line-clamp-2 mb-2">{{ gig.title }}</h3>
            <div class="flex justify-between items-center text-sm">
              <span class="text-yellow-500 font-bold">★ {{ gig.rating }}</span>
              <span class="font-bold">R$ {{ gig.price }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>