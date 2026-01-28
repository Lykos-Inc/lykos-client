<script setup lang="ts">
import { ref, onMounted } from 'vue'

type Item = {
  id: number
  image: string
  title: string
  author: string
}

const items = ref<Item[]>([])
const loader = ref<HTMLElement | null>(null)
let page = 0

const generateItems = () => {
  const batch = Array.from({ length: 16 }).map((_, i) => ({
    id: page * 100 + i,
    image: `https://picsum.photos/500/${300 + Math.floor(Math.random() * 500)}?random=${page * 100 + i}`,
    title: 'Design Gráfico',
    author: 'Designer Pro'
  }))

  items.value.push(...batch)
  page++
}

onMounted(() => {
  generateItems()

  const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          generateItems()
        }
      },
      { rootMargin: '400px' }
  )

  if (loader.value) {
    observer.observe(loader.value)
  }
})
</script>


<template>
  <section class="px-6 py-16">
    <div class="masonry">
      <article
          v-for="item in items"
          :key="item.id"
          class="group relative mb-6 break-inside-avoid rounded-xl overflow-hidden bg-muted"
      >
        <!-- Imagem -->
        <img
            :src="item.image"
            loading="lazy"
            class="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
            alt="Design gráfico"
        />

        <!-- Overlay -->
        <div
            class="absolute inset-0 bg-gradient-to-t
                 from-black/80 via-black/30 to-transparent
                 opacity-0 group-hover:opacity-100 transition
                 flex flex-col justify-end p-4"
        >
          <p class="text-sm font-semibold text-white">
            {{ item.title }}
          </p>
          <p class="text-xs text-white/70">
            por {{ item.author }}
          </p>
        </div>
      </article>
    </div>

    <!-- Trigger infinite scroll -->
    <div ref="loader" class="h-1"></div>
  </section>
</template>


<style scoped>
.masonry {
  column-count: 5;
  column-gap: 1.5rem;
}

@media (max-width: 1536px) {
  .masonry {
    column-count: 4;
  }
}

@media (max-width: 1280px) {
  .masonry {
    column-count: 3;
  }
}

@media (max-width: 768px) {
  .masonry {
    column-count: 2;
  }
}
</style>
