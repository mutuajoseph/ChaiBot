import { defineStore } from 'pinia'

interface User {
  phone: string
  name?: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  loading: boolean
}

interface LoginPayload {
  phone: string
  password: string
}

interface RegisterPayload {
  name: string
  phone: string
  password: string
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    isAuthenticated: false,
    loading: false
  }),

  getters: {
    userName: (state) => {
      if (!state.user) return ''
      if (state.user.name) {
        return state.user.name
      }
      return state.user.phone
    }
  },

  actions: {
    async login(payload: LoginPayload) {
      this.loading = true
      try {
        // TODO: Implement actual API call
        // Simulating API call for now
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Simulate successful login
        this.user = { phone: payload.phone }
        this.isAuthenticated = true
        
        // Store token in localStorage
        localStorage.setItem('auth_token', 'dummy_token')
        localStorage.setItem('user_phone', payload.phone)
        
        return true
      } catch (error) {
        console.error('Login failed:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async register(payload: RegisterPayload) {
      this.loading = true
      try {
        // TODO: Implement actual API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // Simulate successful registration
        this.user = { phone: payload.phone, name: payload.name }
        this.isAuthenticated = true
        
        // Store user data in localStorage
        localStorage.setItem('auth_token', 'dummy_token')
        localStorage.setItem('user_phone', payload.phone)
        localStorage.setItem('user_name', payload.name)
        
        return true
      } catch (error) {
        console.error('Registration failed:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    logout() {
      this.user = null
      this.isAuthenticated = false
      localStorage.removeItem('auth_token')
      localStorage.removeItem('user_phone')
      localStorage.removeItem('user_name')
    },

    checkAuth() {
      const token = localStorage.getItem('auth_token')
      const phone = localStorage.getItem('user_phone')
      const name = localStorage.getItem('user_name')
      
      if (token && phone) {
        this.isAuthenticated = true
        this.user = {
          phone,
          ...(name && { name })
        }
      }
    }
  }
})
