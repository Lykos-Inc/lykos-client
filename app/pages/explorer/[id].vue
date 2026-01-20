<script setup>
const images = [
    {
        src: 'https://picsum.photos/200?random=1',
        alt: 'Paisagem ao pôr do sol',
        description: 'Uma bela vista do pôr do sol nas montanhas.'
    },
    {
        src: 'https://picsum.photos/200?random=2',
        alt: 'Cidade iluminada à noite',
        description: 'Luzes da cidade refletindo na água durante a noite.'
    },
    {
        src: 'https://picsum.photos/200?random=3',
        alt: 'Campo verdejante',
        description: 'Um campo aberto com vegetação exuberante e céu limpo.'
    }
]

const packages = [
    {
        title: "Logo Designer",
        description:
            "Este pacote foca no essencial para quem precisa de um logo profissional sem muitas complexidades ou elementos de marca adicionais.",
        features: [
            { input: true, box: "1 a 2 conceitos de logo iniciais." },
            { input: true, box: "Entrega de arquivos em alta resolução" }
        ]
        ,
        prazo: "3-5 dias úteis",
        revisoes: "2 revisões",
        preco: "R$ 1200,00"
    },
    {
        title: "Branding Kit",
        description:
            "Este pacote é para quem busca não apenas um logo, mas também alguns elementos de branding.",
        features: [
            { input: true, box: "3 a 4 conceitos de brandings iniciais." },
            { input: true, box: "Paleta de Cores Definida." },
            { input: true, box: "Manual de Uso Simplificado da Marca" },
            { input: true, box: "Seleção de Fontes (Primária e Secundária)." }
        ]
        ,
        prazo: "15-30 dias úteis",
        revisoes: "3-4 revisões",
        preco: "R$ 10.000,00"
    },
    {
        title: "Brand Strategy",
        description:
            "Este é o pacote mais robusto, ideal para empresas que buscam uma imersão completa na estratégia de marca.",
        features: [
            { input: true, box: "Brand Book (Manual de Marca Completo)" },
            { input: true, box: "Pesquisa de Mercado e Análise de Concorrência" },
            { input: true, box: "Definição de Persona/Público-Alvo" },
            { input: true, box: "Mockups de Aplicação da Marca" }
        ],

        prazo: "1-2 meses",
        revisoes: "7-9 revisões",
        preco: "R$ 15.000,00"
    }
]

const checkbox = [
    { input: true, box: "Design de logotipo personalizado e adaptado à sua marca" },
    { input: true, box: "Arquivos de alta resolução em vários formatos" },
    { input: true, box: "Revisões ilimitadas até a satisfação" }
]
const rating = 4.9
const totalReviews = 120

const distribution = [
    { stars: 5, percent: 80 },
    { stars: 4, percent: 14 },
    { stars: 3, percent: 3 },
    { stars: 2, percent: 1 },
    { stars: 1, percent: 2 },
]

const reviews = ref([
    {
        user: "Ethan Bennett",
        avatar: "https://i.pravatar.cc/50?img=3",
        date: "1 mês atrás",
        stars: 5,
        text: "O design do logotipo da Sophia superou minhas expectativas. Capturou perfeitamente a visão da minha marca.",
        likes: 2
    },
    {
        user: "Olívia Hayes",
        avatar: "https://i.pravatar.cc/50?img=5",
        date: "2 meses atrás",
        stars: 5,
        text: "Trabalhar com a Sophia foi um prazer. Ela foi ágil, criativa e criou um logotipo que realmente representa a identidade da minha marca.",
        likes: 1
    }
])
</script>

