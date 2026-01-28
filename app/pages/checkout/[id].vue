<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

definePageMeta({ layout: 'default' })

const route = useRoute()
const router = useRouter()
const serviceId = route.params.id
const pacoteTipo = (route.query.pacote as string) || 'BASICO'

// --- Interfaces ---
// Remove o 'any' definindo a estrutura esperada
interface PaymentResult {
  type: 'PIX' | 'CARD'
  pix: {
    code: string
    qrImage: string
  }
}

// --- State ---
const step = ref(1)
const loading = ref(false)
const paymentMethod = ref<'PIX' | 'CARD'>('PIX')
const paymentResult = ref<PaymentResult | null>(null)

// --- Dados do Comprador ---
const customer = reactive({ name: '', taxId: '', email: '', phone: '' })

// --- Mock do Gig ---
const gig = ref({
  id: serviceId,
  title: 'Criação de Identidade Visual Minimalista',
  image: '/images/mock-gig-cover.jpg',
  freelancer: { name: 'Bruno Nunes', avatar: '' },
  pacote: {
    tipo: pacoteTipo,
    nome:
        pacoteTipo === 'BASICO'
            ? 'Pacote Básico'
            : pacoteTipo === 'PADRAO'
                ? 'Pacote Padrão'
                : 'Pacote Premium',
    itens: ['Logo Principal', 'Paleta de Cores', 'Arquivos PNG/JPG'],
    prazo: 5,
    preco:
        pacoteTipo === 'BASICO'
            ? 90.0
            : pacoteTipo === 'PADRAO'
                ? 350.0
                : 800.0,
  },
})

// --- Financeiro ---
const finance = computed(() => {
  const amount = gig.value.pacote.preco
  // ESLint fix: 'fee' nunca é reatribuída, usar const
  const fee = amount < 20 ? 0.8 : amount <= 100 ? amount * 0.04 : amount * 0.08
  return { fee, total: amount + fee }
})

// --- Ações ---
const nextStep = () => {
  if (
      step.value === 1 &&
      (!customer.name || !customer.taxId || !customer.email)
  ) {
    alert('Preencha os dados.')
    return
  }
  step.value++
}

// TS fix: Adicionado chaves {} para evitar retorno implícito de number (step.value--)
// O evento @click espera void, não number.
const prevStep = () => {
  step.value--
}

const processPayment = async () => {
  loading.value = true
  try {
    await new Promise((resolve) => setTimeout(resolve, 2000))
    if (paymentMethod.value === 'PIX') {
      paymentResult.value = {
        type: 'PIX',
        pix: {
          code: '000201...',
          qrImage:
              'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=Pix',
        },
      }
      step.value = 3
    } else {
      window.location.href = 'https://abacatepay.com/pay/simulado'
    }
  } finally {
    loading.value = false
  }
}

const confirmPixPayment = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    router.push('/u/orders')
  }, 1500)
}

const money = (val: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
        val
    )
</script>

