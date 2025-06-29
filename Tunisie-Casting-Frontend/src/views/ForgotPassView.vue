<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100 p-4">
    <div class="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
      <h1 class="text-3xl font-bold text-center text-gray-900 mb-8">Mot de passe oublié ?</h1>
      <p class="text-gray-700 text-center mb-6">
        Entrez votre adresse e-mail pour recevoir un lien de réinitialisation de mot de passe.
      </p>
      <form @submit.prevent="handleForgotPassword">
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

        <div
          v-if="message"
          :class="[
            'p-3 mb-4 rounded-md text-sm',
            messageType === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700',
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
          <span v-if="loading">Envoi en cours...</span>
          <span v-else>Envoyer le lien de réinitialisation</span>
        </button>
      </form>
      <p class="text-center text-gray-600 text-sm mt-6">
        <router-link to="/login" class="text-blue-600 hover:underline font-semibold"
          >Retour à la connexion</router-link
        >
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { ref } from 'vue'

export default {
  name: 'ForgotPasswordView',
  setup() {
    const email = ref('')
    const message = ref('')
    const messageType = ref('')
    const loading = ref(false)

    const handleForgotPassword = async () => {
      message.value = ''
      messageType.value = ''
      loading.value = true

      try {
        const response = await axios.post('http://localhost:5000/api/auth/forgot-password', {
          email: email.value,
        })

        message.value =
          response.data.msg ||
          'Si cette adresse e-mail existe, un lien de réinitialisation a été envoyé.'
        messageType.value = 'success'
        email.value = ''
      } catch (err) {
        console.error(
          'Erreur lors de la demande de réinitialisation:',
          err.response ? err.response.data : err.message,
        )
        message.value =
          err.response && err.response.data && err.response.data.msg
            ? err.response.data.msg
            : 'Une erreur est survenue. Veuillez réessayer.'
        messageType.value = 'error'
      } finally {
        loading.value = false
      }
    }

    return {
      email,
      message,
      messageType,
      loading,
      handleForgotPassword,
    }
  },
}
</script>

<style scoped></style>
