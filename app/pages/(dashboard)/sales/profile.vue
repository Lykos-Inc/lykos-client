<script>
</script>
<template>
<body>
    <div class="max-w-7xl mx-auto p-6 space-y-8">
    <!-- Header Perfil -->
    <div class="flex justify-between items-start">
      <div class="flex items-center gap-4">
        <img 
          src="../Lykos - Simbolo.png" 
          alt="Foto do usuário" 
          class="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <h1 class="text-xl font-bold">Sophia Carter</h1>
          <p class="text-gray-600">Desenvolvedora Web</p>
          <p class="text-sm text-gray-500">
            San Francisco, CA |  4.9 (120 projects)
          </p>
        </div>
      </div>

      <div class="flex flex-col items-end md:items-start mb-4">
        <button class="bg-yellow-600 text-white px-4 py-2 w-40 rounded-lg mb-4 cursor-pointer">Editar Perfil</button>
        <button class="bg-yellow-600 text-white px-4 py-2 rounded-lg cursor-pointer">Editar Produto</button>
      </div>
    </div>

    <!-- Sobre -->
    <section>
      <h2 class="text-lg font-semibold mb-2">Sobre Sophia</h2>
      <p class="text-gray-700">
        Sou um desenvolvedor web apaixonado, com mais de 5 anos de experiência...
      </p>
    </section>

    <!-- Habilidades -->
    <section>
      <h2 class="text-lg font-semibold mb-3">Habilidades</h2>
      <div class="flex flex-wrap gap-2">
        <span class="px-3 py-1 bg-gray-100 rounded-full text-black">React</span>
        <span class="px-3 py-1 bg-gray-100 rounded-full text-black">Angular</span>
        <span class="px-3 py-1 bg-gray-100 rounded-full text-black">Vue.js</span>
        <span class="px-3 py-1 bg-gray-100 rounded-full text-black">Node.js</span>
        <span class="px-3 py-1 bg-gray-100 rounded-full text-black">Python</span>
      </div>
    </section>

    <!-- Portfolio -->
    <section>
      <h2 class="text-lg font-semibold mb-4">Portfolio</h2>
      <div class="grid md:grid-cols-3 gap-6">
        <div class=" ">
          <img src="../img//Depth 7, Frame 0.png" alt="Projeto" class="w-full h-52 object-cover rounded-md" />
          <div class="p-4">
            <h3 class="font-semibold">Designer Web moderno</h3>
            <p class="text-sm text-gray-600">Um site moderno e responsivo...</p>
          </div>
        </div>

        <div class="">
          <img src="" alt="Projeto" class="w-full h-52 object-cover rounded-md" />
          <div class="pt-4">
            <h3 class="font-semibold">Sites de E-commerce</h3>
            <p class="text-sm text-gray-600">Uma plataforma de e-commerce totalmente funcional com gateway de pagamento seguro.</p>
          </div>
        </div>

        <div class="">
          <img src="" alt="Projeto" class="w-full h-52 object-cover rounded-md" />
          <div class="pt-4">
            <h3 class="font-semibold">Sites de portfólio</h3>
            <p class="text-sm text-gray-600">Um site de portfólio pessoal...</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</body>
</template>
<style>
</style>

/* faz com espaçamento igual do figma, lá tá mais perto da lateral esquerda. Se for fazer assim, no meio
  aumenta o tamanho dos itens para ocupar mais espaco, se não vai ficar estranho a visualização
  vou ver como que faz tema depois, que ai fica mais fácil de do import "@nuxt/ui" não quebrar tudo */

