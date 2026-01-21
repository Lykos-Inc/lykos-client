<template>
  <div class="min-h-screen bg-white">
    <!-- HERO -->
    <section
        class="bg-cover bg-center py-32 px-6"
        :style="{ backgroundImage: `url(${heroBg})` }"
    >
      <div class="max-w-6xl mx-auto text-center text-white space-y-6">
        <h1 class="text-3xl md:text-5xl font-bold leading-tight">
          Encontre o serviço freelance ideal<br/>imediatamente
        </h1>

        <div class="flex justify-center gap-4">
          <UInput
              size="lg"
              placeholder="Buscar serviços, freelancers..."
              class="w-6/12"
          />
          <UButton size="lg" color="primary">Pesquisar</UButton>
        </div>
      </div>
    </section>

    <!-- CATEGORIAS -->
    <section class="py-16 px-6">
      <div class="max-w-6xl mx-auto text-center space-y-8">
        <h2 class="text-2xl font-semibold text-black">O que você procura?</h2>

        <div class="flex flex-wrap justify-center gap-3">
          <UBadge
              v-for="item in categorias"
              :key="item"
              variant="outline"
              size="lg"
              class="cursor-pointer"
          >
            {{ item }}
          </UBadge>
        </div>
      </div>
    </section>

    <!-- SERVIÇOS POPULARES -->
    <section class="py-16 px-6 bg-gray-50">
      <div class="max-w-6xl mx-auto space-y-10">
        <h2 class="text-center text-2xl font-semibold text-black">
          Serviços populares
        </h2>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <UCard v-for="i in 4" :key="i" class="overflow-hidden">
            <img :src="popularImages[i - 1]" class="h-32 w-full object-cover"/>
            <template #footer>
              <div class="space-y-1">
                <h3 class="font-semibold text-black">Serviço {{ i }}</h3>
                <p class="text-sm text-gray-500">
                  Descrição curta do serviço oferecido.
                </p>
              </div>
            </template>
          </UCard>
        </div>
      </div>
    </section>

    <!-- COMO FUNCIONA -->
    <section class="py-20">
      <div class="max-w-3xl mx-auto space-y-12">
        <h2 class="text-center text-3xl font-bold text-black">
          Como funciona
        </h2>

        <div class="space-y-10">
          <div v-for="step in steps" :key="step.title" class="flex gap-4">
            <UIcon :name="step.icon" class="w-7 h-7 text-primary"/>
            <div>
              <h3 class="font-semibold text-black">{{ step.title }}</h3>
              <p class="text-gray-600">{{ step.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- BENEFÍCIOS -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-6 space-y-12">
        <h2 class="text-center text-3xl font-bold text-black">
          Por que escolher nossa plataforma?
        </h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <UCard v-for="b in benefits" :key="b.title">
            <UIcon :name="b.icon" class="w-7 h-7 text-primary mb-4"/>
            <h3 class="font-semibold text-black mb-2">{{ b.title }}</h3>
            <p class="text-sm text-gray-600">{{ b.desc }}</p>
          </UCard>
        </div>
      </div>
    </section>

    <!-- CTA PRO -->
    <section class="py-20">
      <UCard class="max-w-3xl mx-auto text-center border-primary">
        <h3 class="text-xl font-bold text-black mb-2">Freelance Pro</h3>
        <p class="text-gray-600 mb-6">
          Ferramentas premium, suporte prioritário e mais oportunidades.
        </p>
        <UButton color="primary">Explorar Pro</UButton>
      </UCard>
    </section>

    <!-- FOOTER -->
    <footer class="py-12 text-center space-y-6 text-sm text-gray-600">
      <div class="flex justify-center gap-8">
        <span v-for="l in links" :key="l">{{ l }}</span>
      </div>

      <div class="flex justify-center gap-5">
        <UIcon
            v-for="i in socials"
            :key="i"
            :name="i"
            class="w-5 h-5"
        />
      </div>

      <p>© 2024 Premium</p>
    </footer>
  </div>
</template>

<script setup>
definePageMeta({layout: 'default'})

const heroBg =
    'https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1600&q=80'

const categorias = [
  'Design',
  'Marketing',
  'Programação',
  'Branding',
  'Vídeo'
]

const popularImages = [
  'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1520975918318-3bbad62d2b5d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80'
]

const steps = [
  {
    icon: 'i-heroicons-magnifying-glass',
    title: 'Encontre o freelancer ideal',
    desc: 'Busque por categoria, preço e avaliação'
  },
  {
    icon: 'i-heroicons-chat-bubble-left-right',
    title: 'Colabore facilmente',
    desc: 'Comunicação integrada na plataforma'
  },
  {
    icon: 'i-heroicons-credit-card',
    title: 'Pague com segurança',
    desc: 'Pagamento liberado só após aprovação'
  }
]

const benefits = [
  {
    icon: 'i-heroicons-users',
    title: 'Talentos qualificados',
    desc: 'Profissionais verificados'
  },
  {
    icon: 'i-heroicons-list-bullet',
    title: 'Processo simples',
    desc: 'Contratação rápida'
  },
  {
    icon: 'i-heroicons-shield-check',
    title: 'Segurança',
    desc: 'Pagamentos protegidos'
  },
  {
    icon: 'i-heroicons-headphones',
    title: 'Suporte',
    desc: 'Equipe dedicada'
  },
  {
    icon: 'i-heroicons-user-group',
    title: 'Colaboração',
    desc: 'Ferramentas integradas'
  }
]

const links = ['Sobre', 'Carreiras', 'Parcerias', 'Privacidade']

const socials = [
  'i-heroicons-twitter',
  'i-heroicons-facebook',
  'i-heroicons-instagram',
  'i-heroicons-linkedin'
]
</script>
