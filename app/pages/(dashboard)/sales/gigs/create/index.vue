<script setup lang="ts">
import {reactive, ref, computed} from 'vue'

definePageMeta({
  layout: 'default',
})

// --- Mocks de Dados ---
const categoriasMock = [
  {id: 1, label: 'Design Gráfico'},
  {id: 2, label: 'Desenvolvimento Web'},
  {id: 3, label: 'Marketing Digital'},
  {id: 4, label: 'Redação e Tradução'}
]

const subcategoriasMock = [
  {id: 10, categoria_id: 1, label: 'Logo Design'},
  {id: 11, categoria_id: 1, label: 'Identidade Visual'},
  {id: 12, categoria_id: 2, label: 'Wordpress'},
  {id: 13, categoria_id: 2, label: 'Front-end'}
]

// --- State ---
const state = reactive({
  titulo: '',
  categoria: null as { id: number; label: string } | null,
  subcategoria: null as { id: number; label: string } | null,
  tags: [] as string[],
  descricao: '',
  imagemCapa: null as File | null,

  // Nova estrutura para 3 níveis de pacotes
  pacotes: {
    basico: {
      preco: undefined as number | undefined,
      prazo: undefined as number | undefined,
      revisoes: 1,
      descricao: ''
    },
    padrao: {
      preco: undefined as number | undefined,
      prazo: undefined as number | undefined,
      revisoes: 2,
      descricao: ''
    },
    premium: {
      preco: undefined as number | undefined,
      prazo: undefined as number | undefined,
      revisoes: 3,
      descricao: ''
    }
  }
})

// --- Lógica de Filtro ---
const subcategoriasFiltradas = computed(() => {
  if (!state.categoria) return []
  return subcategoriasMock.filter(s => s.categoria_id === state.categoria?.id)
})

// --- Upload ---
const handleFileChange = (e: FileList) => {
  if (e.length > 0) {
    state.imagemCapa = e[0]
  }
}

// --- Submit ---
const onSubmit = async () => {
  // Validações básicas (exemplo simplificado)
  if (!state.titulo) return alert('Título é obrigatório')
  if (!state.subcategoria) return alert('Subcategoria é obrigatória')
  if (!state.pacotes.basico.preco) return alert('Preço do pacote básico é obrigatório')

  // Montando o Payload para o Catalog Service (Backend espera array de pacotes)
  const payload = {
    titulo: state.titulo,
    subcategoria_id: state.subcategoria.id,
    descricao: state.descricao,
    pacotes: [
      {
        tipo: 'BASICO',
        nome: 'Básico',
        descricao: state.pacotes.basico.descricao || 'Pacote inicial',
        preco: state.pacotes.basico.preco,
        prazo_entrega_dias: state.pacotes.basico.prazo,
        revisoes: state.pacotes.basico.revisoes
      },
      {
        tipo: 'PADRAO', // Backend: PADRAO = Intermediário
        nome: 'Intermediário',
        descricao: state.pacotes.padrao.descricao || 'Pacote padrão',
        preco: state.pacotes.padrao.preco,
        prazo_entrega_dias: state.pacotes.padrao.prazo,
        revisoes: state.pacotes.padrao.revisoes
      },
      {
        tipo: 'PREMIUM', // Backend: PREMIUM = Avançado
        nome: 'Avançado',
        descricao: state.pacotes.premium.descricao || 'Pacote completo',
        preco: state.pacotes.premium.preco,
        prazo_entrega_dias: state.pacotes.premium.prazo,
        revisoes: state.pacotes.premium.revisoes
      }
    ]
  }

  console.log('Payload Catalog Service:', JSON.stringify(payload, null, 2))
}
</script>

