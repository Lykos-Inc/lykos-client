<script setup lang="ts">
import { reactive, computed, ref, watch } from 'vue'

definePageMeta({
  layout: 'auth'
})

const { register, loading } = useAuth()
const router = useRouter()
const toast = useToast()

// Controle de Etapas
const step = ref(1)
const totalSteps = 3

const stepsLabels = {
  1: 'Conta',
  2: 'Dados Pessoais',
  3: 'Endereço'
}

// Estado do formulário
const state = reactive({
  // Etapa 1
  username: '',
  email: '',
  password: '',
  confirmPassword: '',

  // Etapa 2
  name: '',
  cpf: '',
  birthDate: '',
  phone: '',

  // Etapa 3 (Endereço)
  cep: '',
  logradouro: '',
  numero: '',
  complemento: '',
  cidade: '',
  estado: '', // Sigla UF
  tipoEndereco: 'RESIDENCIAL'
})

// --- Máscaras ---
const masks = {
  cpf: (val: string) => val.replace(/\D/g, '').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})/, '$1-$2').replace(/(-\d{2})\d+?$/, '$1'),
  phone: (val: string) => val.replace(/\D/g, '').replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d)/, '$1-$2').replace(/(-\d{4})\d+?$/, '$1'),
  cep: (val: string) => val.replace(/\D/g, '').replace(/(\d{5})(\d)/, '$1-$2').replace(/(-\d{3})\d+?$/, '$1')
}

watch(() => state.cpf, (val) => { state.cpf = masks.cpf(val) })
watch(() => state.phone, (val) => { state.phone = masks.phone(val) })
watch(() => state.cep, (val) => { state.cep = masks.cep(val) })

// --- Validação ---
const isStep1Valid = computed(() => {
  return state.username.length >= 3 &&
      state.email.includes('@') &&
      state.password.length >= 8 &&
      state.password === state.confirmPassword
})

const isStep2Valid = computed(() => {
  return state.name.length > 3 &&
      state.cpf.length >= 14 &&
      state.birthDate.length > 0 &&
      state.phone.length >= 14
})

const isStep3Valid = computed(() => {
  return state.cep.length >= 9 &&
      state.logradouro.length > 0 &&
      state.numero.length > 0 &&
      state.cidade.length > 0 &&
      state.estado.length === 2
})

// --- Navegação ---
const nextStep = () => {
  if (step.value < totalSteps) step.value++
}

const prevStep = () => {
  if (step.value > 1) step.value--
}

// --- Envio Final ---
const onSubmit = async () => {
  const payload = {
    nome_usuario: state.username,
    email: state.email,
    senha_hash: state.password,
    senha2: state.confirmPassword,
    tipo: 'CLIENTE', // FIXO: Todos nascem como clientes
    pessoa: {
      nome_completo: state.name,
      cpf: state.cpf.replace(/\D/g, ''),
      data_nascimento: state.birthDate,
      telefone: state.phone.replace(/\D/g, '')
    },
    enderecos: [
      {
        tipo: state.tipoEndereco,
        logradouro: state.logradouro,
        numero: state.numero,
        complemento: state.complemento,
        cep: state.cep.replace(/\D/g, ''),
        cidade: state.cidade,
        estado: state.estado.toUpperCase()
      }
    ]
  }

  try {
    await register(payload)
    toast.add({ title: 'Sucesso!', description: 'Sua alcateia te espera. Faça login.', color: 'success' })
    router.push('/login')
  } catch (error: any) {
    console.error('Erro detalhado:', error)
    const errorData = error.response?.data || error
    let msg = 'Erro ao processar cadastro.'

    if (typeof errorData === 'object') {
      const firstKey = Object.keys(errorData)[0]
      const firstError = errorData[firstKey]
      if (Array.isArray(firstError)) msg = `${firstKey}: ${firstError[0]}`
      else if (typeof firstError === 'string') msg = firstError
    }

    toast.add({ title: 'Erro no Cadastro', description: msg, color: 'error' })
  }
}
</script>

