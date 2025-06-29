<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100 p-4">
    <div class="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
      <h1 class="text-3xl font-bold text-center text-gray-900 mb-8">
        Réinitialiser le mot de passe
      </h1>
      <p class="text-gray-700 text-center mb-6">Entrez votre nouveau mot de passe.</p>
      <form @submit.prevent="handleResetPassword">
        <div class="mb-5">
          <label for="password" class="block text-gray-700 text-sm font-semibold mb-2"
            >Nouveau mot de passe</label
          >
          <input
            type="password"
            id="password"
            v-model="password"
            class="form-input w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
            placeholder="********"
            required
          />
        </div>
        <div class="mb-6">
          <label for="confirmPassword" class="block text-gray-700 text-sm font-semibold mb-2"
            >Confirmer le nouveau mot de passe</label
          >
          <input
            type="password"
            id="confirmPassword"
            v-model="confirmPassword"
            class="form-input w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
            placeholder="********"
            required
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
          <span v-if="loading">Réinitialisation en cours...</span>
          <span v-else>Réinitialiser le mot de passe</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default {
  name: 'ResetPasswordView',
  setup() {
    const password = ref('')
    const confirmPassword = ref('')
    const message = ref('')
    const messageType = ref('')
    const loading = ref(false)
    const token = ref(null)

    const route = useRoute()
    const router = useRouter()

    onMounted(() => {
      token.value = route.query.token || null
      if (!token.value) {
        message.value = 'Lien de réinitialisation invalide ou manquant.'
        messageType.value = 'error'
      }
    })

    const handleResetPassword = async () => {
      message.value = ''
      messageType.value = ''
      loading.value = true

      if (!token.value) {
        message.value = 'Lien de réinitialisation invalide ou manquant.'
        messageType.value = 'error'
        loading.value = false
        return
      }

      if (password.value !== confirmPassword.value) {
        message.value = 'Les mots de passe ne correspondent pas.'
        messageType.value = 'error'
        loading.value = false
        return
      }

      try {
        const response = await axios.post('http://localhost:5000/api/auth/reset-password', {
          token: token.value,
          newPassword: password.value,
        })

        message.value = response.data.msg || 'Votre mot de passe a été réinitialisé avec succès !'
        messageType.value = 'success'

        setTimeout(() => {
          router.push('/login')
        }, 2000)
      } catch (err) {
        console.error(
          'Erreur lors de la réinitialisation du mot de passe:',
          err.response ? err.response.data : err.message,
        )
        message.value =
          err.response && err.response.data && err.response.data.msg
            ? err.response.data.msg
            : 'Une erreur est survenue lors de la réinitialisation. Le lien pourrait être invalide ou expiré.'
        messageType.value = 'error'
      } finally {
        loading.value = false
      }
    }

    return {
      password,
      confirmPassword,
      message,
      messageType,
      loading,
      handleResetPassword,
    }
  },
}
</script>

<style scoped></style>
