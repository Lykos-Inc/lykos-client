<script setup>
import { ref } from "vue";
const logoChecked = ref(true)
const revisionsChecked = ref(true)
const metPagamento = ref("Crédito"); 
import { Lock } from "@iconoir/vue"

 


const pay = {
    valorPacote: 1100.00,
    taxaServico: 100.00,
    total: 1200.00

}

const prazo ={
    prazo: 7
}

const user={
    nome: 'Bruno Silva',
    pais: 'Brasil'
}
</script>

<template>

    <h1 class="text-black ml-10 mt-5">Checkout</h1>
    <div class="flex flex-1 mx-auto w-full p-6 gap-6 flex-col md:flex-row bg-white-600 ">
        <!-- Área Esquerda -->
        <div class=" p-6 w-3/5 flex flex-col mr-10 ">
            <p class="mb-3 font-medium text-black">Método de Pagamento</p>
            <form class="flex flex-col gap-3">
                <!-- Crédito -->
                <label class="flex items-center gap-2 cursor-pointer border border-[var(--color-dourado)] p-2 rounded">
                    <input type="radio" v-model="metPagamento" value="Crédito" class="custom-radio" />
                    <span class="text-black text-sm">Cartão de crédito</span>
                </label>
                <!-- Débito -->
                <label class="flex items-center gap-2 cursor-pointer border border-[var(--color-dourado)] p-2 rounded">
                    <input type="radio" v-model="metPagamento" value="Débito" class=" custom-radio" />
                    <span class="text-black text-sm">Cartão de débito</span>
                </label>
                <!-- PayPal -->
                <label class="flex items-center gap-2 cursor-pointer border border-[var(--color-dourado)] p-2 rounded">
                    <input type="radio" v-model="metPagamento" value="PayPal" class=" custom-radio" />
                    <span class="text-black text-sm">PayPal</span>
                </label>
                <div class="flex flex-col  gap-2">
                    <label for="" class="text-black">Número do Cartão</label>
                    <input type="text" name="" id="" placeholder="Digite o número do cartão"
                        class="cursor-pointer border border-[var(--color-dourado)] p-2 rounded placeholder-[var(--color-dourado)]">
                    <div class="flex flex-row w-1/2">
                        <label for="" class="pr-5 text-black">
                            Vencimento
                            <input type="text" placeholder="MM/AA"
                                class="cursor-pointer border border-[var(--color-dourado)] p-2 rounded placeholder-[var(--color-dourado)]">
                        </label>
                        <label for="" class="flex flex-col text-black ">
                            Codigo de Segurança(CVV)
                            <input type="text" placeholder="CVV"
                                class="cursor-pointer border border-[var(--color-dourado)] p-2 rounded placeholder-[var(--color-dourado)]">
                        </label>
                    </div>
                    <label for="" class="text-black">Nome do titular do cartão</label>
                    <input type="text" name="" id="" placeholder="Digite o nome do titular do cartão"
                        class="cursor-pointer border border-[var(--color-dourado)] p-2 rounded placeholder-[var(--color-dourado)]">
                    <label for="" class="text-black">CPF/CNPJ</label>
                    <input type="text" name="" id="" placeholder="Insirir CPF/CNPJ"
                        class="cursor-pointer border border-[var(--color-dourado)] p-2 rounded placeholder-[var(--color-dourado)]">
                    <label class="flex items-center gap-2 cursor-pointer mt-5 text-black">
                        <input type="Checkbox" value="PayPal" class=" custom-radio" />
                        salvar este cartão para pagamentos futuros
                    </label>
                    <label for="" class="text-black">Código promocional</label>
                    <input type="text" name="" id="" placeholder="Insirir código"
                        class="cursor-pointer border border-[var(--color-dourado)] p-2 rounded placeholder-[var(--color-dourado)]">
                </div>
                <button type="submit" class="text-black bg-gray-200 rounded w-24 p-2 m-1">Aplicar</button>
            </form>
        </div>
        <!-- Área Direita -->
        <div class="flex-1 w-full md:w-2/5 flex flex-col gap-4">
            <h3>Resumo da compra</h3>
            <div class="flex flex-row gap-2   w-full max-w-[480px] justify-between">
                <div class="w-40 h-28 bg-center bg-no-repeat bg-cover rounded-lg"
                    style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuA90odZd3razRM2DGbQD9QvpHml6rifZXxdAytw_iMNOCoBnybC9C3OtQtgTAi3_sWn7RHwHdx4idSCkDi4LxL6XQD3O9gNNUOYi8Kp40JEpYBXKd7N4IKeUlCRmuAhbBamFsjoscoNE5bMfHA9e-y-paQRWoq2wvAer3nc7rlZLju1cP2rXVoK7ILQyNoCqFERjBJ8XWtoHH2qeu2140pXtulS0yJJsOX0wJrXKV0LHAgWnYIDUMk_rkHUp_dORy_oK5uGqqSKTmA");'>
                </div>

                <div class="flex flex-col gap-1 flex self-center">
                    <p class="text-[var(--color-dourado)]">Serviço</p>
                    <p class="text-[#0d141c] text-base font-bold leading-tight">Sessão Fotografica</p>
                </div>
                
            </div>
            <p class="text-black "><strong>Itens incluídos</strong></p>
            <div class="flex flex-col gap-2 pr-5">
                <label class="inline-flex items-center space-x-2 ">
                    <input type="checkbox" v-model="logoChecked" class="form-checkbox text-yellow-500 rounded" />
                    <span class="text-yellow-500">Logomarca + variações</span>
                </label>

                <label class="inline-flex items-center space-x-2 ">
                    <input type="checkbox" v-model="revisionsChecked" class="form-checkbox text-yellow-500 rounded" />
                    <span class="text-[var(--color-dourado)]">3 Revisions</span>
                </label>
            </div>
            <div>
                <div class="flex flex-row justify-between w-8/12 pb-2">
                    <p class="text-black">Valor Pacote</p>
                    <p class="text-black">R$ {{ pay.valorPacote }}</p>
                </div>
                <div class="flex flex-row justify-between w-8/12 pb-2">
                    <p class="text-black">Taxa Serviço</p>
                    <p class="text-black">R$ {{ pay.taxaServico }}</p>
                </div>    
                <div class="flex flex-row justify-between w-8/12 pb-2">
                    <p class="text-black">Valor Total</p>
                    <p class="text-black">R$ {{ pay.total }}</p>
                </div>
            </div>
            <p class="text-black">Prazo de Entrega: {{ prazo.prazo }} dias</p>
            <UButton class="text-black bg-[var(--color-laranja)] rounded w-full p-2 m-1 flex justify-center items-center gap-2 w-8/12">
                <Lock class="w-6 h-6" />
                Confirmar e Pagar
            </UButton>
            <p class="text-[var(--color-dourado)] w-8/12 flex justify-center ">
                Pagamento Seguro SSL. 
            </p>
        </div>
    </div>
    <h3 class="ml-10 text-black pb-5">Informações de faturamento e Segurança</h3>
    <div class="ml-10 mb-4 flex flex-row gap-10">
        
        <div class="">    
            <p class="text-black pb-5">Nome do comprador: {{ user.nome }} </p>
            <p class="text-black pb-5">Pais: {{ user.pais }}</p>
        </div>
        <div class="">
            <p class="text-black pb-5">Nós lhe damos cobertura: Seu pagamento só será liberado para <br> o freelancer depois que você aprovar a entrega.</p>
            <p class="text-black">Pagamentos 100% seguros: Usamos criptografia e proteção de dados.</p>
        </div>
    </div>

</template> 


<style scoped>
.custom-radio {
    appearance: none;
    width: 18px;
    height: 18px;
    border: 2px solid #d1d5db;
    /* cinza claro */
    border-radius: 50%;
    position: relative;
    cursor: pointer;
}

.custom-radio:checked::before {
    content: "";
    width: 10px;
    height: 10px;
    background-color: var(--color-laranja);
    /* usa a variável */
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>