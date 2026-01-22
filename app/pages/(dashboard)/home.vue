<script setup lang="ts">
import InspirationScroller from '~/components/inspiration/InspirationScroller.vue'

const categories = [
  { id: 1, title: 'Design de logotipo moderno', price: 'A partir de $20' },
  { id: 2, title: 'Marketing no Instagram', price: 'A partir de $40' },
  { id: 3, title: 'Identidade visual', price: 'A partir de $30' },
  { id: 4, title: 'Social Media', price: 'A partir de $50' },
  { id: 5, title: 'Website Design', price: 'A partir de $70' }
]

const verifiedServices = [
  { id: 1, title: 'Designer gráfico premium', description: 'Identidade visual, branding e direção criativa.' },
  { id: 2, title: 'Consultor de Marketing', description: 'SEO, tráfego pago e posicionamento digital.' },
  { id: 3, title: 'Desenvolvedor Full Stack', description: 'Aplicações modernas, rápidas e escaláveis.' }
]
</script>

<template>
  <main class="bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      <!-- HERO -->
      <section class="mb-14">
        <h1 class="text-3xl font-semibold text-black mb-2">
          Bem-vindo de volta 👋
        </h1>
        <p class="text-[var(--primary-500)]">
          Encontre profissionais criativos prontos para tirar sua ideia do papel.
        </p>
      </section>

      <!-- CATEGORIAS -->
      <section class="mb-14">
        <h2 class="text-xl font-semibold text-black mb-6">
          Explore serviços populares
        </h2>

        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
          <div
              v-for="item in categories"
              :key="item.id"
              class="group cursor-pointer"
          >
            <div
                class="aspect-square rounded-xl bg-cover bg-center mb-3"
                :style="{ backgroundImage: `url(https://picsum.photos/400/400?random=${item.id})` }"
            />
            <h3 class="text-sm font-medium text-black group-hover:text-[var(--primary-500)] transition">
              {{ item.title }}
            </h3>
            <p class="text-sm text-[var(--primary-500)]">
              {{ item.price }}
            </p>
          </div>
        </div>
      </section>

      <!-- PROFISSIONAIS VERIFICADOS -->
      <section class="mb-20">
        <h2 class="text-xl font-semibold text-black mb-6">
          Profissionais verificados
        </h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
              v-for="service in verifiedServices"
              :key="service.id"
              class="rounded-xl border border-gray-100 overflow-hidden"
          >
            <div
                class="h-44 bg-cover bg-center"
                :style="{ backgroundImage: `url(https://picsum.photos/600/300?random=${service.id + 50})` }"
            />
            <div class="p-5">
              <h3 class="text-lg font-semibold text-black mb-1">
                {{ service.title }}
              </h3>
              <p class="text-sm text-gray-600 mb-4">
                {{ service.description }}
              </p>
              <UButton
                  block
                  label="Saiba mais"
                  class="bg-[var(--primary-500)] text-white"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- INSPIRAÇÃO (FIVERR STYLE) -->
      <section class="mb-16">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-semibold text-black">
            Inspire-se com trabalhos de Design
          </h2>
          <UButton variant="ghost" label="Ver mais" class="text-[var(--primary-500)]" />
        </div>

        <InspirationScroller />
      </section>

    </div>
  </main>
</template>