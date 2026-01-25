<script setup lang="ts">
import {ref, reactive} from 'vue'

definePageMeta({
  layout: 'default',
})

// --- Enums & Opções ---
const niveisIdioma = [
  {label: 'Básico', value: 'BASICO'},
  {label: 'Intermediário', value: 'INTERMEDIARIO'},
  {label: 'Avançado', value: 'AVANCADO'},
  {label: 'Fluente', value: 'FLUENTE'},
  {label: 'Nativo', value: 'NATIVO'}
]

const sugestoesSkillsBase = [
  'React', 'Angular', 'Vue.js', 'Node.js', 'Python', 'Java',
  'TypeScript', 'PHP', 'C#', 'Go', 'Swift', 'Kotlin', 'SQL', 'Docker'
]

const sugestoesIdiomasBase = [
  'Português', 'Inglês', 'Espanhol', 'Francês', 'Alemão', 'Italiano'
]

// --- State do Formulário Final (Payload) ---
const form = reactive({
  nome_exibicao: '',
  bio: '',
  foto_perfil: null as File | null,
  idiomas: [] as { idioma: string; nivel: string }[],
  habilidades: [] as { nome: string }[],
  formacoes: [] as { titulo: string; instituicao: string; ano_conclusao: string }[]
})

// --- State Temporário (Inputs de Adição) ---
const temp = reactive({
  skillInput: '',
  idiomaInput: '',
  idiomaNivel: 'BASICO',
  formacao: {
    titulo: '',
    instituicao: '',
    ano: ''
  }
})

// --- Métodos de Habilidades ---
const adicionarSkill = (valor?: string) => {
  const nome = (valor || temp.skillInput).trim()
  if (!nome) return

  // Evita duplicatas
  if (!form.habilidades.some(h => h.nome.toLowerCase() === nome.toLowerCase())) {
    form.habilidades.push({nome})
  }
  temp.skillInput = ''
}

const removerSkill = (index: number) => {
  form.habilidades.splice(index, 1)
}

// --- Métodos de Idiomas ---
const adicionarIdioma = (valor?: string) => {
  const idiomaNome = (valor || temp.idiomaInput).trim()
  if (!idiomaNome) return

  // Evita duplicatas de idioma (independente do nível)
  if (!form.idiomas.some(i => i.idioma.toLowerCase() === idiomaNome.toLowerCase())) {
    form.idiomas.push({
      idioma: idiomaNome,
      nivel: temp.idiomaNivel
    })
  }
  temp.idiomaInput = ''
  temp.idiomaNivel = 'BASICO' // Reset
}

const removerIdioma = (index: number) => {
  form.idiomas.splice(index, 1)
}

// --- Métodos de Formação ---
const adicionarFormacao = () => {
  const {titulo, instituicao, ano} = temp.formacao
  if (!titulo || !instituicao || !ano) {
    alert('Preencha todos os campos da formação')
    return
  }

  form.formacoes.push({
    titulo,
    instituicao,
    ano_conclusao: ano
  })

  // Reset
  temp.formacao.titulo = ''
  temp.formacao.instituicao = ''
  temp.formacao.ano = ''
}

const removerFormacao = (index: number) => {
  form.formacoes.splice(index, 1)
}

// --- Upload de Foto ---
const handleFileUpload = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files.length > 0) {
    form.foto_perfil = target.files[0]
  }
}

// --- Envio ---
const handleSubmit = async () => {
  // Validação simples
  if (!form.nome_exibicao) return alert('Nome de exibição obrigatório')
  if (!form.bio) return alert('Bio obrigatória')
  if (form.habilidades.length === 0) return alert('Adicione pelo menos uma habilidade')
  if (form.idiomas.length === 0) return alert('Adicione pelo menos um idioma')

  // JSON Final para o Backend
  const payload = {
    nome_exibicao: form.nome_exibicao,
    bio: form.bio,
    idiomas: form.idiomas,      // Já está no formato [{idioma, nivel}]
    habilidades: form.habilidades, // Já está no formato [{nome}]
    formacoes: form.formacoes   // Já está no formato lista
  }

  console.log('Payload pronto para envio:', JSON.stringify(payload, null, 2))

  // Exemplo de envio com FormData se for mandar a foto junto:
  /*
  const formData = new FormData()
  formData.append('data', JSON.stringify(payload))
  if (form.foto_perfil) formData.append('foto_perfil', form.foto_perfil)
  await $fetch('/api/freelancers', { method: 'POST', body: formData })
  */
}
</script>

