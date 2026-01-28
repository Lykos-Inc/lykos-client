<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="bg-[var(--ui-bg)] border-t border-[var(--ui-border)]">
    <div
        class="
        mx-auto my-[var(--space-7)] max-w-7xl
        px-[var(--space-6)]
        py-[var(--space-10)]
        grid grid-cols-1 md:grid-cols-4
        gap-[var(--space-8)]
      "
    >
      <!-- BRAND -->
      <div class="space-y-[var(--space-3)]">
        <img src="/assets/img/Logo.png" class="h-8" />
        <p class="text-sm text-[var(--ui-text-muted)]">
          Conectando talentos a oportunidades reais.
        </p>
      </div>

      <!-- PRODUTO -->
      <div>
        <h4 class="text-lg my-[var(--space-6)] font-semibold mb-[var(--space-3)]">
          Produto
        </h4>
        <ul class="flex flex-col gap-[var(--space-2)]">
          <li><ULink to="/explorar">Explorar</ULink></li>
          <li><ULink to="/freelancer/criar">Torne-se um freelancer</ULink></li>
          <li><ULink to="/precos">Preços</ULink></li>
        </ul>
      </div>

      <!-- EMPRESA -->
      <div>
        <h4 class="text-lg my-[var(--space-6)] font-semibold mb-[var(--space-3)]">
          Empresa
        </h4>
        <ul class="flex flex-col gap-[var(--space-2)]">
          <li><ULink to="/sobre">Sobre</ULink></li>
          <li><ULink to="/blog">Blog</ULink></li>
          <li><ULink to="/carreiras">Carreiras</ULink></li>
        </ul>
      </div>

      <!-- LEGAL -->
      <div>
        <h4 class="text-lg my-[var(--space-6)] font-semibold mb-[var(--space-3)]">
          Legal
        </h4>
        <ul class="flex flex-col gap-[var(--space-2)]">
          <li><ULink to="/termos">Termos de uso</ULink></li>
          <li><ULink to="/privacidade">Privacidade</ULink></li>
          <li><ULink to="/cookies">Cookies</ULink></li>
        </ul>
      </div>
    </div>

    <UDivider />

    <!-- BOTTOM -->
    <div
        class="
        mx-auto max-w-7xl
        px-[var(--space-6)]
        py-[var(--space-4)]
        flex flex-col md:flex-row
        items-center justify-between
        gap-[var(--space-3)]
      "
    >
      <span class="text-xs text-[var(--ui-text-muted)]">
        © {{ year }} Lykos. Todos os direitos reservados.
      </span>

      <div class="flex gap-[var(--space-2)]">
        <UButton
            variant="ghost"
            size="xs"
            to="#"
        >
          Twitter
        </UButton>

        <UButton
            variant="ghost"
            size="xs"
            to="#"
        >
          LinkedIn
        </UButton>

        <UButton
            variant="ghost"
            size="xs"
            to="#"
        >
          Instagram
        </UButton>
      </div>
    </div>
  </footer>
</template>
