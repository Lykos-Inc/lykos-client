import axios from "axios";

export default defineNuxtPlugin((_nuxtApp) => {
    const config = useRuntimeConfig();

    const api = axios.create({
        baseURL: config.public.apiBase || "http://localhost/api",
        headers: {
            "Content-Type": "application/json",
        },
    });

    api.interceptors.request.use((config) => {
        const token = useCookie("lykos_token");
        if (token.value) {
            config.headers.Authorization = `Bearer ${token.value}`;
        }
        return config;
    });

    // Injeta como $api
    return {
        provide: {
            api: api,
        },
    };
});