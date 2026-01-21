<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})

const state = reactive({
  email: '',
  password: ''
})

const onSubmit = () => {
  // login logic
}
</script>

<template>
  <div
      class="
      min-h-screen
      flex items-center justify-center
      bg-[var(--ui-bg)]
      px-[var(--space-4)]
    "
  >
    <UCard
        class="w-full max-w-md"
        :ui="{
          root: 'bg-[var(--ui-bg-elevated)] ring-1 ring-[var(--ui-border)]'
        }"
    >
      <UForm
          :state="state"
          class="space-y-[var(--space-6)]"
          @submit="onSubmit"
      >
        <!-- TITLE -->
        <div class="text-center space-y-[var(--space-2)]">
          <h1 class="text-xl font-semibold text-[var(--ui-text)]">
            Entre na sua conta
          </h1>
          <p class="text-sm text-[var(--ui-text-muted)]">
            Acesse sua conta para continuar
          </p>
        </div>

        <!-- EMAIL -->
        <UFormField label="Email">
          <UInput
              v-model="state.email"
              type="email"
              placeholder="Digite seu email"
              size="lg"
              class="w-full"
          />
        </UFormField>

        <!-- PASSWORD -->
        <UFormField label="Senha">
          <UInput
              v-model="state.password"
              type="password"
              placeholder="Digite sua senha"
              size="lg"
              class="w-full"
          />
        </UFormField>

        <!-- FORGOT -->
        <div class="flex justify-end">
          <ULink
              to="/recuperar-senha"
              class="text-sm"
          >
            Esqueceu a senha?
          </ULink>
        </div>

        <!-- SUBMIT -->
        <UButton
            type="submit"
            size="lg"
            block
            color="primary"
        >
          Entrar
        </UButton>

        <!-- DIVIDER -->
        <UDivider label="ou" />

        <!-- SIGN UP -->
        <div class="text-center space-y-[var(--space-3)]">
          <p class="text-sm text-[var(--ui-text-muted)]">
            Ainda não tem uma conta?
          </p>

          <UButton
              to="/signup"
              variant="outline"
              size="lg"
              block
          >
            Criar conta
          </UButton>
        </div>
      </UForm>
    </UCard>
  </div>
</template>
