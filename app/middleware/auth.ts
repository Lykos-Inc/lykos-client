// app/middleware/auth.ts
export default defineNuxtRouteMiddleware((to, from) => {
    const { token } = useAuth()

    // Se não tiver token, manda pro login e salva de onde ele veio pra voltar depois
    if (!token.value) {
        return navigateTo(`/login?redirect=${to.path}`)
    }
})