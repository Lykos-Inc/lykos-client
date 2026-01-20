<script setup>
import { ref, reactive, computed } from "vue"

const Sugestoescategorias = ref([
    "Design Gráfico",
    "Desenvolvimento Web",
    "Marketing Digital",
    "Redação e Tradução",
    "Consultoria de Negócios",
    "Fotografia e Vídeo",
    "Música e Áudio",
    "Tutoria e Aulas Particulares",
])

const imagemServico = ref(null)

const schema = {
    tituloServico: { type: 'string', required: true, min: 3, max: 100 },
    categoria: { type: 'string', required: true },
    subCategoria: { type: 'string', required: false },
    tags: { type: 'array', required: false },
}

const state = reactive({
    tituloServico: '',
    categoria: '',
    subCategoria: '',
    tags: [],
    descricaoServico: '',
    imagemServico: [],
    prazoEntrega: "",
    revisoes: "",
    preco: ""
})

// Controle do dropdown
const mostrarSugestoesCategoria = ref(false)
const mostrarSugestoesSubCategoria = ref(false)

// Filtros
const sugestoesCategoriasFiltradas = computed(() =>
    state.categoria
        ? Sugestoescategorias.value.filter(c =>
            c.toLowerCase().includes(state.categoria.toLowerCase())
        )
        : []
)

const sugestoesSubCategoriasFiltradas = computed(() =>
    state.subCategoria
        ? Sugestoescategorias.value.filter(s =>
            s.toLowerCase().includes(state.subCategoria.toLowerCase())
        )
        : []
)

// Seleção
const selecionarCategoria = (c) => {
    state.categoria = c
    mostrarSugestoesCategoria.value = false
}

const selecionarSubCategoria = (s) => {
    state.subCategoria = s
    mostrarSugestoesSubCategoria.value = false
}

const onSubmit = () => {
    console.log("Dados enviados:", state)
}
</script>

