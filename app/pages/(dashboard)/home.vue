<template>
  <div class="min-h-screen bg-white">
    
    <main class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <section class="mb-10">
        <h1 class="text-3xl font-semibold mb-6 text-black">Bem-vinda de volta, Bruno</h1>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <UCard class="p-4" :ui="{ shadow: 'shadow-none', ring: 'ring-0', base: 'border-none' }">
            <div class="flex flex-col">
              <div class="h-80 w-full bg-cover bg-center rounded-lg mb-3" 
                   style="background-image: url('https://picsum.photos/800/400?random=1');">
              </div>
              <h3 class="text-lg font-medium text-black">Continue de onde parou</h3>
              <p class="text-sm mt-1" style="color: var(--color-dourado);">Retome seu último projeto ou explore serviços semelhantes.</p>
            </div>
          </UCard>
          
          <UCard class="p-4" :ui="{ shadow: 'shadow-none', ring: 'ring-0', base: 'border-none' }">
            <div class="flex flex-col">
              <div class="h-80 w-full bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                <UIcon name="i-heroicons-target-20-solid" class="w-10 h-10 text-gray-400" />
              </div>
              <h3 class="text-lg font-medium text-black">Recomendações para você</h3>
              <p class="text-sm mt-1" style="color: var(--color-dourado);">Descubra recomendações de acordo com suas necessidades e preferências.</p>
            </div>
          </UCard>
        </div>
      </section>

      <section class="mb-10">
        <h2 class="text-xl font-semibold mb-6 text-black">Com base no que você pode estar procurando</h2>

        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <UCard 
            v-for="service in categories" 
            :key="service.title" 
            class="cursor-default"
            :ui="{ body: { padding: 'p-3 sm:p-4' }, shadow: 'shadow-none', ring: 'ring-0', base: 'border-none' }"
          >
            <div class="flex flex-col">
              <div 
                class="w-full aspect-square rounded-lg mb-3 flex items-center justify-center relative overflow-hidden bg-cover bg-center"
                :class="{ '': service.isTutorial }"
                :style="{ backgroundImage: `url('https://picsum.photos/400/400?random=${service.id + 100}')` }"
              >
                
                </div>

              <h3 class="text-sm font-medium text-black line-clamp-1">{{ service.title }}</h3>
              <p class=" mt-1 text-[var(--color-dourado)] ">{{ service.price }}</p>
            </div>
          </UCard>
        </div>
      </section>

      <section class="mb-10">
        <h2 class="text-xl font-semibold mb-6 text-black">Serviços locais recomendados para você</h2>

        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <UCard 
            v-for="localService in localServices" 
            :key="localService.title" 
            class="cursor-default"
            :ui="{ body: { padding: 'p-3' }, shadow: 'shadow-none', ring: 'ring-0', base: 'border-none' }"
          >
            <div class="h-36 w-full bg-cover bg-center rounded-lg mb-2" 
                 :style="{ backgroundImage: `url('https://picsum.photos/400/300?random=${localService.id}')` }">
            </div>

            <h3 class="text-md font-semibold text-black line-clamp-1">{{ localService.title }}</h3>
            <p class="text-sm text-[var(--color-dourado)] mt-1">{{ localService.price }}</p>
          </UCard>
        </div>
      </section>

      <section class="mb-10">
        <h2 class="text-xl font-semibold mb-6 text-black">Serviços profissionais verificados</h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <UCard 
            v-for="verifiedService in verifiedServices" 
            :key="verifiedService.title" 
            class="cursor-default"
            :ui="{ body: { padding: 'p-0' }, shadow: 'shadow-none', ring: 'ring-0', base: 'border-none' }"
          >
            <div class="h-48 w-full bg-cover bg-center rounded-t-lg" 
                 :style="{ backgroundImage: `url('https://picsum.photos/600/300?random=${verifiedService.id + 10}')` }">
            </div>
            
            <div class="p-4">
              <h3 class="text-md font-semibold text-black mb-1 line-clamp-1">{{ verifiedService.title }}</h3>
              <p class="text-sm text-gray-600 h-20 overflow-hidden mb-">{{ verifiedService.description }}</p>

              <UButton 
                block 
                label="Saiba mais" 
                size="md"
                class="text-white"
                :ui="{ 
                  base: 'bg-[var(--color-dourado)]',
                  color: { primary: { solid: 'bg-[var(--color-dourado)]' } }
                }"
                style="background-color: var(--color-dourado);" 
              />
            </div>
          </UCard>
        </div>
      </section>

      <section class="mb-10">
        <h2 class="text-xl font-semibold mb-6 text-black">Inspira-se com o trabalho realizado em Design Gráfico</h2>

        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <UCard v-for="i in 10" :key="i" class="p-0 overflow-hidden aspect-square cursor-default" 
                 :ui="{ shadow: 'shadow-none', ring: 'ring-0', base: 'border-none' }">
            <img 
              :src="`https://picsum.photos/300/300?random=${i + 20}`" 
              class="w-full h-full object-cover" 
              alt="Inspiração de Design Gráfico"
            >
          </UCard>
        </div>
      </section>

    </main>

    <footer class="border-t border-gray-100 mt-12 py-8 text-center text-sm text-gray-500">
      <div class="flex justify-center space-x-6 mb-3">
        <a href="#" class="text-[var(--color-dourado)] hover:text-black">Terms of Use</a>
        <a href="#" class="text-[var(--color-dourado)] hover:text-black">Privacy Policy</a>
        <a href="#" class="text-[var(--color-dourado)] hover:text-black">Blog</a>
      </div>
      <p class="text-[var(--color-dourado)]">&copy; 2024 Lykos. All rights reserved.</p>
    </footer>
  </div>
</template>

<script setup>
// Definições de dados
const categories = [
  { id: 1, title: 'Design de logotipo moderno', price: 'A partir de $20', isTutorial: false },
  { id: 2, title: 'Marketing no Instagram', price: 'A partir de $40', isTutorial: true },
  { id: 3, title: 'Design de logotipo', price: 'A partir de $30', isTutorial: false },
  { id: 4, title: 'Social Media', price: 'A partir de $50', isTutorial: false },
  { id: 5, title: 'Website Design', price: 'A partir de $70', isTutorial: false },
];

const localServices = [
  { id: 6, title: 'Designer gráfico local', price: 'A partir de $40' },
  { id: 7, title: 'Consultor de marketing local', price: 'A partir de $40' },
  { id: 8, title: 'Desenvolvedor Web Local', price: 'A partir de $60' },
  { id: 9, title: 'Fotógrafo local', price: 'A partir de $50' },
  { id: 10, title: 'Editor de vídeo local', price: 'A partir de $70' },
];

const verifiedServices = [
  { id: 11, title: 'Designer gráfico de alta qualidade', description: 'Especialista em identidades visuais e estratégias de marca.' },
  { id: 12, title: 'Consultor de Marketing', description: 'Estratégias de marketing digital e SEO especializadas.' },
  { id: 13, title: 'Desenvolvedor Full Stack', description: 'Soluções intuitivas e escaláveis de desenvolvimento web.' },
  { id: 14, title: 'Fotógrafo Premium', description: 'Ensaios fotográficos de alto nível para eventos e produtos.' },
  { id: 15, title: 'Editor de Vídeo Profissional', description: 'Edição e finalização premium para vídeos e curtas.' },
];
</script>