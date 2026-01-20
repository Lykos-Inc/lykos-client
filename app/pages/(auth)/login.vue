<script>
</script>

<template>
        
        <UForm class="flex flex-col items-center">
        <h1 class="text-black mt-20">Entre na sua conta</h1>
        <UFormField label="Email" class="text-black w-3/12">
            <UInput variant="none" label="Email" type="email" placeholder="Entrar com seu email" :ui="{
                        base: 'w-full h-14 px-4 border border-[var(--color-laranja)] rounded-xl focus:ring-2  focus:ring-[var(--color-laranja)]'
                    }" class=" w-full rounded placeholder-[var(--color-dourado)]" />
        </UFormField>
        <UFormField label="Senha" class="text-black w-3/12 mt-5">
            <UInput variant="none"  label="Senha" type="email" placeholder="Entrar com sua senha" :ui="{
                        base: 'w-full h-14 px-4 border border-[var(--color-laranja)] rounded-xl focus:ring-2  focus:ring-[var(--color-laranja)]'
                    }" class=" w-full rounded placeholder-[var(--color-dourado)]" />
        </UFormField>

        <a href="" class="text-[var(--color-dourado)] mt-5">Esqueceu a senha?</a>
        <div class="w-3/12">
            <button class="bg-[var(--color-dourado)] text-white  py-2 rounded mt-10 mb-10 cursor-pointer w-full">
            Login 
        </button>
        </div>
        <p class="text-[var(--color-dourado)] mt-5">Ja tem uma conta?</p>

            <button class="border border-[var(--color-dourado)] text-[var(--color-dourado)] bg-white p-2   rounded mt-10 mb-10 cursor-pointer ">
            Criar Conta 
        </button>

        </UForm>
</template>