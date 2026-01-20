<template>
    <div class="container flex flex-col items-center justify-center min-h-screen py-2">
        <h1>Bem-vindo</h1>
        <NuxtLink to="/usuario/cadastro">Criar Conta</NuxtLink>
        <NuxtLink to="/freelancer/criar">Criar cadastro freelancer</NuxtLink>
        <NuxtLink to="/freelancer/perfil">Perfil Freelancer</NuxtLink>
        <NuxtLink to="/usuario/perfil">Perfil Freelancer</NuxtLink>
        <NuxtLink to="/usuario/pagamento">Perfil Freelancer</NuxtLink>
        <NuxtLink to="/freelancer/PacoteServicos">Criar Projeto</NuxtLink>
        <NuxtLink to="/usuario/login">Login</NuxtLink>
        <NuxtLink to="/usuario/produto">Produtos</NuxtLink>
        <NuxtLink to="/freelancer/produto">Produto</NuxtLink>
        <NuxtLink to="/usuario/inicio">Inicio</NuxtLink>
        <NuxtLink to="/usuario/inicio-logado">Home logado</NuxtLink>

      <button class="mt-4" @click="toggleTheme">Theme Mode</button>
    </div>
</template>

<script setup>
const colorMode = useColorMode()

function toggleTheme() {
  colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
}
</script>