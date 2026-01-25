<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'

definePageMeta({
  layout: 'default'
})

const route = useRoute()
const router = useRouter()
const serviceId = route.params.id
const pacoteTipo = route.query.pacote as string || 'BASICO'

// --- State ---
const step = ref(1) // 1: Detalhes, 2: Pagamento, 3: Conclusão
const loading = ref(false)
const paymentMethod = ref<'PIX' | 'CARD'>('PIX')
const paymentResult = ref<any>(null)

// --- Dados do Comprador ---
const customer = reactive({
  name: '',
  taxId: '', // CPF/CNPJ
  email: '',
  phone: ''
})

// --- Mock do Gig ---
const gig = ref({
  id: serviceId,
  title: 'Criação de Identidade Visual Minimalista',
  image: '/images/mock-gig-cover.jpg',
  freelancer: {
    name: 'Bruno Nunes',
    avatar: '',
    level: 'Nível 2'
  },
  pacote: {
    tipo: pacoteTipo,
    nome: pacoteTipo === 'BASICO' ? 'Pacote Básico' : (pacoteTipo === 'PADRAO' ? 'Pacote Padrão' : 'Pacote Premium'),
    descricao: 'Logo principal, paleta de cores e arquivos em alta resolução.',
    itens: ['Logo Principal', 'Paleta de Cores', 'Arquivos PNG/JPG'],
    prazo: 5,
    revisoes: 2,
    preco: pacoteTipo === 'BASICO' ? 90.00 : (pacoteTipo === 'PADRAO' ? 350.00 : 800.00)
  }
})

// --- Lógica Financeira ---
const finance = computed(() => {
  const amount = gig.value.pacote.preco
  const GATEWAY_FIXED_FEE = 0.80

  let fee = 0
  let label = ''

  if (amount < 20) {
    fee = GATEWAY_FIXED_FEE
    label = 'Taxa de Processamento'
  } else {
    let pct = 0.10
    if (amount <= 100) pct = 0.04
    else if (amount <= 400) pct = 0.06
    else if (amount <= 700) pct = 0.08

    fee = amount * pct
    label = `Taxa de Serviço (${(pct * 100).toFixed(0)}%)`
  }

  return {
    fee,
    label,
    total: amount + fee
  }
})

// --- Ações ---

const nextStep = () => {
  if (step.value === 1) {
    if (!customer.name || !customer.taxId || !customer.email) {
      alert('Por favor, preencha seus dados de faturamento.')
      return
    }
    const cleanDoc = customer.taxId.replace(/\D/g, '')
    if (cleanDoc.length < 11) return alert('CPF/CNPJ inválido')
  }
  step.value++
}

const prevStep = () => step.value--

const processPayment = async () => {
  loading.value = true

  try {
    await new Promise(resolve => setTimeout(resolve, 2000))

    if (paymentMethod.value === 'PIX') {
      paymentResult.value = {
        type: 'PIX',
        pix: {
          code: '00020126580014br.gov.bcb.pix0136123e4567-e89b-12d3-a456-426614174000520400005303986540510.005802BR5913AbacatePay6008Brasilia62070503***6304E2CA',
          qrImage: 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=ExemploPixAbacatePay'
        }
      }
      step.value = 3
    } else {
      window.location.href = 'https://abacatepay.com/pay/simulado_secure_checkout'
    }

  } catch (err) {
    alert('Erro ao processar. Tente novamente.')
  } finally {
    loading.value = false
  }
}

const confirmPixPayment = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    router.push('/dashboard/purchases')
  }, 1500)
}

const money = (val: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val)
</script>