<template>
  <div class="min-h-screen bg-[var(--ui-bg)] pb-12">
    <header
        class="bg-[var(--ui-bg-elevated)] border-b border-[var(--ui-border)] py-4 sticky top-0 z-20"
    >
      <div class="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <div class="font-bold text-xl flex gap-2 items-center">
          <UIcon name="i-heroicons-lock-closed" class="text-primary" /> Checkout
        </div>
        <div class="flex gap-4 text-sm font-medium">
          <span :class="step >= 1 ? 'text-primary' : 'text-gray-400'"
          >1. Dados</span
          >
          <span :class="step >= 2 ? 'text-primary' : 'text-gray-400'"
          >2. Pagamento</span
          >
          <span :class="step >= 3 ? 'text-primary' : 'text-gray-400'"
          >3. Confirmação</span
          >
        </div>
      </div>
    </header>

    <div
        class="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8"
    >
      <div class="lg:col-span-8 space-y-6">
        <UCard v-if="step === 1">
          <template #header><h3 class="font-bold">Dados de Faturamento</h3></template>
          <div class="grid md:grid-cols-2 gap-4">
            <UFormField label="Nome">
              <UInput v-model="customer.name" class="w-full" />
            </UFormField>
            <UFormField label="CPF/CNPJ">
              <UInput v-model="customer.taxId" class="w-full" />
            </UFormField>
            <UFormField label="Email">
              <UInput v-model="customer.email" class="w-full" />
            </UFormField>
            <UFormField label="Telefone">
              <UInput v-model="customer.phone" class="w-full" />
            </UFormField>
          </div>
          <template #footer>
            <div class="flex justify-end">
              <UButton @click="nextStep" size="lg">Ir para Pagamento</UButton>
            </div>
          </template>
        </UCard>

        <UCard v-if="step === 2">
          <template #header><h3 class="font-bold">Pagamento</h3></template>
          <div class="space-y-4">
            <div
                @click="paymentMethod = 'PIX'"
                class="p-4 border rounded cursor-pointer flex gap-4 items-center"
                :class="
                paymentMethod === 'PIX' ? 'border-primary bg-primary/5' : ''
              "
            >
              <UIcon name="i-heroicons-qr-code" class="w-6 h-6" />
              <div>
                <div class="font-bold">PIX</div>
                <div class="text-xs">Aprovação imediata</div>
              </div>
            </div>
            <div
                @click="paymentMethod = 'CARD'"
                class="p-4 border rounded cursor-pointer flex gap-4 items-center"
                :class="
                paymentMethod === 'CARD' ? 'border-primary bg-primary/5' : ''
              "
            >
              <UIcon name="i-heroicons-credit-card" class="w-6 h-6" />
              <div>
                <div class="font-bold">Cartão de Crédito</div>
                <div class="text-xs">Até 12x</div>
              </div>
            </div>
          </div>
          <template #footer>
            <div class="flex justify-between">
              <UButton variant="ghost" @click="prevStep">Voltar</UButton>
              <UButton
                  color="success"
                  size="lg"
                  :loading="loading"
                  @click="processPayment"
              >Pagar {{ money(finance.total) }}</UButton
              >
            </div>
          </template>
        </UCard>

        <UCard v-if="step === 3" class="border-green-500 text-center py-8">
          <h2 class="text-2xl font-bold mb-4">Escaneie o QR Code</h2>
          <div v-if="paymentResult && paymentResult.pix">
            <img
                :src="paymentResult.pix.qrImage"
                class="mx-auto w-48 mb-4"
            />
            <UInput :model-value="paymentResult.pix.code" readonly />
          </div>
          <UButton
              block
              color="success"
              class="mt-4"
              @click="confirmPixPayment"
              :loading="loading"
          >Já Paguei</UButton
          >
        </UCard>
      </div>

      <div class="lg:col-span-4 space-y-4 sticky top-24 h-fit">
        <UCard>
          <div class="flex gap-3 mb-4">
            <img :src="gig.image" class="w-16 h-12 object-cover rounded" />
            <div>
              <div class="font-bold text-sm line-clamp-2">
                {{ gig.title }}
              </div>
              <div class="text-xs text-gray-500">{{ gig.pacote.nome }}</div>
            </div>
          </div>
          <div class="space-y-2 text-sm border-t pt-4">
            <div class="flex justify-between">
              <span>Subtotal</span><span>{{ money(gig.pacote.preco) }}</span>
            </div>
            <div class="flex justify-between text-gray-500">
              <span>Taxas</span><span>{{ money(finance.fee) }}</span>
            </div>
            <div class="flex justify-between font-bold text-lg pt-2 border-t">
              <span>Total</span><span>{{ money(finance.total) }}</span>
            </div>
          </div>
        </UCard>
        <div class="text-xs text-gray-500 text-center">
          <UIcon name="i-heroicons-shield-check" class="text-green-500" />
          Pagamento seguro via AbacatePay
        </div>
      </div>
    </div>
  </div>
</template>