<template>
  <div class="max-w-5xl mx-auto p-[var(--space-6)] space-y-[var(--space-8)]">

    <div>
      <h1 class="text-3xl font-bold text-[var(--ui-text)]">Criar Novo Serviço</h1>
      <p class="text-[var(--ui-text-muted)]">Preencha os detalhes para publicar seu Gig</p>
    </div>

    <form @submit.prevent="onSubmit" class="space-y-[var(--space-8)]">

      <UCard :ui="{ root: 'bg-[var(--ui-bg-elevated)] ring-1 ring-[var(--ui-border)]' }">
        <template #header>
          <h3 class="font-semibold text-[var(--ui-text)]">Visão Geral</h3>
        </template>

        <div class="space-y-[var(--space-4)]">
          <UFormField label="Título do Serviço" help="Seja claro e direto (ex: Eu vou criar seu logo profissional)">
            <UInput
                v-model="state.titulo"
                placeholder="Eu vou..."
                size="lg"
                class="w-full"
            />
          </UFormField>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-[var(--space-4)]">
            <UFormField label="Categoria">
              <USelectMenu
                  v-model="state.categoria"
                  :options="categoriasMock"
                  option-attribute="label"
                  placeholder="Selecione..."
                  searchable
                  class="w-full"
              />
            </UFormField>

            <UFormField label="Subcategoria">
              <USelectMenu
                  v-model="state.subcategoria"
                  :options="subcategoriasFiltradas"
                  option-attribute="label"
                  placeholder="Selecione..."
                  :disabled="!state.categoria"
                  class="w-full"
              />
            </UFormField>
          </div>

          <UFormField label="Tags de Busca">
            <UInputMenu
                v-model="state.tags"
                :options="['Design', 'Logo', 'Minimalista', 'Web', 'SEO']"
                placeholder="Adicione tags (Enter)"
                multiple
                class="w-full"
            />
          </UFormField>
        </div>
      </UCard>

      <UCard :ui="{ root: 'bg-[var(--ui-bg-elevated)] ring-1 ring-[var(--ui-border)]' }">
        <template #header>
          <h3 class="font-semibold text-[var(--ui-text)]">Descrição e Mídia</h3>
        </template>

        <div class="space-y-[var(--space-4)]">
          <UFormField label="Descrição Detalhada">
            <UTextarea
                v-model="state.descricao"
                :rows="8"
                placeholder="Descreva o que você oferece, metodologias e diferenciais..."
                class="w-full"
            />
          </UFormField>

          <UFormField label="Imagem de Capa">
            <div
                class="border-2 border-dashed border-[var(--ui-border)] rounded-lg p-8 flex flex-col items-center justify-center text-center hover:bg-[var(--ui-bg-hover)] transition">
              <input type="file" id="coverUpload" class="hidden" @change="(e) => handleFileChange(e.target.files)"
                     accept="image/*">
              <label for="coverUpload" class="cursor-pointer w-full">
                <div v-if="state.imagemCapa" class="text-[var(--ui-success)] font-medium">
                  Arquivo selecionado: {{ state.imagemCapa.name }}
                </div>
                <div v-else class="space-y-2">
                  <UIcon name="i-heroicons-photo" class="w-10 h-10 text-[var(--ui-text-muted)] mx-auto"/>
                  <p class="text-[var(--ui-primary)] font-medium">Clique para carregar a capa</p>
                </div>
              </label>
            </div>
          </UFormField>
        </div>
      </UCard>

      <UCard :ui="{ root: 'bg-[var(--ui-bg-elevated)] ring-1 ring-[var(--ui-border)]' }">
        <template #header>
          <h3 class="font-semibold text-[var(--ui-text)]">Planos e Preços</h3>
        </template>

        <div class="grid grid-cols-4 gap-4 items-center">

          <div class="font-bold text-[var(--ui-text-muted)]"></div>
          <div class="font-bold text-center text-[var(--ui-text)] p-2 rounded">Básico</div>
          <div class="font-bold text-center text-[var(--ui-text)] p-2 rounded">Intermediário</div>
          <div class="font-bold text-center text-[var(--ui-text)] p-2 rounded">Avançado</div>

          <div class="font-medium text-[var(--ui-text)]">Preço (R$)</div>
          <UInput v-model="state.pacotes.basico.preco" type="number" placeholder="0" class="w-full"/>
          <UInput v-model="state.pacotes.padrao.preco" type="number" placeholder="0" class="w-full"/>
          <UInput v-model="state.pacotes.premium.preco" type="number" placeholder="0" class="w-full"/>

          <div class="font-medium text-[var(--ui-text)]">Prazo (Dias)</div>
          <UInput v-model="state.pacotes.basico.prazo" type="number" placeholder="1" class="w-full"/>
          <UInput v-model="state.pacotes.padrao.prazo" type="number" placeholder="1" class="w-full"/>
          <UInput v-model="state.pacotes.premium.prazo" type="number" placeholder="1" class="w-full"/>

          <div class="font-medium text-[var(--ui-text)]">Revisões</div>
          <UInput v-model="state.pacotes.basico.revisoes" type="number" placeholder="1" class="w-full"/>
          <UInput v-model="state.pacotes.padrao.revisoes" type="number" placeholder="2" class="w-full"/>
          <UInput v-model="state.pacotes.premium.revisoes" type="number" placeholder="3" class="w-full"/>

          <div class="font-medium text-[var(--ui-text)] self-start mt-2">O que está incluso</div>
          <UTextarea v-model="state.pacotes.basico.descricao" placeholder="Ex.: Logo Principal
Paleta de Cores
Arquivos PNG" :rows="6" class="w-full"/>
          <UTextarea v-model="state.pacotes.padrao.descricao" placeholder="Ex.: Tudo do Básico
Logo Secundário
Tipografia
Capa LinkedIn" :rows="6" class="w-full"/>
          <UTextarea v-model="state.pacotes.premium.descricao" placeholder="Ex.: Tudo do Intermediário
Manual da Marca
Cartão de Visita
Suporte Prioritário" :rows="6" class="w-full"/>

        </div>
      </UCard>

      <div class="flex justify-end gap-[var(--space-4)]">
        <UButton variant="ghost" to="/dashboard/sales/gigs">Cancelar</UButton>
        <UButton type="submit" size="xl" color="primary">Publicar Serviço</UButton>
      </div>

    </form>
  </div>
</template>