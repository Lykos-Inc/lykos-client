<script setup lang="ts">

import { ref, computed } from 'vue';

// ------ Skills ------
const novaSkill = ref('');
const skills = ref<string[]>([]);
const sugestoesSkillsBase = [
  'React', 'Angular', 'Vue.js', 'Node.js', 'Python', 'Java',
  'TypeScript', 'PHP', 'C#', 'Go', 'Swift', 'Kotlin', 'SQL', 'Docker'
];
const sugestoesSkillsFiltradas = computed(() =>
  novaSkill.value
    ? sugestoesSkillsBase.filter(s =>
      s.toLowerCase().includes(novaSkill.value.toLowerCase()) &&
      !skills.value.includes(s)
    )
    : []
);
function adicionarSkill(skill?: string) {
  const valor = (skill || novaSkill.value).trim();
  if (valor && !skills.value.includes(valor)) {
    skills.value.push(valor);
  }
  novaSkill.value = '';
}
function removerSkill(skill: string) {
  skills.value = skills.value.filter((s: string) => s !== skill);
}

// ------ Idiomas ------
const novoIdioma = ref('');
const idiomas = ref<string[]>([]);
const sugestoesIdiomasBase = [
  'Português', 'Inglês', 'Espanhol', 'Francês', 'Alemão', 'Italiano',
  'Mandarim', 'Japonês', 'Coreano', 'Russo', 'Árabe'
];
const sugestoesIdiomasFiltradas = computed(() =>
  novoIdioma.value
    ? sugestoesIdiomasBase.filter(i =>
      i.toLowerCase().includes(novoIdioma.value.toLowerCase()) &&
      !idiomas.value.includes(i)
    )
    : []
);
function adicionarIdioma(idioma?: string) {
  const valor = (idioma || novoIdioma.value).trim();
  if (valor && !idiomas.value.includes(valor)) {
    idiomas.value.push(valor);
  }
  novoIdioma.value = '';
}
function removerIdioma(idioma: string) {
  idiomas.value = idiomas.value.filter((i: string) => i !== idioma);
}

const form = ref({
  nome: '',
  fotoPerfil: null as File | null,
  descricao: '',
  idiomas: [] as string[],
  skills: [] as string[],
  formacao: {
    titulo: '',
    instituicao: '',
    ano: ''
  },
  experiencia: {
    empresa: '',
    cargo: '',
    periodoInicio: '',
    periodoFim: ''
  }
});

function handleFileUpload(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    // form.value.fotoPerfil = target.files[0];
    // ✅ Checa se fotoPerfil não é null antes de acessar name
    if (form.value.fotoPerfil) {
      console.log('Foto de perfil recebida:', form.value.fotoPerfil.name);
    }
  } else {
    form.value.fotoPerfil = null;
    console.warn('Nenhuma foto de perfil foi selecionada.');
  }
}


function handleSubmit() {
  try {
    

    form.value.idiomas = idiomas.value;
    form.value.skills = skills.value;

    const validators = [
      { valid: form.value.nome?.trim(), msg: 'Nome é obrigatório' },
      { valid: form.value.fotoPerfil, msg: 'Foto de perfil é obrigatória' },
      { valid: form.value.descricao?.trim(), msg: 'Descrição do perfil é obrigatória' },
      { valid: form.value.idiomas.length > 0, msg: 'Pelo menos um idioma é obrigatório' },
      { valid: form.value.skills.length > 0, msg: 'Pelo menos uma habilidade é obrigatória' },
      { valid: form.value.formacao.titulo?.trim(), msg: 'Título da formação é obrigatório' },
      { valid: form.value.formacao.instituicao?.trim(), msg: 'Instituição é obrigatória' },
      { valid: form.value.formacao.ano?.trim(), msg: 'Ano de conclusão é obrigatório' },
      { valid: form.value.experiencia.empresa?.trim(), msg: 'Empresa é obrigatória' },
      { valid: form.value.experiencia.cargo?.trim(), msg: 'Cargo é obrigatório' }
    ];

    const erro = validators.find(v => !v.valid);
    if (erro) {
      alert(erro.msg);
      return;
    }

    console.log('Freelancer cadastrado com sucesso:', form.value);
  } catch (error) {
    console.error('Erro ao processar formulário', error);
  }
}
</script>

