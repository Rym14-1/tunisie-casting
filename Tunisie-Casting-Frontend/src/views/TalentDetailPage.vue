<template>
  <div class="p-8 container mx-auto text-center">
    <h1 class="text-4xl font-bold text-gray-900 mb-4">Profil de {{ talent.name }}</h1>
    <div v-if="loading" class="text-xl text-gray-500 py-10">Chargement du profil...</div>
    <div v-else-if="error" class="text-xl text-red-500 py-10">{{ error }}</div>
    <div v-else-if="!talent.id" class="text-xl text-gray-600 py-10">Talent introuvable.</div>
    <div v-else class="bg-white rounded-lg shadow-xl p-8 max-w-2xl mx-auto">
      <img
        :src="talent.profilePic || 'https://via.placeholder.com/300x300/e2e8f0/6b7280?text=Profil'"
        :alt="`Photo de ${talent.name}`"
        class="w-48 h-48 rounded-full mx-auto object-cover mb-6 border-4 border-indigo-200"
      />
      <p class="text-indigo-600 font-semibold text-lg mb-2">{{ talent.category }}</p>
      <p class="text-gray-700 mb-4">{{ talent.location }}</p>
      <p class="text-gray-800 text-left mb-6">
        {{ talent.bio || 'Aucune biographie disponible pour le moment.' }}
      </p>

      <div
        v-if="!isSubscribed"
        class="mt-8 p-6 bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800 rounded-lg"
      >
        <p class="font-bold text-lg mb-2">Accès restreint !</p>
        <p>
          Pour voir les détails complets (contact, CV, galerie complète) de ce talent, veuillez
          <router-link to="/subscriptions" class="font-bold text-blue-600 hover:underline"
            >vous abonner</router-link
          >.
        </p>
      </div>

      <div v-else class="mt-8 text-left">
        <h3 class="text-2xl font-bold text-gray-800 mb-4">Informations Complètes</h3>
        <p class="mb-2"><span class="font-semibold">Email :</span> {{ talent.email }}</p>
        <p class="mb-2"><span class="font-semibold">Téléphone :</span> {{ talent.phone }}</p>
        <p class="mb-2">
          <span class="font-semibold">Langues :</span>
          {{ talent.languages.join(', ') || 'Non spécifié' }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'TalentDetailPage',
  props: ['id'],
  data() {
    return {
      talent: {},
      loading: false,
      error: null,
      isSubscribed: false,
    }
  },
  mounted() {
    this.fetchTalentDetails()
    this.checkSubscriptionStatus()
  },
  methods: {
    async fetchTalentDetails() {
      this.loading = true
      this.error = null
      try {
        const response = await axios.get(`http://localhost:3000/api/talents/${this.id}`) // remplacer par l'URL reel API

        this.talent = response.data
      } catch (err) {
        console.error('Erreur lors du chargement du talent:', err)
        this.error = 'Impossible de charger le profil de ce talent.'
      } finally {
        this.loading = false
      }
    },
    checkSubscriptionStatus() {
      //  ici que vous ferez un appel à votre API backend
      // pour vérifier si l'utilisateur actuellement connecté est abonné.
      // Pour l'instant, c'est simulé.
      this.isSubscribed = false
    },
  },
}
</script>

<style scoped></style>
