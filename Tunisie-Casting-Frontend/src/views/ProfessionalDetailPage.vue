<template>
  <div class="p-8 container mx-auto text-center">
    <h1 class="text-4xl font-bold text-gray-900 mb-4">Profil de {{ professional.name }}</h1>
    <div v-if="loading" class="text-xl text-gray-500 py-10">Chargement du profil...</div>
    <div v-else-if="error" class="text-xl text-red-500 py-10">{{ error }}</div>
    <div v-else-if="!professional.id" class="text-xl text-gray-600 py-10">
      Professionnel introuvable.
    </div>
    <div v-else class="bg-white rounded-lg shadow-xl p-8 max-w-2xl mx-auto">
      <img
        :src="
          professional.profilePic || 'https://via.placeholder.com/300x300/e2e8f0/6b7280?text=Profil'
        "
        :alt="`Photo de ${professional.name}`"
        class="w-48 h-48 rounded-full mx-auto object-cover mb-6 border-4 border-green-200"
      />
      <p class="text-green-600 font-semibold text-lg mb-2">{{ professional.specialty }}</p>
      <p class="text-gray-700 mb-4">{{ professional.location }}</p>
      <p class="text-gray-800 text-left mb-6">
        {{ professional.bio || 'Aucune biographie disponible pour le moment.' }}
      </p>

      <div
        v-if="!isSubscribed"
        class="mt-8 p-6 bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800 rounded-lg"
      >
        <p class="font-bold text-lg mb-2">Accès restreint !</p>
        <p>
          Pour voir les détails complets (contact, portfolio, tarifs) de ce professionnel, veuillez
          <router-link to="/subscriptions" class="font-bold text-blue-600 hover:underline"
            >vous abonner</router-link
          >.
        </p>
      </div>

      <div v-else class="mt-8 text-left">
        <h3 class="text-2xl font-bold text-gray-800 mb-4">Informations Complètes</h3>
        <p class="mb-2"><span class="font-semibold">Email :</span> {{ professional.email }}</p>
        <p class="mb-2"><span class="font-semibold">Téléphone :</span> {{ professional.phone }}</p>
        <p class="mb-2">
          <span class="font-semibold">Portfolio :</span>
          <a :href="professional.portfolioUrl" target="_blank" class="text-blue-600 hover:underline"
            >Voir le portfolio</a
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ProfessionalDetailPage',
  props: ['id'],
  data() {
    return {
      professional: {},
      loading: false,
      error: null,
      isSubscribed: false,
    }
  },
  mounted() {
    this.fetchProfessionalDetails()
    this.checkSubscriptionStatus()
  },
  methods: {
    async fetchProfessionalDetails() {
      this.loading = true
      this.error = null
      try {
        const response = await axios.get(`http://localhost:5000/api/professionals/${this.id}`)
        this.professional = response.data
      } catch (err) {
        console.error('Erreur lors du chargement du professionnel:', err)
        this.error = 'Impossible de charger le profil de ce professionnel.'
      } finally {
        this.loading = false
      }
    },
    checkSubscriptionStatus() {
      this.isSubscribed = false
    },
  },
}
</script>

<style scoped></style>