<template>
  <main>
    <div class="flex flex-col min-h-screen max-w-lg w-full mx-auto p-4">
      <h1 class="text-3xl font-bold mb-6">
        Torne-se um freelancer
      </h1>

      <form class="space-y-6" @submit.prevent="handleSubmit">
        <!-- Nome de usuário -->
        <div class="mb-6">
          <label for="nome" class="block mb-2">Nome de usuário</label>
          <input type="text" name="nome" id="nome" v-model="form.nome" placeholder="Seu identificador público na plataforma"
            class="border border-[var(--color-dourado)] rounded p-2 w-full mb-4 placeholder-[var(--color-dourado)] bg-[var(--color-fundo-input)]" />
        </div>

        <!-- Foto de perfil -->
        <div
          class="flex flex-col items-center mb-6 border border-dashed border-[var(--color-dourado)] rounded p-4 pt-5">
          <h2 class="text-2xl pb-4">Foto de perfil</h2>
          <p class="text-center pb-4">
            Envie uma foto profissional que mostre claramente <br /> o seu rosto
          </p>
          <label for="arquivo" class="p-2 rounded-md bg-[var(--color-fundos)] text-base cursor-pointer">
            Carregar
          </label>
          <input type="file" id="arquivo" class="hidden" @change="handleFileUpload"/>
        </div>

        <!-- Descrição do perfil -->
        <div class="mb-6">
          <label for="descricao" class="block mb-2">Descrição do perfil</label>
          <textarea name="descricao" id="descricao" rows="4" v-model="form.descricao"
            class="border border-[var(--color-dourado)] rounded p-2 w-full mb-4 bg-[var(--color-fundo-input)] text-[var(--color-dourado)]"></textarea>
        </div>

        <!-- Idiomas -->
        <div class="mb-6 relative">
          <label for="idioma" class="block mb-2">Idiomas</label>
          <input id="idioma" type="text" v-model="novoIdioma" @keydown.enter.prevent="adicionarIdioma()"
            placeholder="Digite um idioma e pressione Enter"
            class="border border-[var(--color-dourado)] rounded p-2 w-full bg-[var(--color-fundo-input)]" />
          <ul v-if="sugestoesIdiomasFiltradas.length"
            class="absolute z-10 w-full bg-white border border-gray-300 rounded shadow mt-1 max-h-40 overflow-y-auto">
            <li v-for="(i, index) in sugestoesIdiomasFiltradas" :key="index" @click="adicionarIdioma(i)"
              class="px-3 py-2 cursor-pointer hover:bg-gray-100 text-[var(--color-dourado)]">
              {{ i }}
            </li>
          </ul>
          <div class="flex flex-wrap gap-2 mt-3">
            <span v-for="(idioma, index) in idiomas" :key="index"
              class="bg-[var(--color-fundo-input)] px-3 py-1 rounded flex items-center gap-2 text-[var(--color-dourado)]">
              {{ idioma }}
              <button type="button" @click="removerIdioma(idioma)" class="text-red-500 font-bold">×</button>
            </span>
          </div>
        </div>

        <!-- Habilidades -->
        <div class="mb-6 relative">
          <label for="skill" class="block mb-2">Habilidades</label>
          <input id="skill" type="text" v-model="novaSkill" @keydown.enter.prevent="adicionarSkill()"
            placeholder="Digite uma habilidade e pressione Enter"
            class="border border-[var(--color-dourado)] rounded p-2 w-full bg-[var(--color-fundo-input)]" />
          <ul v-if="sugestoesSkillsFiltradas.length"
            class="absolute z-10 w-full bg-white border border-gray-300 rounded shadow mt-1 max-h-40 overflow-y-auto">
            <li v-for="(s, index) in sugestoesSkillsFiltradas" :key="index" @click="adicionarSkill(s)"
              class="px-3 py-2 cursor-pointer hover:bg-gray-100 text-[var(--color-dourado)]">
              {{ s }}
            </li>
          </ul>
          <div class="flex flex-wrap gap-2 mt-3">
            <span v-for="(skill, index) in skills" :key="index"
              class="bg-[var(--color-fundo-input)] px-3 py-1 rounded flex items-center gap-2 text-[var(--color-dourado)]">
              {{ skill }}
              <button type="button" @click="removerSkill(skill)" class="text-red-500 font-bold">×</button>
            </span>
          </div>
        </div>

        <!--Formação-->
        <h3><strong>Formação e Certificações</strong></h3>
        <div class="mb-6">
          <label for="formacao" class="block mb-2">Titulo da formação</label>
          <input type="text" name="formacao" id="formacao" placeholder="Ex: Licenciatura, bacharel, técnico..." v-model="form.formacao.titulo"
            class="border border-[var(--color-dourado)] rounded p-2 w-full mb-4 placeholder-[var(--color-dourado)] bg-[var(--color-fundo-input)]" />
        </div>
        <div class="mb-6">
          <label for="instituicao" class="block mb-2">Instituição</label>
          <input type="text" name="instituicao" id="instituicao" placeholder="Nome da instituição" v-model="form.formacao.instituicao"
            class="border border-[var(--color-dourado)] rounded p-2 w-full mb-4 placeholder-[var(--color-dourado)] bg-[var(--color-fundo-input)]" />
        </div>
        <div class="mb-6">
          <label for="Ano" class="block mb-2">Ano</label>
          <input type="text" name="Ano" id="Ano" placeholder="Ex: 2020" v-model="form.formacao.ano"
            class="border border-[var(--color-dourado)] rounded p-2 w-full mb-4 bg-[var(--color-fundo-input)]" />
        </div>

        <!--Experiência-->
        <h3><strong>Experiência profissional</strong></h3>
        <div class="mb-6">
          <label for="empresa" class="block mb-2">Empresa</label>
          <input type="text" name="empresa" id="empresa" placeholder="Nome da empresa" v-model="form.experiencia.empresa"
            class="border border-[var(--color-dourado)] rounded p-2 w-full mb-4 placeholder-[var(--color-dourado)] bg-[var(--color-fundo-input)]" />
        </div>
        <div class="mb-6">
          <label for="cargo" class="block mb-2">Cargo</label>
          <input type="text" name="cargo" id="cargo" placeholder="Ex: Desenvolvedor, designer..." v-model="form.experiencia.cargo"
            class="border border-[var(--color-dourado)] rounded p-2 w-full mb-4 placeholder-[var(--color-dourado)] bg-[var(--color-fundo-input)]" />
        </div>
        <div class="mb-6">
          <label for="periodo" class="mb-2 block">Período</label>
          <div class="flex gap-4">
            <input type="text" name="inicio" id="inicio" placeholder="Início" v-model="form.experiencia.periodoInicio"
              class="border border-[var(--color-dourado)] rounded p-2 w-1/2 placeholder-[var(--color-dourado)] bg-[var(--color-fundo-input)]" />
            <input type="text" name="fim" id="fim" placeholder="Fim" v-model="form.experiencia.periodoFim"
              class="border border-[var(--color-dourado)] rounded p-2 w-1/2 placeholder-[var(--color-dourado)] bg-[var(--color-fundo-input)]" />
          </div>
        </div>
        <!--botão cadastro-->
        <button type="submit" class="bg-[var(--color-dourado)] text-white font-bold py-2 px-4 rounded w-full">
          Próximo
        </button>

      </form>
    </div>
  </main>
</template>

<style scoped>
h1,
h2 {
  color: black;
}

label {
  color: black;
}

input,
textarea {

  font-size: 16px;
}

p {
  color: black;
}

h3 {
  color: black;
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 10px;
}
</style>