<template>
  <div class="min-h-screen bg-[var(--ui-bg)] pb-12">

    <header class="bg-[var(--ui-bg-elevated)] border-b border-[var(--ui-border)] py-4 sticky top-0 z-20">
      <div class="max-w-6xl mx-auto px-4 flex justify-between items-center">
        <div class="flex items-center gap-2 text-xl font-bold text-[var(--ui-text)]">
          <UIcon name="i-heroicons-lock-closed" class="w-6 h-6 text-[var(--ui-primary)]" />
          Checkout Seguro
        </div>

        <div class="hidden md:flex items-center gap-4 text-sm font-medium">
          <div class="flex items-center gap-2" :class="step >= 1 ? 'text-[var(--ui-primary)]' : 'text-[var(--ui-text-muted)]'">
            <div class="w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs"
                 :class="step >= 1 ? 'border-[var(--ui-primary)] bg-[var(--ui-primary)] text-white' : 'border-gray-400'">1</div>
            Dados
          </div>
          <div class="w-8 h-px bg-[var(--ui-border)]"></div>
          <div class="flex items-center gap-2" :class="step >= 2 ? 'text-[var(--ui-primary)]' : 'text-[var(--ui-text-muted)]'">
            <div class="w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs"
                 :class="step >= 2 ? 'border-[var(--ui-primary)] bg-[var(--ui-primary)] text-white' : 'border-gray-400'">2</div>
            Pagamento
          </div>
          <div class="w-8 h-px bg-[var(--ui-border)]"></div>
          <div class="flex items-center gap-2" :class="step >= 3 ? 'text-[var(--ui-primary)]' : 'text-[var(--ui-text-muted)]'">
            <div class="w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs"
                 :class="step >= 3 ? 'border-[var(--ui-primary)] bg-[var(--ui-primary)] text-white' : 'border-gray-400'">3</div>
            Confirmação
          </div>
        </div>
      </div>
    </header>

    <div class="max-w-6xl mx-auto px-4 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">

        <div class="lg:col-span-8 space-y-6">

          <div v-show="step === 1" class="animate-fade-in">
            <h2 class="text-2xl font-bold text-[var(--ui-text)] mb-6">Dados de Faturamento</h2>

            <UCard :ui="{ root: 'bg-[var(--ui-bg-elevated)] ring-1 ring-[var(--ui-border)] shadow-sm' }">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6 p-2">
                <UFormField label="Nome Completo / Razão Social" required class="col-span-2">
                  <UInput v-model="customer.name" size="lg" icon="i-heroicons-user" placeholder="Como consta no documento" />
                </UFormField>

                <UFormField label="CPF ou CNPJ" required>
                  <UInput v-model="customer.taxId" size="lg" icon="i-heroicons-identification" placeholder="000.000.000-00" />
                </UFormField>

                <UFormField label="Celular / WhatsApp" required>
                  <UInput v-model="customer.phone" size="lg" icon="i-heroicons-phone" placeholder="(00) 00000-0000" />
                </UFormField>

                <UFormField label="Email para Contato" required class="col-span-2">
                  <UInput v-model="customer.email" size="lg" icon="i-heroicons-envelope" placeholder="seu@email.com" />
                </UFormField>
              </div>

              <template #footer>
                <div class="flex justify-end">
                  <UButton size="xl" color="primary" trailing-icon="i-heroicons-arrow-right" @click="nextStep">
                    Ir para Pagamento
                  </UButton>
                </div>
              </template>
            </UCard>
          </div>

          <div v-show="step === 2" class="animate-fade-in">
            <h2 class="text-2xl font-bold text-[var(--ui-text)] mb-6">Escolha como pagar</h2>

            <UCard :ui="{ root: 'bg-[var(--ui-bg-elevated)] ring-1 ring-[var(--ui-border)] shadow-sm' }">
              <div class="space-y-4">

                <div
                    class="relative flex items-center gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md"
                    :class="paymentMethod === 'PIX' ? 'border-[var(--ui-primary)] bg-[var(--ui-primary)]/5' : 'border-[var(--ui-border)]'"
                    @click="paymentMethod = 'PIX'"
                >
                  <div class="flex items-center justify-center w-6 h-6 rounded-full border-2"
                       :class="paymentMethod === 'PIX' ? 'border-[var(--ui-primary)]' : 'border-gray-400'">
                    <div v-if="paymentMethod === 'PIX'" class="w-3 h-3 rounded-full bg-[var(--ui-primary)]"></div>
                  </div>

                  <div class="flex-1">
                    <div class="font-bold text-[var(--ui-text)] text-lg flex items-center gap-2">
                      <UIcon name="i-heroicons-qr-code" /> PIX
                    </div>
                    <div class="text-sm text-[var(--ui-text-muted)]">Aprovação imediata, 24/7.</div>
                  </div>

                  <UBadge color="green" variant="subtle" label="Mais Rápido" />
                </div>

                <div
                    class="relative flex items-center gap-4 p-5 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md"
                    :class="paymentMethod === 'CARD' ? 'border-[var(--ui-primary)] bg-[var(--ui-primary)]/5' : 'border-[var(--ui-border)]'"
                    @click="paymentMethod = 'CARD'"
                >
                  <div class="flex items-center justify-center w-6 h-6 rounded-full border-2"
                       :class="paymentMethod === 'CARD' ? 'border-[var(--ui-primary)]' : 'border-gray-400'">
                    <div v-if="paymentMethod === 'CARD'" class="w-3 h-3 rounded-full bg-[var(--ui-primary)]"></div>
                  </div>

                  <div class="flex-1">
                    <div class="font-bold text-[var(--ui-text)] text-lg flex items-center gap-2">
                      <UIcon name="i-heroicons-credit-card" /> Cartão de Crédito
                    </div>
                    <div class="text-sm text-[var(--ui-text-muted)]">Parcele em até 12x. Processado em ambiente seguro.</div>
                  </div>

                  <div class="flex gap-1 opacity-60">
                    <div class="w-8 h-5 bg-gray-300 rounded"></div>
                    <div class="w-8 h-5 bg-gray-300 rounded"></div>
                  </div>
                </div>

              </div>

              <template #footer>
                <div class="flex justify-between items-center">
                  <UButton variant="ghost" icon="i-heroicons-arrow-left" @click="prevStep">Voltar</UButton>

                  <div class="text-right">
                    <UButton
                        size="xl"
                        color="green"
                        icon="i-heroicons-lock-closed"
                        :loading="loading"
                        @click="processPayment"
                    >
                      Pagar {{ money(finance.total) }}
                    </UButton>
                    <p class="text-xs text-[var(--ui-text-muted)] mt-2 flex items-center justify-end gap-1">
                      <UIcon name="i-heroicons-shield-check" class="text-green-500" />
                      Pagamento processado por AbacatePay
                    </p>
                  </div>
                </div>
              </template>
            </UCard>
          </div>

          <div v-if="step === 3" class="animate-fade-in">
            <UCard :ui="{ root: 'bg-[var(--ui-bg-elevated)] ring-1 ring-[var(--ui-border)] border-green-500 shadow-lg' }">
              <div class="text-center py-8">
                <h2 class="text-2xl font-bold text-[var(--ui-text)] mb-2">Escaneie para pagar</h2>
                <p class="text-[var(--ui-text-muted)]">Abra o app do seu banco e escaneie o QR Code abaixo.</p>

                <div class="my-6 flex justify-center">
                  <div class="p-4 bg-white rounded-xl shadow-inner border border-gray-200 inline-block">
                    <img :src="paymentResult.pix.qrImage" class="w-64 h-64 mix-blend-multiply" />
                  </div>
                </div>

                <div class="max-w-md mx-auto space-y-4">
                  <div class="flex gap-2">
                    <UInput :model-value="paymentResult.pix.code" readonly class="flex-1" />
                    <UButton icon="i-heroicons-clipboard-document" color="gray">Copiar</UButton>
                  </div>

                  <UButton block size="lg" color="green" :loading="loading" @click="confirmPixPayment">
                    Já realizei o pagamento
                  </UButton>
                </div>
              </div>
            </UCard>
          </div>

        </div>

        <div class="lg:col-span-4">
          <div class="sticky top-24 space-y-6">

            <UCard :ui="{ root: 'bg-[var(--ui-bg-elevated)] ring-1 ring-[var(--ui-border)] shadow-sm' }">
              <template #header>
                <h3 class="font-bold text-[var(--ui-text)]">Resumo do Pedido</h3>
              </template>

              <div class="flex gap-3 mb-4">
                <img :src="gig.image" class="w-20 h-16 object-cover rounded border border-[var(--ui-border)]" />
                <div>
                  <h4 class="font-bold text-sm text-[var(--ui-text)] line-clamp-2">{{ gig.title }}</h4>
                  <p class="text-xs text-[var(--ui-text-muted)] mt-1">{{ gig.pacote.nome }}</p>
                </div>
              </div>

              <ul class="space-y-2 mb-6 text-sm text-[var(--ui-text-muted)]">
                <li v-for="item in gig.pacote.itens" :key="item" class="flex items-start gap-2">
                  <UIcon name="i-heroicons-check" class="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  <span>{{ item }}</span>
                </li>
                <li class="flex items-start gap-2 font-medium">
                  <UIcon name="i-heroicons-clock" class="w-4 h-4 text-[var(--ui-primary)] shrink-0 mt-0.5" />
                  <span>Entrega em {{ gig.pacote.prazo }} dias</span>
                </li>
              </ul>

              <UDivider class="my-4" />

              <div class="space-y-2 text-sm">
                <div class="flex justify-between text-[var(--ui-text)]">
                  <span>Subtotal</span>
                  <span>{{ money(gig.pacote.preco) }}</span>
                </div>
                <div class="flex justify-between text-[var(--ui-text-muted)]">
                  <span class="flex items-center gap-1" title="Taxa para manter a plataforma segura e operacional">
                    {{ finance.label }}
                    <UIcon name="i-heroicons-information-circle" class="w-4 h-4 text-gray-400" />
                  </span>
                  <span>{{ money(finance.fee) }}</span>
                </div>
              </div>

              <UDivider class="my-4" />

              <div class="flex justify-between items-center">
                <span class="font-bold text-lg text-[var(--ui-text)]">Total</span>
                <span class="font-bold text-2xl text-[var(--ui-text)]">{{ money(finance.total) }}</span>
              </div>
            </UCard>

            <div class="bg-[var(--ui-bg-elevated)] p-4 rounded-lg border border-[var(--ui-border)] flex gap-3 items-start">
              <UIcon name="i-heroicons-shield-check" class="w-6 h-6 text-green-500 shrink-0" />
              <div class="text-sm">
                <p class="font-bold text-[var(--ui-text)]">Compra Garantida</p>
                <p class="text-[var(--ui-text-muted)] mt-1">
                  O pagamento fica retido conosco e só é liberado para o vendedor após você aprovar a entrega.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.4s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>