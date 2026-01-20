<template>
    <div class="w-full min-h-screen bg-white ">
        <!-- HERO -->
        <section class="w-full bg-cover bg-center py-50 px-6" :style="{ backgroundImage: `url(${heroBg})` }">
            <div class="max-w-6xl mx-auto text-center text-white">
                <h1 class="text-3xl md:text-5xl font-bold leading-tight">Encontre o serviço freelance
                    ideal<br>imediatamente</h1>
                <div class="mt-6 flex justify-center gap-5">
                    <div class="relative w-6/12">
                        <input type="text" placeholder="Search..."
                            class=" w-full bg-white border border-[var(--color-dourado)] rounded text-[var(--color-dourado)] placeholder-[var(--color-dourado)] pl-12 py-3 focus:outline-none focus:ring-2 focus:ring-[var(--color-dourado)]" />
                    </div>

                    <button class="bg-yellow-400 text-withe px-6 py-3 rounded">Pesquisar</button>
                </div>
            </div>
        </section>

        <!-- O que você procura -->
        <section class="py-12 px-6">
            <div class="max-w-6xl mx-auto text-center">
                <h2 class="text-2xl font-semibold mb-8 text-black">O que você procura?</h2>
                <div class="flex flex-wrap justify-center gap-4">
                    <div
                        class="px-4 py-2 border-b-2 rounded cursor-pointer hover:bg-gray-100 text-[var(--color-dourado)]">
                        Criação de Logotipo</div>
                    <div
                        class="px-4 py-2 border-b-2 rounded cursor-pointer hover:bg-gray-100 text-[var(--color-dourado)]">
                        Marketing</div>
                    <div
                        class="px-4 py-2 border-b-2 rounded cursor-pointer hover:bg-gray-100 text-[var(--color-dourado)]">
                        Branding</div>
                    <div
                        class="px-4 py-2 border-b-2 rounded cursor-pointer hover:bg-gray-100 text-[var(--color-dourado)]">
                        Mídias Sociais</div>
                    <div
                        class="px-4 py-2 border-b-2 rounded cursor-pointer hover:bg-gray-100 text-[var(--color-dourado)]">
                        Design</div>
                </div>
            </div>
        </section>

        <!-- Serviços Populares -->
        <section class="py-12 px-6 bg-gray-50">
            <div class="max-w-6xl mx-auto">
                <h2 class="text-center text-2xl font-semibold mb-8 text-black">Serviços populares</h2>

                <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <u-card v-for="i in 8" :key="i" class="p-0 overflow-hidden">
                        <img :src="popularImages[i - 1]" class="w-full h-32 object-cover" />

                        <div class="p-4">
                            <h3 class="text-lg font-semibold text-black mb-1">
                                Serviço {{ i }}
                            </h3>

                            <p class="text-sm text-gray-600">
                                Coloque aqui a descrição do serviço {{ i }}.
                            </p>
                        </div>
                    </u-card>
                </div>


            </div>
        </section>

        <!-- Como funciona -->
        <div class="max-w-3xl mx-auto py-10 space-y-10">
            <h2 class="text-3xl font-bold text-center text-black">
                Como funciona o trabalho freelance
            </h2>

            <div class="space-y-10">

                <!-- Bloco 1 -->
                <div class="flex gap-4 items-start">
                    <UIcon name="i-heroicons-magnifying-glass" class="w-8 h-8 text-black" />
                    <div>
                        <h3 class=" text-black">Encontre o freelancer ideal</h3>
                        <p class="text-[var(--color-dourado)]">
                            Navegue pelos freelancers por serviço, classificação e preço
                        </p>
                    </div>
                </div>

                <!-- Bloco 2 -->
                <div class="flex gap-4 items-start">
                    <UIcon name="i-heroicons-chat-bubble-left-right" class="w-8 h-8 text-black" />
                    <div>
                        <h3 class="text-black">Realize o trabalho</h3>
                        <p class="text-[var(--color-dourado)]">
                            Colabore facilmente com freelancers usando nossa plataforma
                        </p>
                    </div>
                </div>

                <!-- Bloco 3 -->
                <div class="flex gap-4 items-start">
                    <UIcon name="i-heroicons-credit-card" class="w-8 h-8 text-black" />
                    <div>
                        <h3 class="text-black">Pague quando estiver satisfeito</h3>
                        <p class="text-[var(--color-dourado)]">
                            Libere o pagamento assim que aprovar o trabalho
                        </p>
                    </div>
                </div>

            </div>
        </div>

        <div class="max-w-7xl mx-auto py-12">
            <h2 class="text-3xl text-black text-center mb-10">
                Por que escolher nossa plataforma?
            </h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">

                <!-- Card 1 -->
                <div class="border border-gray-300 rounded-xl p-6 h-full flex flex-col">
                    <UIcon name="i-heroicons-users" class="w-7 h-7 mb-4 text-black" />
                    <h3 class="text-black text-lg mb-2">Ampla Variedade de Talentos</h3>
                    <p class="text-gray-500 leading-relaxed">
                        Acesse uma vasta gama de profissionais qualificados em diversas áreas, prontos para atender às
                        suas necessidades.
                    </p>
                </div>

                <!-- Card 2 -->
                <div class="border border-gray-300 rounded-xl p-6 h-full flex flex-col">
                    <UIcon name="i-heroicons-list-bullet" class="w-7 h-7 mb-4 text-black" />
                    <h3 class="text-black  text-lg mb-2">Processo Simplificado</h3>
                    <p class="text-gray-500 leading-relaxed">
                        Encontre e contrate freelancers de forma rápida e eficiente, com um processo intuitivo e sem
                        complicações.
                    </p>
                </div>

                <!-- Card 3 -->
                <div class="border border-gray-300 rounded-xl p-6 h-full flex flex-col">
                    <UIcon name="i-heroicons-shield-check" class="w-7 h-7 mb-4 text-black" />
                    <h3 class="text-black  text-lg mb-2">Pagamentos Seguros e Flexíveis</h3>
                    <p class="text-gray-500 leading-relaxed">
                        Realize pagamentos de forma segura e com diversas opções, garantindo tranquilidade em suas
                        transações.
                    </p>
                </div>

                <!-- Card 4 -->
                <div class="border border-gray-300 rounded-xl p-6 h-full flex flex-col">
                    <UIcon name="i-heroicons-headphones" class="w-7 h-7 mb-4 text-black" />
                    <h3 class="text-black  text-lg mb-2">Suporte Especializado</h3>
                    <p class="text-gray-500 leading-relaxed">
                        Conte com uma equipe de suporte dedicada para auxiliar em todas as etapas, desde a contratação
                        até a conclusão do projeto.
                    </p>
                </div>

                <!-- Card 5 -->
                <div class="border border-gray-300 rounded-xl p-6 h-full flex flex-col">
                    <UIcon name="i-heroicons-user-group" class="w-7 h-7 mb-4 text-black" />
                    <h3 class="text-black text-lg mb-2">Ferramentas de Colaboração</h3>
                    <p class="text-gray-500 leading-relaxed">
                        Utilize ferramentas integradas para facilitar a comunicação e o acompanhamento do projeto,
                        garantindo colaboração eficiente.
                    </p>
                </div>

            </div>
        </div>
        <div class="max-w-6xl mx-auto py-12">

            <!-- Título -->
            <h2 class="text-4xl font-extrabold text-center text-black mb-4">
                Encontre o freelancer ideal para o seu projeto
            </h2>

            <!-- Subtítulo -->
            <p class="text-center text-black/70 max-w-3xl mx-auto mb-12">
                Nossa plataforma conecta você a freelancers qualificados prontos para dar vida às suas ideias.
            </p>

            <!-- Cards -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                <!-- Card 1 -->
                <div class="border border-gray-200 rounded-xl p-6 h-full flex flex-col">
                    <UIcon name="i-heroicons-globe-alt" class="w-8 h-8 mb-4 text-black" />

                    <h3 class="font-semibold text-lg text-black mb-2">
                        Um mundo de talentos freelance ao seu alcance
                    </h3>

                    <p class="text-black/70 leading-relaxed">
                        Encontre o freelancer ideal para qualquer projeto, desde design de sites até redação de
                        conteúdo.
                    </p>
                </div>

                <!-- Card 2 -->
                <div class="border border-gray-200 rounded-xl p-6 h-full flex flex-col">
                    <UIcon name="i-heroicons-shield-check" class="w-8 h-8 mb-4 text-black" />

                    <h3 class="font-semibold text-lg text-black mb-2">
                        Trabalho de qualidade, garantido
                    </h3>

                    <p class="text-black/70 leading-relaxed">
                        Garantimos trabalho de alta qualidade com nosso sistema de classificação e processo de revisão.
                    </p>
                </div>

                <!-- Card 3 -->
                <div class="border border-gray-200 rounded-xl p-6 h-full flex flex-col">
                    <UIcon name="i-heroicons-lock-closed" class="w-8 h-8 mb-4 text-black" />

                    <h3 class="font-semibold text-lg text-black mb-2">
                        Pagamentos seguros, sempre
                    </h3>

                    <p class="text-black/70 leading-relaxed">
                        Seus pagamentos são protegidos até que você aprove o trabalho.
                    </p>
                </div>

                <!-- Card 4 -->
                <div class="border border-gray-200 rounded-xl p-6 h-full flex flex-col">
                    <UIcon name="i-heroicons-phone"" class=" w-8 h-8 mb-4 text-black" />

                    <h3 class="font-semibold text-lg text-black mb-2">
                        Suporte 24 horas por dia
                    </h3>

                    <p class="text-black/70 leading-relaxed">
                        Nossa equipe de suporte está disponível 24 horas por dia para ajudá-lo com quaisquer dúvidas ou
                        preocupações.
                    </p>
                </div>

            </div>

            <div class="max-w-5xl mx-auto py-16 space-y-16">

                <!-- Freelance Pro -->
                <h2 class="text-center text-2xl font-bold text-black">Freelance Pro</h2>

                <div class="border rounded-xl p-8 mx-auto max-w-3xl border-[color:var(--color-dourado)]">
                    <h3 class="text-black font-bold text-lg mb-2 text-center">
                        Junte-se ao Freelance Pro
                    </h3>

                    <p class="text-black/70 text-center mb-6">
                        Tenha acesso a ferramentas premium, suporte prioritário e oportunidades exclusivas.
                        Desbloqueie benefícios e recursos exclusivos para elevar sua carreira freelance.
                    </p>

                    <div class="flex justify-center">
                        <button class="px-5 py-2 rounded-lg text-sm font-semibold text-white"
                            style="background-color: var(--color-dourado);">
                            Explore o Pro
                        </button>
                    </div>
                </div>

                <!-- Perguntas Frequentes -->
                <h2 class="text-center text-2xl font-bold text-black">Perguntas Frequentes</h2>

                <div class="space-y-3">
                    <!-- FAQ ITEM 1 -->
                    <details class="border border-gray-200 rounded-lg p-4 text-black">
                        <summary class="cursor-pointer flex justify-between items-center text-black">
                            Como encontro o freelancer ideal?
                            <UIcon name="i-heroicons-chevron-down" class="w-5 h-5 text-black" />
                        </summary>
                        <p class="mt-3 text-black/70">
                            Você pode encontrar freelancers utilizando filtros de categoria, preço e avaliações.
                        </p>
                    </details>

                    <!-- FAQ ITEM 2 -->
                    <details class="border border-gray-200 rounded-lg p-4 text-black">
                        <summary class="cursor-pointer flex justify-between items-center text-black">
                            Quais métodos de pagamento vocês aceitam?
                            <UIcon name="i-heroicons-chevron-down" class="w-5 h-5 text-black" />
                        </summary>
                        <p class="mt-3 text-black/70">
                            Aceitamos cartões, Pix e outras formas seguras de pagamento.
                        </p>
                    </details>

                    <!-- FAQ ITEM 3 -->
                    <details class="border border-gray-200 rounded-lg p-4 text-black">
                        <summary class="cursor-pointer flex justify-between items-center text-black">
                            E se eu não estiver satisfeito com o trabalho?
                            <UIcon name="i-heroicons-chevron-down" class="w-5 h-5 text-black" />
                        </summary>
                        <p class="mt-3 text-black/70">
                            Você só libera o pagamento quando aprovar o serviço.
                        </p>
                    </details>
                </div>

                <!-- Categorias Populares -->
                <h2 class="text-center text-2xl font-bold text-black">Categorias Populares</h2>

                <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 justify-center">

                    <!-- Categoria 1 -->
                    <div class="border border-gray-200 rounded-xl p-4 flex items-center gap-2 justify-center">
                        <UIcon name="i-heroicons-pencil-square" class="w-5 h-5 text-black" />
                        <span class="text-black font-medium">Redação</span>
                    </div>

                    <!-- Categoria 2 -->
                    <div class="border border-gray-200 rounded-xl p-4 flex items-center gap-2 justify-center">
                        <UIcon name="i-heroicons-code-bracket" class="w-5 h-5 text-black" />
                        <span class="text-black font-medium">Programação</span>
                    </div>

                    <!-- Categoria 3 -->
                    <div class="border border-gray-200 rounded-xl p-4 flex items-center gap-2 justify-center">
                        <UIcon name="i-heroicons-video-camera" class="w-5 h-5 text-black" />
                        <span class="text-black font-medium">Vídeo e Animação</span>
                    </div>

                    <!-- Categoria 4 -->
                    <div class="border border-gray-200 rounded-xl p-4 flex items-center gap-2 justify-center">
                        <UIcon name="i-heroicons-megaphone" class="w-5 h-5 text-black" />
                        <span class="text-black font-medium">Marketing Digital</span>
                    </div>

                    <!-- Categoria 5 -->
                    <div class="border border-gray-200 rounded-xl p-4 flex items-center gap-2 justify-center">
                        <UIcon name="i-heroicons-briefcase" class="w-5 h-5 text-black" />
                        <span class="text-black font-medium">Negócios</span>
                    </div>

                    <!-- Categoria 6 -->
                    <div class="border border-gray-200 rounded-xl p-4 flex items-center gap-2 justify-center">
                        <UIcon name="i-heroicons-camera" class="w-5 h-5 text-black" />
                        <span class="text-black font-medium">Fotografia</span>
                    </div>
                </div>

                <!-- Footer simples -->
                <footer class="text-center text-black/70 mt-12 space-y-4">

                    <div class="flex justify-center gap-10 text-sm text-black/60">
                        <span>Sobre</span>
                        <span>Carreiras</span>
                        <span>Imprensa e Notícias</span>
                        <span>Parcerias</span>
                        <span>Política de Privacidade</span>
                    </div>

                    <div class="text-black/70">Termos de Serviço</div>

                    <div class="flex justify-center gap-6 text-black">
                        <UIcon name="i-heroicons-twitter" class="w-5 h-5" />
                        <UIcon name="i-heroicons-facebook" class="w-5 h-5" />
                        <UIcon name="i-heroicons-instagram" class="w-5 h-5" />
                        <UIcon name="i-heroicons-linkedin" class="w-5 h-5" />
                    </div>

                    <p class="text-black/60">@2024 Premium</p>

                </footer>
            </div>

        </div>


    </div>
</template>

<script>
export default {
    name: 'LandingPage',
    data() {
        return {
            heroBg: 'https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1600&q=80',
            popularImages: [
                'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1520975918318-3bbad62d2b5d?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&w=800&q=80',
                'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80'
            ]
        }
    }
}
</script>

<style></style>
