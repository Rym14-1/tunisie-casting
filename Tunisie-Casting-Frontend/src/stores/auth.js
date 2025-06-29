// stores/auth.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || null,
    userRole: localStorage.getItem('userRole') || null,
    userId: localStorage.getItem('userId') || null,
    isLoggedIn: !!localStorage.getItem('token'),
  }),
  getters: {
    isAuthenticated: (state) => state.isLoggedIn,

    getUserRole: (state) => state.userRole,

    getUserId: (state) => state.userId,
  },
  actions: {
    setLogin(token, userRole, userId) {
      this.token = token
      this.userRole = userRole
      this.userId = userId
      this.isLoggedIn = true

      localStorage.setItem('token', token)
      localStorage.setItem('userRole', userRole)
      localStorage.setItem('userId', userId)
      console.log('AuthStore: Utilisateur connecté et informations sauvegardées.')
    },

    logout() {
      this.token = null
      this.userRole = null
      this.userId = null
      this.isLoggedIn = false

      localStorage.removeItem('token')
      localStorage.removeItem('userRole')
      localStorage.removeItem('userId')
      console.log('AuthStore: Utilisateur déconnecté et informations supprimées.')
    },

    async loginUser(email, password) {
      try {
        const response = await axios.post('http://localhost:5000/api/auth/login', {
          email,
          password,
        })
        const { token, user } = response.data
        this.setLogin(token, user.role, user.id)
        return true
      } catch (error) {
        console.error('AuthStore: Erreur de connexion:', error)
        this.logout()
        throw error
      }
    },
  },
})
