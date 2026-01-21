<script setup lang="ts">
import * as v from 'valibot'
import type { FormSubmitEvent } from '#ui/types'

definePageMeta({
  layout: 'auth'
})

const schema = v.object({
  name: v.pipe(v.string(), v.minLength(1, 'Nome é obrigatório')),
  username: v.pipe(v.string(), v.minLength(1, 'Nome de usuário é obrigatório')),
  email: v.pipe(v.string(), v.email('Email inválido')),
  password: v.pipe(v.string(), v.minLength(8, 'A senha deve ter no mínimo 8 caracteres')),
  confirmPassword: v.pipe(v.string(), v.minLength(1, 'Confirmação de senha é obrigatória'))
})

type Schema = v.InferOutput<typeof schema>

const state = reactive({
  name: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const onSubmit = (event: FormSubmitEvent<Schema>) => {
  if (state.password !== state.confirmPassword) {
    // Dica: Em um cenário real, você injetaria um erro no formulário aqui
    alert('As senhas não coincidem')
    return
  }

  console.log('Dados validados:', event.data)
  // Lógica de cadastro aqui...
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
      <!-- Header -->
      <template #header>
        <div class="text-center space-y-2">
          <h1 class="text-2xl font-semibold text-[var(--ui-text)]">
            Crie sua conta
          </h1>
          <p class="text-sm text-[var(--ui-text-muted)]">
            Preencha os dados para começar
          </p>
        </div>
      </template>

      <!-- Form -->
      <UForm
          :schema="schema"
          :state="state"
          class="space-y-[var(--space-6)]"
          @submit="onSubmit"
      >
        <!-- EMAIL -->
        <UFormField label="Nome Completo">
          <UInput
              v-model="state.name"
              type="email"
              placeholder="Digite seu Nome"
              size="lg"
              class="w-full"
          />
        </UFormField>

        <!-- EMAIL -->
        <UFormField label="Nome de Usuário">
          <UInput
              v-model="state.username"
              type="email"
              placeholder="Digite seu nome de usuário"
              size="lg"
              class="w-full"
          />
        </UFormField>


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

        <!-- PASSWORD -->
        <UFormField label="Senha">
          <UInput
              v-model="state.confirmPassword"
              type="password"
              placeholder="Digite sua senha"
              size="lg"
              class="w-full"
          />
        </UFormField>

        <!-- SUBMIT -->
        <UButton
            type="submit"
            size="lg"
            block
            color="primary"
        >
          Criar conta
        </UButton>

        <!-- DIVIDER -->
        <UDivider label="ou" />

        <!-- SIGN UP -->
        <div class="text-center space-y-[var(--space-3)]">
          <p class="text-sm text-[var(--ui-text-muted)]">
            Já tem uma conta?
          </p>

          <UButton
              to="/login"
              variant="outline"
              size="lg"
              block
              class="my-[var(space-4)]"
          >
            Entrar
          </UButton>
        </div>

      </UForm>
    </UCard>
  </div>
</template>
