// src/stores/auth.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    userRole: localStorage.getItem('userRole') || null,
    authError: null,
    authLoading: false,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    getToken: (state) => state.token,
    getUserRole: (state) => state.userRole,
  },
  actions: {
    async login(credentials) {
      this.authLoading = true
      this.authError = null
      try {
        const response = await axios.post('http://localhost:5000/api/auth/login', credentials)
        const { token, user } = response.data //

        this.token = token
        this.userRole = user.role

        localStorage.setItem('token', token)
        localStorage.setItem('userRole', user.role)

        window.dispatchEvent(new Event('storage'))

        return true
      } catch (error) {
        this.authError =
          error.response?.data?.message ||
          'Échec de la connexion. Veuillez vérifier vos identifiants.'
        console.error('Erreur de connexion:', error.response?.data || error.message)
        return false
      } finally {
        this.authLoading = false
      }
    },

    logout() {
      this.token = null
      this.userRole = null
      localStorage.removeItem('token')
      localStorage.removeItem('userRole')
      window.dispatchEvent(new Event('storage'))
    },

    initializeAuth() {
      this.token = localStorage.getItem('token') || null
      this.userRole = localStorage.getItem('userRole') || null
    },
  },
})
