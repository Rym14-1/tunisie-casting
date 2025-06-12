<!-- src/views/RegisterView.vue -->
<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100 p-4 font-inter">
    <div class="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
      <h1 class="text-3xl font-bold text-center text-gray-900 mb-8">Inscription</h1>
      <form @submit.prevent="handleRegister">
        <div class="mb-5">
          <label for="username" class="block text-gray-700 text-sm font-semibold mb-2"
            >Nom d'utilisateur</label
          >
          <input
            type="text"
            id="username"
            v-model="username"
            class="form-input w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
            placeholder="Votre nom d'utilisateur"
            required
          />
        </div>
        <div class="mb-5">
          <label for="email" class="block text-gray-700 text-sm font-semibold mb-2">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            class="form-input w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
            placeholder="votre.email@example.com"
            required
          />
        </div>
        <div class="mb-5">
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
          />
        </div>
        <div class="mb-6">
          <label for="confirm-password" class="block text-gray-700 text-sm font-semibold mb-2"
            >Confirmer le mot de passe</label
          >
          <input
            type="password"
            id="confirm-password"
            v-model="confirmPassword"
            class="form-input w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
            placeholder="********"
            required
          />
        </div>
        <div class="mb-6">
          <label for="role" class="block text-gray-700 text-sm font-semibold mb-2"
            >Vous êtes un(e)</label
          >
          <select
            id="role"
            v-model="role"
            class="form-select w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
            required
          >
            <!-- Valeurs corrigées pour correspondre à l'enum du backend -->
            <option value="talent">Talent</option>
            <option value="professional_tech">Professionnel Technique</option>
            <option value="casting_director">Directeur de Casting</option>
            <option value="admin">Administrateur</option>
          </select>
        </div>

        <!-- Zone pour afficher les messages de statut -->
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
          class="w-full bg-green-600 text-white font-bold py-3 rounded-md hover:bg-green-700 transition-colors duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          S'inscrire
        </button>
      </form>
      <p class="text-center text-gray-600 text-sm mt-6">
        Déjà un compte ?
        <router-link to="/login" class="text-blue-600 hover:underline font-semibold"
          >Connectez-vous ici</router-link
        >
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'RegisterView',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'talent',
      message: '',
      messageType: '',
    }
  },
  methods: {
    async handleRegister() {
      this.message = ''
      this.messageType = ''

      if (this.password !== this.confirmPassword) {
        this.message = 'Les mots de passe ne correspondent pas.'
        this.messageType = 'error'
        console.error('Les mots de passe ne correspondent pas')
        return
      }

      if (!this.username.trim()) {
        this.message = "Le nom d'utilisateur est requis."
        this.messageType = 'error'
        console.error("Le nom d'utilisateur est vide.")
        return
      }

      try {
        const response = await axios.post('http://localhost:5000/api/auth/register', {
          username: this.username,
          email: this.email,
          password: this.password,
          role: this.role,
        })

        this.message =
          response.data.msg || 'Inscription réussie ! Redirection vers la page de connexion...'
        this.messageType = 'success'

        if (response.data.token) {
          localStorage.setItem('token', response.data.token)
        } else {
          console.warn("Token non reçu après l'inscription.")
        }

        setTimeout(() => {
          this.$router.push('/login')
        }, 2000)
      } catch (err) {
        console.error(
          "Erreur lors de l'inscription:",
          err.response ? err.response.data : err.message,
        )
        this.message =
          err.response && err.response.data && err.response.data.message
            ? err.response.data.message // Si le backend envoie un 'message'
            : err.response && err.response.data && err.response.data.msg
              ? err.response.data.msg
              : "Erreur lors de l'inscription. Veuillez réessayer."
        this.messageType = 'error'
      }
    },
  },
}
</script>

<style scoped>
.font-inter {
  font-family: 'Inter', sans-serif;
}
</style>