<template>
  <div class="min-h-screen flex bg-[var(--ui-bg)]">

    <div class="w-full lg:w-1/2 flex flex-col px-8 sm:px-12 lg:px-16 py-8 overflow-y-auto max-h-screen">
      <div class="max-w-md w-full mx-auto space-y-6 my-auto">

        <NuxtLink to="/" class="flex items-center gap-2 text-[var(--ui-primary)] font-bold text-xl mb-8 w-fit">
          <img src="~/assets/img/Logo.png" alt="lykos" class="h-8"/>
        </NuxtLink>

        <div>
          <h1 class="text-3xl font-bold text-[var(--ui-text)] tracking-tight">Crie sua conta</h1>
          <p class="text-[var(--ui-text-muted)] mt-2">
            Passo {{ step }} de {{ totalSteps }}: <span class="text-[var(--ui-primary)] font-medium">{{ stepsLabels[step] }}</span>
          </p>
          <UProgress :value="(step / totalSteps) * 100" class="mt-4" size="xs" color="primary" />
        </div>

        <form @submit.prevent="step === totalSteps ? onSubmit() : nextStep()">

          <div v-if="step === 1" class="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <UFormField label="Usuário" name="username">
              <UInput v-model="state.username" class="w-full" placeholder="seu_usuario" size="lg" icon="i-heroicons-at-symbol" />
            </UFormField>

            <UFormField label="Email" name="email">
              <UInput v-model="state.email" type="email" class="w-full" placeholder="email@lykos.com" size="lg" icon="i-heroicons-envelope" />
            </UFormField>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <UFormField label="Senha" name="password">
                <UInput v-model="state.password" type="password" placeholder="Mín. 8 caracteres" size="lg" />
              </UFormField>
              <UFormField label="Confirmar" name="confirmPassword">
                <UInput v-model="state.confirmPassword" type="password" class="w-full" placeholder="Repita a senha" size="lg" />
              </UFormField>
            </div>
          </div>

          <div v-if="step === 2" class="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <UFormField label="Nome Completo" name="name">
              <UInput v-model="state.name" class="w-full" placeholder="Nome Civil" size="lg" />
            </UFormField>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <UFormField label="CPF" name="cpf">
                <UInput v-model="state.cpf" class="w-full" placeholder="000.000.000-00" size="lg" />
              </UFormField>
              <UFormField label="Nascimento" name="birthDate">
                <UInput v-model="state.birthDate" class="w-full" type="date" size="lg" />
              </UFormField>
            </div>

            <UFormField label="Celular" name="phone">
              <UInput v-model="state.phone" class="w-full" placeholder="(00) 00000-0000" size="lg" icon="i-heroicons-phone" />
            </UFormField>
          </div>

          <div v-if="step === 3" class="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
            <div class="grid grid-cols-3 gap-4">
              <UFormField label="CEP" name="cep" class="col-span-1">
                <UInput v-model="state.cep" class="w-full" placeholder="00000-000" size="lg" />
              </UFormField>
              <UFormField label="Cidade" name="cidade" class="col-span-2">
                <UInput v-model="state.cidade" class="w-full" placeholder="Ex: São Paulo" size="lg" />
              </UFormField>
            </div>

            <div class="grid grid-cols-3 gap-4">
              <UFormField label="Logradouro" name="logradouro" class="col-span-2">
                <UInput v-model="state.logradouro" class="w-full" placeholder="Rua, Av..." size="lg" />
              </UFormField>
              <UFormField label="Nº" name="numero" class="col-span-1">
                <UInput v-model="state.numero" class="w-full" placeholder="123" size="lg" />
              </UFormField>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <UFormField label="Complemento" name="complemento">
                <UInput v-model="state.complemento" class="w-full" placeholder="Apto 101" size="lg" />
              </UFormField>
              <UFormField label="Estado (UF)" name="estado">
                <UInput v-model="state.estado" placeholder="SP" size="lg" maxlength="2" class="uppercase w-full" />
              </UFormField>
            </div>
          </div>

          <div class="pt-6 flex gap-3">
            <UButton
                v-if="step > 1"
                @click="prevStep"
                color="neutral"
                variant="soft"
                size="xl"
                class="flex-1"
            >
              Voltar
            </UButton>

            <UButton
                v-if="step < totalSteps"
                @click="nextStep"
                :disabled="(step === 1 && !isStep1Valid) || (step === 2 && !isStep2Valid)"
                color="primary"
                size="xl"
                class="flex-1 font-bold"
            >
              Próximo
            </UButton>

            <UButton
                v-if="step === totalSteps"
                type="submit"
                :loading="loading"
                :disabled="loading || !isStep3Valid"
                color="primary"
                size="xl"
                class="flex-1 font-bold"
            >
              {{ loading ? 'Finalizando...' : 'Criar Conta' }}
            </UButton>
          </div>

        </form>

        <div class="text-center pt-4 border-t border-[var(--ui-border)]">
          <p class="text-sm text-[var(--ui-text-muted)]">
            Já tem conta? <NuxtLink to="/login" class="font-bold text-[var(--ui-primary)]">Entrar</NuxtLink>
          </p>
        </div>

      </div>
    </div>

    <div class="hidden lg:flex lg:w-1/2 relative bg-gray-900 sticky top-0 h-screen">
      <div class="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2084')] bg-cover bg-center opacity-40"></div>
      <div class="absolute inset-0 bg-gradient-to-br from-[var(--ui-primary)]/80 to-purple-900/80 mix-blend-multiply"></div>
      <div class="relative z-10 flex flex-col justify-end h-full p-16 text-white">
        <h2 class="text-4xl font-bold font-serif mb-4">Entre para a Alcateia.</h2>
        <p class="text-white/70">Onde profissionais vorazes encontram grandes oportunidades.</p>
      </div>
    </div>

  </div>
</template>