<template>
    <div class="max-w-7xl mx-auto p-6 space-y-8">
        <h1 class="text-black">Seu primeiro Serviço</h1>
        <UForm :schema="schema" @submit="onSubmit">
            <!-- Título -->
            <UFormField label="Titulo Serviço" name="tituloServico" class="p-2 text-black">
                <UInput v-model="state.tituloServico" placeholder="Eu criarei uma logotipo profissional" :ui="{
                    base: 'w-full h-14 px-4 border-[var(--color-laranja)] rounded-xl focus:ring-2 focus:ring-[var(--color-laranja)]'
                }" class="text-[var(--color-dourado)] pl-2 pt-2 pb-2 w-6/12" />
            </UFormField>

            <div class="flex flex-row gap-2 w-6/12">
                <!-- Categoria -->
                <UFormField label="Categoria" name="categoria" class="p-2 text-black w-1/2 relative">
                    <input v-model="state.categoria" placeholder="Selecione ou digite uma categoria"
                        @focus="mostrarSugestoesCategoria = true"
                        @blur="setTimeout(() => mostrarSugestoesCategoria = false, 200)"
                        class="border border-[var(--color-dourado)] rounded p-2 w-full bg-[var(--color-fundo-input)]" />
                    <ul v-if="mostrarSugestoesCategoria && sugestoesCategoriasFiltradas.length"
                        class="absolute z-10 w-full bg-white border border-gray-300 rounded shadow mt-1 max-h-40 overflow-y-auto">
                        <li v-for="(s, index) in sugestoesCategoriasFiltradas" :key="index"
                            @click="selecionarCategoria(s)"
                            class="px-3 py-2 cursor-pointer hover:bg-gray-100 text-[var(--color-dourado)]">
                            {{ s }}
                        </li>
                    </ul>
                </UFormField>

                <!-- Sub categoria -->
                <UFormField label="Subcategoria" name="subCategoria" class="p-2 text-black w-1/2 relative">
                    <input v-model="state.subCategoria" placeholder="Selecione ou digite uma sub categoria"
                        @focus="mostrarSugestoesSubCategoria = true"
                        @blur="setTimeout(() => mostrarSugestoesSubCategoria = false, 200)"
                        class="border border-[var(--color-dourado)] rounded p-2 w-full bg-[var(--color-fundo-input)]" />
                    <ul v-if="mostrarSugestoesSubCategoria && sugestoesSubCategoriasFiltradas.length"
                        class="absolute z-10 w-full bg-white border border-gray-300 rounded shadow mt-1 max-h-40 overflow-y-auto">
                        <li v-for="(s, index) in sugestoesSubCategoriasFiltradas" :key="index"
                            @click="selecionarSubCategoria(s)"
                            class="px-3 py-2 cursor-pointer hover:bg-gray-100 text-[var(--color-dourado)]">
                            {{ s }}
                        </li>
                    </ul>
                </UFormField>
            </div>
            <UFormField name="tags" class="p-2 text-black">
                <UInputTags v-model="state.tags" :max-length="5" placeholder="Insira até 5 tags" :ui="{
                    base: 'w-full h-14 px-4  border-[var(--color-laranja)] rounded-xl text-[#94824F] focus:ring-2 focus:ring-[var(--color-laranja)]'
                }" class="text-[var(--color-dourado)] pl-2 pt-2 pb-2 w-6/12" />
            </UFormField>

            <UFormField class="p-2 text-black relative" label="Descrição do Serviço" name="descricaoServico">
                <UTextarea v-model="state.descricaoServico" :maxrows="20" :ui="{
                    base: 'w-full h-30 px-4  border-[var(--color-laranja)] rounded-xl  focus:ring-2 focus:ring-[var(--color-laranja)]'
                }" class="rounded  text-[var(--color-dourado)] w-6/12 focus:outline-none focus:ring-0 pb-10" />
            </UFormField>

            <h2 class="text-black mt-10">Galeria de Serviços Portifolio</h2>
            <UFormField class="p-2 text-black relative" label="Imagens do Serviço" name="imagensServico">
                <UFileUpload v-model="state.imagemServico" class="w-6/12 min-h-48 text-[var(--color-dourado)]"
                    label="carregar imagens, vídeos e PDFs" description="Exiba seu melhor trabalho para atrair cliente "
                    input-class="hidden" />
            </UFormField>

            <h2 class="text-black mt-10 mb-4">Configuração de serviço</h2>
            <UCard class="w-96 rounded-xl border border-[var(--color-dourado)] ">
                <div class="divide-y divide-gray-200 ">

                    <!-- Prazo de entrega -->
                    <div class="p-4">
                        <label class="block text-gray-600 text-sm mb-1">Prazo de entrega</label>
                        <UInput v-model="state.prazoEntrega" placeholder="Ex: 7 dias" class="text-black " :ui="{
                            base: 'border-0 ring-0 focus:ring-0'
                        }" />
                    </div>

                    <!-- Número de revisões -->
                    <div class="p-4">
                        <label class="block text-gray-600 text-sm mb-1">Número de revisões</label>
                        <UInput v-model="state.revisoes" placeholder="Ex: 3" type="number" class="text-black" :ui="{
                            base: 'border-0 ring-0 focus:ring-0'
                        }" />
                    </div>

                    <!-- Preço -->
                    <div class="p-4">
                        <label class="block text-gray-600 text-sm mb-1">Preço</label>
                        <UInput v-model="state.preco" placeholder="Ex: R$ 500" type="number" class="text-black" :ui="{
                            base: 'border-0 ring-0 focus:ring-0'
                        }" />
                    </div>
                </div>
            </UCard>

            <div class="flex justify-end mt-6">
                <UButton type="submit" class="border bg-[var(--color-laranja)] flex flex-row-reverse p-2 text-white">
                    Serviço de Publicação
                </UButton>
            </div>

        </UForm>
    </div>
</template>

<style scoped></style>
