// src/api/axiosConfig.js
import axios from 'axios'
import { useAuthStore } from '../stores/auth'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore()
    if (authStore.token) {
      config.headers.Authorization = `Bearer ${authStore.token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const authStore = useAuthStore()
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.config.url !== '/auth/login' &&
      error.response.config.url !== '/auth/register'
    ) {
      console.log('Token expiré ou invalide. Déconnexion...')
      authStore.logout()
    }
    return Promise.reject(error)
  },
)

export default apiClient
