// app/composables/useAuth.ts
import { AuthService, type RegisterPayload, type LoginPayload } from "../services/authService";
import type { AxiosInstance, AxiosError } from "axios"; // Importamos os tipos do Axios

export const useAuth = () => {
    const nuxtApp = useNuxtApp();

    // Verificação de segurança
    if (!nuxtApp.$api) {
        console.warn("Plugin Axios ainda não carregou.");
    }

    // CORREÇÃO 1: Em vez de 'as any', usamos o tipo correto 'as AxiosInstance'
    const authService = AuthService(nuxtApp.$api as AxiosInstance);

    // Estados Globais
    // Dica: Se quiser tipar o usuário também, pode usar useState<Usuario | null>(...)
    const user = useState("auth_user", () => null);
    const loading = useState("auth_loading", () => false);

    const token = useCookie("lykos_token", {
        maxAge: 60 * 60 * 24 * 7,
        path: '/'
    });

    // --- AÇÕES ---

    const register = async (payload: RegisterPayload) => {
        loading.value = true;
        try {
            const response = await authService.register(payload);
            return response.data;
        } catch (error) {
            // CORREÇÃO 2: Removemos ': any' do catch.
            // Tratamos o erro como um AxiosError para acessar .response.data com segurança
            const err = error as AxiosError;

            console.error("Erro no registro:", err);

            // Lançamos os dados do erro (que o Axios traz) ou o erro original
            throw err.response?.data || err;
        } finally {
            loading.value = false;
        }
    };

    const login = async (payload: LoginPayload) => {
        loading.value = true;
        try {
            const response = await authService.login(payload);

            // O tipo de response.data é 'any' por padrão do Axios, então aqui precisamos garantir
            // que estamos acessando propriedades que existem. Vamos inferir que é um objeto.
            const data = response.data as Record<string, string>;
            const accessToken = data.key || data.access;

            if (accessToken) {
                token.value = accessToken;
                await fetchUser();
            }
            return data;
        } catch (error) {
            // CORREÇÃO 3: Mesmo tratamento aqui
            const err = error as AxiosError;
            console.error("Erro no login:", err);
            throw err.response?.data || err;
        } finally {
            loading.value = false;
        }
    };

    const fetchUser = async () => {
        if (!token.value) return;

        try {
            const response = await authService.getMe();
            user.value = response.data;
        } catch (error) {
            console.error("Sessão inválida ou expirada:", error);
            token.value = null;
            user.value = null;
        }
    };

    const logout = async () => {
        loading.value = true;
        try {
            await authService.logout();
        } catch (error) {
            console.warn("Erro ao notificar logout ao servidor", error);
        } finally {
            token.value = null;
            user.value = null;
            loading.value = false;
            navigateTo("/login");
        }
    };

    const isAuthenticated = computed(() => !!user.value);

    return {
        user,
        token,
        loading,
        isAuthenticated,
        register,
        login,
        fetchUser,
        logout
    };
};