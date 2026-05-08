import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { authApi, type AuthUser } from '@/api/modules/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<AuthUser | null>(null)
  const token = ref<string | null>(localStorage.getItem('token'))
  const isAuthResolved = ref(false)

  const isAuthenticated = computed(() => !!token.value && !!user.value)
  const username = computed(() => user.value?.username ?? '')

  async function login(name: string, password: string) {
    const res = await authApi.login({ username: name, password })
    token.value = res.data.token
    user.value = res.data.user
    localStorage.setItem('token', res.data.token)
  }

  async function register(name: string, password: string) {
    const res = await authApi.register({ username: name, password })
    token.value = res.data.token
    user.value = res.data.user
    localStorage.setItem('token', res.data.token)
  }

  async function checkAuth() {
    const savedToken = localStorage.getItem('token')
    if (!savedToken) {
      isAuthResolved.value = true
      return
    }
    try {
      const res = await authApi.me()
      user.value = res.data.user
      token.value = savedToken
    } catch {
      logout()
    } finally {
      isAuthResolved.value = true
    }
  }

  function logout() {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
  }

  checkAuth()

  return {
    user,
    token,
    isAuthenticated,
    isAuthResolved,
    username,
    login,
    register,
    checkAuth,
    logout,
  }
})
