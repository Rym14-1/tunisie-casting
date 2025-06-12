<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100 p-4">
    <div class="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
      <h1 class="text-3xl font-bold text-center text-gray-900 mb-8">Connexion</h1>
      <form @submit.prevent="handleLogin">
        <div class="mb-5">
          <label for="email" class="block text-gray-700 text-sm font-semibold mb-2">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            class="form-input w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
            placeholder="votre.email@gmail.com"
            required
            autocomplete="email"
          />
        </div>
        <div class="mb-6">
          <label for="password" class="block text-gray-700 text-sm font-semibold mb-2"
            >Mot de passe</label
          >
          <input
            type="password"
            id="password"
            v-model="password"
            class="form-input w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
            placeholder="********"
            required
            autocomplete="current-password"
          />
        </div>

        <div
          v-if="message"
          :class="[
            'p-3 mb-4 rounded-md text-sm',
            messageType === 'error' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700',
          ]"
        >
          {{ message }}
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-blue-600 text-white font-bold py-3 rounded-md hover:bg-blue-700 transition-colors duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          :class="{ 'opacity-50 cursor-not-allowed': loading }"
        >
          <span v-if="loading">Connexion en cours...</span>
          <span v-else>Se connecter</span>
        </button>
      </form>
      <p class="text-center text-gray-600 text-sm mt-6">
        Pas encore de compte ?
        <router-link to="/register" class="text-blue-600 hover:underline font-semibold"
          >Inscrivez-vous ici</router-link
        >
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { ref } from 'vue'

export default {
  name: 'LoginView',
  setup() {
    const email = ref('')
    const password = ref('')
    const message = ref('')
    const messageType = ref('')
    const loading = ref(false)

    const handleLogin = async () => {
      message.value = ''
      messageType.value = ''
      loading.value = true

      try {
        const response = await axios.post('http://localhost:5000/api/auth/login', {
          email: email.value,
          password: password.value,
        })

        localStorage.setItem('token', response.data.token)

        if (response.data.user && response.data.user.role) {
          localStorage.setItem('userRole', response.data.user.role)
        }

        message.value =
          response.data.msg || 'Connexion réussie ! Redirection vers le tableau de bord...'
        messageType.value = 'success'

        window.dispatchEvent(new Event('storage'))

        setTimeout(() => {
          window.location.href = '/dashboard'
        }, 1500)
      } catch (err) {
        console.error(
          'Erreur lors de la connexion:',
          err.response ? err.response.data : err.message,
        )
        message.value =
          err.response && err.response.data && err.response.data.msg
            ? err.response.data.msg
            : 'Erreur lors de la connexion. Veuillez vérifier vos identifiants.'
        messageType.value = 'error'
      } finally {
        loading.value = false
      }
    }

    return {
      email,
      password,
      message,
      messageType,
      loading,
      handleLogin,
    }
  },
}
</script>

<style scoped>
/* Ajoutez vos styles spécifiques à LoginView ici si nécessaire */
</style>
