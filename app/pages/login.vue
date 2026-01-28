<script setup lang="ts">
import { reactive } from 'vue'

definePageMeta({
  layout: 'auth'
})

// Importa a lógica de autenticação
const { login, loading } = useAuth()
const router = useRouter()
const toast = useToast()

const showSocial = ref(false) // Mude para true quando configurar Google

const form = reactive({
  email: '',
  password: ''
})

const handleLogin = async () => {
  try {
    // Mapeia os dados do formulário para o formato que a interface LoginPayload espera
    await login({
      email: form.email,
      password: form.password
    })

    // Sucesso
    toast.add({
      title: 'Bem-vindo de volta!',
      description: 'Login realizado com sucesso.',
      color: 'success',
      icon: 'i-heroicons-check-circle'
    })

    // Redireciona para a home ou dashboard
    await navigateTo('/home')

  } catch (error: any) {
    console.error('Erro Login:', error)

    // Tratamento de erro específico para Login
    let msg = 'Falha ao entrar.'

    // O dj-rest-auth costuma retornar { "non_field_errors": ["Unable to log in..."] }
    if (error.non_field_errors) {
      msg = 'E-mail ou senha incorretos.'
    } else if (error.detail) {
      msg = error.detail
    }

    toast.add({
      title: 'Acesso Negado',
      description: msg,
      color: 'error',
      icon: 'i-heroicons-exclamation-circle'
    })
  }
}

const handleGoogleLogin = () => {
  console.log('Em breve...')
}
</script>

<template>
  <div class="min-h-screen flex bg-[var(--ui-bg)]">

    <div class="w-full lg:w-1/2 flex flex-col justify-center px-8 sm:px-12 lg:px-24 py-12">

      <div class="max-w-md w-full mx-auto space-y-8">

        <NuxtLink to="/" class="flex items-center gap-2 text-[var(--ui-primary)] font-bold text-xl mb-8 w-fit">
          <img src="~/assets/img/Logo.png" alt="lykos" class="h-8"/>
        </NuxtLink>

        <div>
          <h1 class="text-3xl font-bold text-[var(--ui-text)] tracking-tight">Bem-vindo de volta</h1>
          <p class="text-[var(--ui-text-muted)] mt-2">
            Insira suas credenciais para acessar sua conta.
          </p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">

          <UFormField label="Email">
            <UInput
                v-model="form.email"
                type="email"
                size="lg"
                class="w-full"
                placeholder="seu@email.com"
                autofocus
                icon="i-heroicons-envelope"
                :ui="{ icon: { trailing: { pointer: '' } } }"
            />
          </UFormField>

          <UFormField label="Senha">
            <UInput
                v-model="form.password"
                type="password"
                size="lg"
                class="w-full"
                placeholder="••••••••"
                icon="i-heroicons-lock-closed"
            />
            <template #hint>
              <NuxtLink to="/auth/forgot-password" class="text-xs font-medium text-[var(--ui-primary)] hover:underline">
                Esqueceu a senha?
              </NuxtLink>
            </template>
          </UFormField>

          <UButton
              type="submit"
              block
              size="xl"
              color="primary"
              :loading="loading"
              :disabled="loading"
              class="font-bold w-full"
          >
            {{ loading ? 'Entrando...' : 'Entrar' }}
          </UButton>
        </form>

        <div v-if="showSocial" class="space-y-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-[var(--ui-border)]"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-[var(--ui-bg)] text-[var(--ui-text-muted)]">Ou entre com</span>
            </div>
          </div>

          <UButton
              block
              color="neutral"
              variant="outline"
              icon="i-simple-icons-google"
              label="Continuar com Google"
              class="w-full"
              @click="handleGoogleLogin"
          />
        </div>

        <p class="text-center text-sm text-[var(--ui-text-muted)]">
          Não tem uma conta?
          <NuxtLink to="/signup" class="font-bold text-[var(--ui-primary)] hover:underline">
            Cadastre-se gratuitamente
          </NuxtLink>
        </p>

      </div>
    </div>

    <div class="hidden lg:flex lg:w-1/2 relative bg-[var(--ui-primary)] overflow-hidden sticky top-0 h-screen">

      <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
      <div class="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent"></div>

      <div class="relative z-10 flex flex-col justify-center h-full p-16 text-white">
        <div class="flex justify-center"></div>

        <div class="space-y-6 max-w-lg">
          <div class="text-4xl font-bold font-serif leading-tight">
            Contrate direto. Contrate certo. Com o instinto de Lykos.
          </div>
        </div>
      </div>

    </div>

  </div>
</template>