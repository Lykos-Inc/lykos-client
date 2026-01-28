// services/authService.ts
import type { AxiosInstance } from "axios";

// Tipagem básica do Registro (Baseado no seu JSON)
export interface RegisterPayload {
    nome_usuario: string;
    email: string;
    senha_hash: string;
    senha2: string;
    tipo: "CLIENTE" | "FREELANCER";
    pessoa: {
        nome_completo: string;
        cpf: string;
        data_nascimento: string;
        telefone: string;
    };
    enderecos?: Array<{
        tipo: string;
        logradouro: string;
        numero: string;
        cep: string;
        cidade: string;
        estado: string;
    }>;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export const AuthService = (api: AxiosInstance) => ({
    register(payload: RegisterPayload) {
        return api.post("/auth/register/", payload);
    },

    login(payload: LoginPayload) {
        return api.post("/auth/login/", payload);
    },

    getMe() {
        return api.get("/auth/me/");
    },
    logout() {
        return api.post("/auth/logout/");
    }
});