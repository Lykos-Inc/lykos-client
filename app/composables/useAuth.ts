// composables/useAuth.ts
export const useAuth = () => {
    const user = useState<any | null>('user', () => null)

    const isAuthenticated = computed(() => !!user.value)
    const isFreelancer = computed(() => user.value?.role === 'freelancer')

    const logout = () => {
        user.value = null
        navigateTo('/')
    }

    return {
        user,
        isAuthenticated,
        isFreelancer,
        logout
    }
}