<template>
    <div class="flex flex-col w-8/12 mx-auto mt-20 mb-20">
        <div class="flex items-center gap-3 text-gray-800">
            <!-- Avatar redondo -->
            <img src="https://i.pravatar.cc/100?u=sophia-carter" alt="Sophia Carter"
                class="w-10 h-10 rounded-full object-cover" />

            <!-- Nome + rating -->
            <div>
                <p class="font-semibold text-sm">Sophia Carter</p>
                <div class="flex items-center text-sm text-gray-500">
                    <span class="text-yellow-500">★</span>
                    <span class="ml-1">4.9</span>
                    <span class="ml-1 text-gray-400">(120 reviews)</span>
                </div>
            </div>
        </div>
        <div class="flex justify-center">
            <UCard class="mt-6 p-6  ">
                <!-- Corpo: imagens com descrição -->
                <div class="flex justify-between p-2 gap-4 w-full">
                    <div v-for="(item, index) in images" :key="index" class=" w-1/3 flex flex-col items-center">
                        <img :src="item.src" :alt="item.alt" class="w-full h-64 object-cover rounded-lg" />
                        <p class="text-black text-center mt-1">
                            {{ item.description }}
                        </p>
                    </div>
                </div>
            </UCard>
        </div>

        <div>
            <h2 class="text-black mt-10 mb-4">Sobre o vendedor</h2>
            <p class="text-black">
                Olá! Sou Sophia, uma designer gráfica apaixonada por criar identidades visuais únicas e impactantes. Com
                mais de 5 anos de experiência, ajudo empresas a se destacarem no mercado através de designs criativos e
                personalizados. Vamos trabalhar juntos para transformar suas ideias em realidade!
            </p>
            <div>
                <label v-for="(item, index) in checkbox" :key="index"
                    class="flex items-center gap-2 mt-2 cursor-default select-none">
                    <input type="checkbox" v-model="item.input" disabled class="w-4 h-4 appearance-none border-2 rounded-sm 
                    border-[var(--color-dourado)] 
                    checked: 
                    cursor-not-allowed" />
                    <span class="text-black">{{ item.box }}</span>
                </label>
            </div>
        </div>

        <div class="divide-gray-600 mt-10 mb-5 divide-y"></div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <UCard v-for="(pack, index) in packages" :key="index"
                class="flex flex-col justify-between border border-[var(--color-dourado)] p-4">
                <div>
                    <!-- Título -->
                    <h2 class="text-lg font-bold mb-2 text-black">{{ pack.title }}</h2>

                    <!-- Descrição -->
                    <p class="text-gray-600 mb-4">{{ pack.description }}</p>

                    <!-- Checkboxes -->
                    <div class="mb-4">
                        <label v-for="(item, index) in pack.features" :key="index"
                            class="flex items-center gap-2 mt-2 cursor-default select-none">

                            <input type="checkbox" v-model="item.input" disabled class="w-4 h-4 appearance-none border-2 rounded-sm 
                                border-[var(--color-dourado)]
                                cursor-not-allowed" />

                            <span class="text-black">{{ item.box }}</span>
                        </label>

                    </div>

                    <!-- Informações extras -->
                    <div class="flex justify-between text-sm text-gray-500 mb-4">
                        <div>
                            <p class="font-medium text-[var(--color-dourado)]">Prazo de entrega</p>
                            <p>{{ pack.prazo }}</p>
                        </div>
                        <div>
                            <p class="font-medium text-[var(--color-dourado)]">Revisões inclusas</p>
                            <p>{{ pack.revisoes }}</p>
                        </div>
                    </div>

                    <!-- Preço -->
                    <p class="font-bold text-lg mb-4 text-black">Preço<br />{{ pack.preco }}</p>
                </div>

                <!-- Botões -->
                <div class="mt-auto flex flex-col gap-2 items-center">
                    <UButton color="yellow" class="text-white font-bold border bg-[var(--color-dourado)] px-15 py-2">
                        Contratar</UButton>
                    <UButton class="text-black">Contatar Freelancer</UButton>
                </div>
            </UCard>
        </div>

        <div class="grid justify-items-center">
            <UButton class="mt-10 mb-10 text-white border bg-[var(--color-dourado)] py-5 px-10">Ver mais</UButton>
        </div>
        <section class="space-y-6">
            <!-- Cabeçalho -->
            <div>
                <h2 class="font-bold text-xl text-black">Avaliações</h2>
                <div class="flex items-center gap-4 mt-2">
                    <div class="text-4xl font-bold text-black">{{ rating }}</div>
                    <div class="flex flex-col">
                        <div class="flex text-yellow-400">
                            <UIcon v-for="i in 5" :key="i" name="i-heroicons-star-solid"
                                :class="i <= Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'" />
                        </div>
                        <p class="text-sm text-gray-500">{{ totalReviews }} reviews</p>
                    </div>
                </div>
            </div>

            <!-- Distribuição -->
            <div class="space-y-2">
                <div v-for="item in distribution" :key="item.stars" class="flex items-center gap-2 text-black">
                    <span class="w-4">{{ item.stars }}</span>
                    <div class="flex-1">
                        <UProgress :value="item.percent" :max="100" size="sm" color="[var(--color-dourado)]" class="w-full" />
                    </div>
                    <span class="text-sm text-gray-500">{{ item.percent }}%</span>
                </div>
            </div>

            <!-- Reviews -->
            <div class="space-y-4">
                <UCard v-for="(r, i) in reviews" :key="i" class="p-4">
                    <div class="flex items-center gap-3 mb-2">
                        <UAvatar :src="r.avatar" size="md" />
                        <div>
                            <p class="font-semibold">{{ r.user }}</p>
                            <p class="text-xs text-gray-500">{{ r.date }}</p>
                        </div>
                    </div>
                    <div class="flex text-yellow-400 mb-2">
                        <UIcon v-for="i in 5" :key="i" name="i-heroicons-star-solid"
                            :class="i <= r.stars ? 'text-yellow-400' : 'text-gray-300'" />
                    </div>
                    <p class="text-gray-700">{{ r.text }}</p>
                    <div class="flex items-center gap-2 mt-3 text-sm text-gray-500">
                        <UIcon name="i-heroicons-hand-thumb-up" />
                        {{ r.likes }}
                    </div>
                </UCard>
            </div>
        </section>
    </div>


</template>