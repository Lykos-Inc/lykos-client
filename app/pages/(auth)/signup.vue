<template>

    <body>
        <div class="flex items-center justify-center min-h-screen flex-col max-w-800 mx-auto p-4">
            <h1 class="text-2xl font-bold mb-6 text-center text-black">
                Crie sua conta
            </h1>



            <UForm :schema="schema" :state="state" class="space-y-4 max-w-xl w-full mx-auto" @submit="handleSubmit">
                <UFormField label="Nome Completo" name="nome"
                    :ui="{ label: 'text-black', error: 'text-[var(--color-laranja)] text-sm mt-1', }">
                    <UInput v-model="state.nome" variant="none" placeholder="Entre com seu nome completo" class="w-full" :ui="{
                        base: 'w-full h-14 px-4 border border-[var(--color-laranja)] rounded-xl text-[#94824F] focus:ring-2 focus:ring-[var(--color-laranja)]'
                    }" />
                </UFormField>
                <UFormField label="Email" name="email" class="block text-left font-medium"
                    :ui="{ label: 'text-black', error: 'text-[var(--color-laranja)] text-sm mt-1', }">
                    <UInput v-model="state.email" variant="none" placeholder="Entre com seu email" :ui="{
                        base: 'w-full h-14 px-4 border border-[var(--color-laranja)] rounded-xl text-[#94824F] focus:ring-2 focus:ring-[var(--color-laranja)]'
                    }" class="w-full" />
                </UFormField>
                <UFormField label="Senha" name="senha"
                    :ui="{ label: 'text-black', error: 'text-[var(--color-laranja)] text-sm mt-1', }">
                    <UInput v-model="state.senha" variant="none" type="password" placeholder="Entre com sua senha" :ui="{
                        base: 'w-full h-14 px-4 border border-[var(--color-laranja)] rounded-xl text-[#94824F] focus:ring-2 focus:ring-[var(--color-laranja)]'
                    }" class="w-full" />
                </UFormField>
                <UFormField label="Confirmar Senha" name="confirmarSenha"
                    :ui="{ label: 'text-black', error: 'text-[var(--color-laranja)] text-sm mt-1', }">
                    <UInput v-model="state.confirmarSenha" variant="none" type="password" placeholder="Confirme sua senha" :ui="{
                        base: 'w-full h-14 px-4 border border-[var(--color-laranja)] rounded-xl text-[#94824F] focus:ring-2 focus:ring-[var(--color-laranja)]'
                    }" class="w-full" />
                </UFormField>

                <div class="mt-6 flex flex-col items-center gap-4">
                    <UButton type="submit"
                        class="flex flex-col h-14 px-15 justify-center items-center rounded-lg bg-[var(--color-laranja)] text-white">
                        Inscrever-se
                    </UButton>
                </div>

            </UForm>

            <!-- Links -->
            <div class="mt-6 flex flex-col items-center gap-4">
                <a href="#" class="text-sm text-[#94824F] hover:underline">
                    Já tem uma conta?
                </a>

                <a href="#"
                    class="flex h-14 items-center justify-center rounded-md border px-6 text-[var(--color-laranja)]">
                    Entrar
                </a>
            </div>
        </div>
    </body>
</template>

<script setup lang="ts">
import * as v from 'valibot'

const schema = v.object({
    nome: v.pipe(v.string(), v.minLength(1, 'Nome é obrigatório')),
    email: v.pipe(v.string(), v.email('Email inválido')),
    senha: v.pipe(v.string(), v.minLength(8, 'A senha deve ter no mínimo 8 caracteres')),
    confirmarSenha: v.string()
})

const state = reactive({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: ''
})

function handleSubmit() {
    if (state.senha !== state.confirmarSenha) {
        alert('As senhas não coincidem')
        return
    }

    console.log('Usuário cadastrado com sucesso:', state)
}
</script>