<template>
  <div class="min-h-screen bg-[var(--ui-bg)] p-[var(--space-4)] flex justify-center">
    <div class="w-full max-w-3xl">

      <div class="mb-[var(--space-6)] text-center">
        <h1 class="text-3xl font-bold text-[var(--ui-text)]">Torne-se um Freelancer</h1>
        <p class="text-[var(--ui-text-muted)]">Complete seu perfil profissional para começar a vender</p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-[var(--space-6)]">

        <UCard :ui="{ root: 'bg-[var(--ui-bg-elevated)] ring-1 ring-[var(--ui-border)]' }">
          <div class="space-y-[var(--space-4)]">

            <div class="flex flex-col items-center p-4 border-2 border-dashed border-[var(--ui-border)] rounded-lg">
              <div v-if="form.foto_perfil" class="mb-2 text-[var(--ui-primary)] font-bold">
                {{ form.foto_perfil.name }}
              </div>
              <div v-else class="text-[var(--ui-text-muted)] mb-2">Nenhuma foto selecionada</div>

              <label
                  class="cursor-pointer bg-[var(--ui-bg)] text-[var(--ui-primary)] px-4 py-2 rounded border border-[var(--ui-primary)] hover:bg-[var(--ui-primary)] hover:text-white transition">
                Selecionar Foto
                <input type="file" class="hidden" accept="image/*" @change="handleFileUpload"/>
              </label>
            </div>

            <UFormField label="Nome de Exibição (Público)" required>
              <UInput v-model="form.nome_exibicao" placeholder="Ex: Bruno Nunes Dev" size="lg"/>
            </UFormField>

            <UFormField label="Bio / Sobre Mim" required>
              <UTextarea v-model="form.bio" :rows="4"
                         placeholder="Conte um pouco sobre sua experiência e o que você oferece..."/>
            </UFormField>
          </div>
        </UCard>

        <UCard :ui="{ root: 'bg-[var(--ui-bg-elevated)] ring-1 ring-[var(--ui-border)]' }">
          <template #header>
            <h3 class="font-semibold text-[var(--ui-text)]">Competências</h3>
          </template>

          <div class="space-y-[var(--space-6)]">

            <div>
              <label class="block text-sm font-medium text-[var(--ui-text)] mb-2">Habilidades Técnicas</label>
              <div class="flex gap-2 mb-2">
                <UInputMenu
                    v-model="temp.skillInput"
                    :options="sugestoesSkillsBase"
                    placeholder="Digite ou selecione (ex: Python)"
                    class="flex-1"
                    @keydown.enter.prevent="adicionarSkill()"
                    trailing-icon="i-heroicons-chevron-up-down-20-solid"
                />
                <UButton icon="i-heroicons-plus" color="primary" variant="soft" @click="adicionarSkill()"/>
              </div>

              <div class="flex flex-wrap gap-2 mt-2">
                <span v-for="(skill, index) in form.habilidades" :key="index"
                      class="inline-flex items-center px-3 py-1 rounded-full text-sm bg-[var(--ui-bg)] text-[var(--ui-primary)] border border-[var(--ui-primary)]">
                  {{ skill.nome }}
                  <button type="button" class="ml-2 text-red-500 hover:text-red-700 font-bold"
                          @click="removerSkill(index)">×</button>
                </span>
              </div>
            </div>

            <UDivider/>

            <div>
              <label class="block text-sm font-medium text-[var(--ui-text)] mb-2">Idiomas</label>
              <div class="flex gap-2 items-start"> <div class="flex-1">
                <UInputMenu
                    v-model="temp.idiomaInput"
                    :options="sugestoesIdiomasBase"
                    placeholder="Idioma (ex: Inglês)"
                    @keydown.enter.prevent="adicionarIdioma()"
                    trailing-icon="i-heroicons-chevron-up-down-20-solid"
                />
              </div>

                <div class="w-1/3">
                  <USelectMenu
                      v-model="temp.idiomaNivel"
                      :options="niveisIdioma"
                      option-attribute="label"
                      value-attribute="value"
                      placeholder="Nível"
                  />
                </div>

                <UButton icon="i-heroicons-plus" color="primary" variant="soft" @click="adicionarIdioma()" />
              </div>

              <ul class="mt-4 space-y-2">
                <li v-for="(item, index) in form.idiomas" :key="index"
                    class="flex justify-between items-center bg-[var(--ui-bg)] p-2 rounded border border-[var(--ui-border)]">
                  <div>
                    <span class="font-bold text-[var(--ui-text)]">{{ item.idioma }}</span>
                    <span class="text-xs text-[var(--ui-text-muted)] ml-2">({{ niveisIdioma.find(n => n.value === item.nivel)?.label }})</span>
                  </div>
                  <button type="button" class="text-red-500 hover:text-red-700 text-sm" @click="removerIdioma(index)">Remover</button>
                </li>
              </ul>
            </div>

          </div>
        </UCard>

        <UCard :ui="{ root: 'bg-[var(--ui-bg-elevated)] ring-1 ring-[var(--ui-border)]' }">
          <template #header>
            <h3 class="font-semibold text-[var(--ui-text)]">Formação Acadêmica</h3>
          </template>

          <div class="space-y-[var(--space-4)] p-4 bg-[var(--ui-bg)] rounded-lg border border-[var(--ui-border)] mb-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <UFormField label="Curso / Título">
                <UInput v-model="temp.formacao.titulo" placeholder="Ex: Ciência da Computação"/>
              </UFormField>
              <UFormField label="Instituição">
                <UInput v-model="temp.formacao.instituicao" placeholder="Ex: USP"/>
              </UFormField>
            </div>
            <div class="flex items-end gap-4">
              <UFormField label="Ano de Conclusão" class="w-1/3">
                <UInput v-model="temp.formacao.ano" placeholder="Ex: 2022"/>
              </UFormField>
              <UButton label="Adicionar Formação" color="white" variant="solid" @click="adicionarFormacao" block
                       class="flex-1"/>
            </div>
          </div>

          <div v-if="form.formacoes.length > 0" class="space-y-3">
            <div v-for="(edu, index) in form.formacoes" :key="index"
                 class="flex justify-between items-start border-b border-[var(--ui-border)] pb-2 last:border-0">
              <div>
                <p class="font-bold text-[var(--ui-text)]">{{ edu.titulo }}</p>
                <p class="text-sm text-[var(--ui-text-muted)]">{{ edu.instituicao }} - {{ edu.ano_conclusao }}</p>
              </div>
              <button type="button" class="text-red-500 text-sm hover:underline" @click="removerFormacao(index)">
                Excluir
              </button>
            </div>
          </div>
          <p v-else class="text-sm text-[var(--ui-text-muted)] italic text-center">Nenhuma formação adicionada.</p>

        </UCard>

        <div class="flex justify-end pt-4">
          <UButton type="submit" size="xl" color="primary" class="w-full md:w-auto px-12">
            Finalizar Cadastro
          </UButton>
        </div>

      </form>
    </div>
  </div>
</template>