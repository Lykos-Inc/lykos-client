<script setup lang="ts">
import { reactive, watch } from 'vue'
import * as v from 'valibot'
import type { FormSubmitEvent } from '#ui/types'

definePageMeta({
  layout: 'auth'
})



// --- Validação (Alinhada com o Backend) ---
const schema = v.object({
  name: v.pipe(v.string(), v.minLength(1, 'Nome completo é obrigatório')),
  username: v.pipe(v.string(), v.minLength(3, 'Usuário deve ter no mínimo 3 caracteres')),
  email: v.pipe(v.string(), v.email('Email inválido')),
  birthDate: v.pipe(v.string(), v.minLength(10, 'Data de nascimento obrigatória')),
  cpf: v.pipe(v.string(), v.minLength(11, 'CPF inválido (mínimo 11 números)')),
  phone: v.pipe(v.string(), v.minLength(10, 'Telefone inválido')),
  password: v.pipe(v.string(), v.minLength(8, 'A senha deve ter no mínimo 8 caracteres')),
  confirmPassword: v.pipe(v.string(), v.minLength(1, 'Confirmação de senha é obrigatória'))
})

type Schema = v.InferOutput<typeof schema>

// Estado do formulário
const state = reactive({
  name: '',
  username: '',
  email: '',
  birthDate: '',
  cpf: '',
  phone: '',
  password: '',
  confirmPassword: ''
})

// --- Formatação Visual (Máscaras simples) ---
const formatCPF = (value: string) => {
  return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1')
}

const formatPhone = (value: string) => {
  return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d{5})(\d)/, '$1-$2')
      .replace(/(-\d{4})\d+?$/, '$1')
}

// Observadores para aplicar máscaras
watch(() => state.cpf, (val) => { state.cpf = formatCPF(val) })
watch(() => state.phone, (val) => { state.phone = formatPhone(val) })


const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  if (state.password !== state.confirmPassword) {
    alert('As senhas não coincidem')
    return
  }

  const payload = {
    nome_usuario: state.username,
    email: state.email,
    senha_hash: state.password,
    senha2: state.confirmPassword,
    tipo: 'CLIENTE',
    pessoa: {
      nome_completo: state.name,
      cpf: state.cpf.replace(/\D/g, ''),
      data_nascimento: state.birthDate,
      telefone: state.phone.replace(/\D/g, '')
    }
  }

  try {
    console.log('Enviando Payload para API:', payload)
    // Simula tempo de rede
    await new Promise(resolve => setTimeout(resolve, 1500))
    alert('Cadastro simulado com sucesso! Verifique o console.')
    navigateTo('/login')
  } catch (error) {
    console.error('Erro no cadastro:', error)
  }
}
</script>

<template>
  <div class="min-h-screen flex bg-[var(--ui-bg)]">

    <div class="w-full lg:w-1/2 flex flex-col px-8 sm:px-12 lg:px-16 py-8 overflow-y-auto max-h-screen">

      <div class="max-w-md w-full mx-auto space-y-6 my-auto">

        <NuxtLink to="/" class="flex items-center gap-2 text-[var(--ui-primary)] font-bold text-xl mb-8 w-fit">
          <img src="~/assets/img/Logo.png"  alt="lykos"/>
        </NuxtLink>

        <div>
          <h1 class="text-3xl font-bold text-[var(--ui-text)] tracking-tight">Crie sua conta</h1>
          <p class="text-[var(--ui-text-muted)] mt-2">
            Junte-se à nossa comunidade de profissionais.
          </p>
        </div>

        <UForm :schema="schema" :state="state" class="space-y-6" @submit="onSubmit">

          <div class="space-y-4">
            <h3 class="text-xs font-bold uppercase text-[var(--ui-text-muted)] tracking-wider mb-3">
              Credenciais
            </h3>

            <UFormField label="Nome de Usuário" name="username">
              <UInput v-model="state.username" placeholder="@seu_usuario" size="lg" class="w-full" icon="i-heroicons-at-symbol" />
            </UFormField>

            <UFormField label="Email" name="email">
              <UInput v-model="state.email" type="email" placeholder="exemplo@lykos.com" size="lg" class="w-full" icon="i-heroicons-envelope" />
            </UFormField>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <UFormField label="Senha" name="password">
                <UInput v-model="state.password" type="password" placeholder="Mínimo 8 caracteres" size="lg" class="w-full" />
              </UFormField>

              <UFormField label="Confirmar Senha" name="confirmPassword">
                <UInput v-model="state.confirmPassword" type="password" placeholder="Repita a senha" size="lg" class="w-full" />
              </UFormField>
            </div>
          </div>

          <UDivider />

          <div class="space-y-4">
            <h3 class="text-xs font-bold uppercase text-[var(--ui-text-muted)] tracking-wider mb-3">
              Dados Pessoais
            </h3>

            <UFormField label="Nome Completo" name="name">
              <UInput v-model="state.name" placeholder="Nome igual ao documento" size="lg" class="w-full" />
            </UFormField>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <UFormField label="CPF" name="cpf">
                <UInput v-model="state.cpf" placeholder="000.000.000-00" size="lg" class="w-full" />
              </UFormField>

              <UFormField label="Data de Nascimento" name="birthDate">
                <UInput v-model="state.birthDate" type="date" size="lg" class="w-full" />
              </UFormField>
            </div>

            <UFormField label="Telefone / WhatsApp" name="phone">
              <UInput v-model="state.phone" placeholder="(00) 00000-0000" size="lg" class="w-full" />
            </UFormField>
          </div>

          <div class="pt-2">
            <UButton type="submit" size="xl" block color="primary" class="font-bold w-full">
              Criar conta
            </UButton>

            <p class="text-xs text-center text-[var(--ui-text-muted)] mt-4">
              Ao se cadastrar, você concorda com nossos <a href="#" class="underline hover:text-[var(--ui-primary)]">Termos de Serviço</a>.
            </p>
          </div>

        </UForm>

        <div class="text-center pt-4 border-t border-[var(--ui-border)]">
          <p class="text-sm text-[var(--ui-text-muted)]">
            Já tem uma conta?
            <NuxtLink to="/login" class="font-bold text-[var(--ui-primary)] hover:underline">
              Fazer Login
            </NuxtLink>
          </p>
        </div>

      </div>
    </div>

    <div class="hidden lg:flex lg:w-1/2 relative bg-gray-900 overflow-hidden sticky top-0 h-screen">

      <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
      <div class="absolute inset-0 bg-gradient-to-br from-[var(--ui-primary)]/80 to-purple-900/80 mix-blend-multiply"></div>

      <div class="relative z-10 flex flex-col justify-between h-full p-16 text-white">
        <div class="flex justify-end">
        </div>

        <div class="space-y-6 max-w-lg">
          <div class="text-4xl font-bold font-serif leading-tight">
            Entre para alcateia, venha exercer o instinto de Lykos!
          </div>
        </div>

        <div class="flex gap-6 text-sm text-white/50">
          <span>© {{ currentYear }} Lykos Inc.</span>
        </div>
      </div>

    </div>

  </div>
</template>