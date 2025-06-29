<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 p-4">
    <div class="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
      <h2 class="text-3xl font-bold text-center text-gray-900 mb-6">Connexion</h2>
      <form @submit.prevent="handleLogin">
        <div class="mb-4">
          <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email :</label>
          <input
            type="email"
            id="email"
            v-model="email"
            class="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
            required
          />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-gray-700 text-sm font-bold mb-2"
            >Mot de passe :</label
          >
          <input
            type="password"
            id="password"
            v-model="password"
            class="shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500"
            required
          />
        </div>
        <div
          v-if="error"
          class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md mb-4"
          role="alert"
        >
          {{ error }}
        </div>
        <div class="flex items-center justify-between">
          <button
            type="submit"
            :disabled="loading"
            class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ loading ? 'Connexion en cours...' : 'Se connecter' }}
          </button>
          <router-link
            to="/forgot-password"
            class="inline-block align-baseline font-bold text-sm text-blue-600 hover:text-blue-800"
          >
            Mot de passe oublié ?
          </router-link>
        </div>
        <p class="text-center text-gray-600 text-sm mt-4">
          Pas encore de compte ?
          <router-link to="/register" class="font-bold text-blue-600 hover:text-blue-800"
            >S'inscrire</router-link
          >
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const email = ref('')
const password = ref('')
const error = ref(null)
const loading = ref(false)
const router = useRouter()
const authStore = useAuthStore()

const handleLogin = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await axios.post('http://localhost:5000/api/auth/login', {
      email: email.value,
      password: password.value,
    })

    authStore.setLogin(response.data.token, response.data.user.role, response.data.user.id)

    router.push('/dashboard')
  } catch (err) {
    console.error('Erreur de connexion:', err.response?.data || err.message)
    error.value = err.response?.data?.msg || 'Email ou mot de passe incorrect.'
    authStore.logout()
  } finally {
    loading.value = false
  }
}
</script>

<style scoped></style>
