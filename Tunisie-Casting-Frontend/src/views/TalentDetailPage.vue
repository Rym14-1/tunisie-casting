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
      <!-- Utilise le champ 'location' qui est maintenant formaté par le backend -->
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
          <router-link to="/subscription" class="font-bold text-blue-600 hover:underline"
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
          {{
            talent.languages && talent.languages.length > 0
              ? talent.languages.join(', ')
              : 'Non spécifié'
          }}
        </p>
        <!-- Ajoutez ici la galerie, vidéos, skills, styles si vous les affichez pour les abonnés -->
        <h4 class="text-xl font-bold text-gray-700 mt-6 mb-3">Galerie Photos</h4>
        <div
          v-if="talent.galleryPhotos && talent.galleryPhotos.length > 0"
          class="grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          <img
            v-for="(photo, index) in talent.galleryPhotos"
            :key="index"
            :src="photo"
            class="w-full h-32 object-cover rounded-md shadow-md"
            alt="Galerie Photo"
          />
        </div>
        <p v-else class="text-gray-600">Aucune photo de galerie disponible.</p>

        <h4 class="text-xl font-bold text-gray-700 mt-6 mb-3">Vidéos</h4>
        <div
          v-if="talent.videos && talent.videos.length > 0"
          class="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <video
            v-for="(video, index) in talent.videos"
            :key="index"
            :src="video"
            controls
            class="w-full h-40 object-cover rounded-md shadow-md"
          ></video>
        </div>
        <p v-else class="text-gray-600">Aucune vidéo disponible.</p>

        <p class="mb-2 mt-4">
          <span class="font-semibold">Styles :</span>
          {{
            talent.styles && talent.styles.length > 0 ? talent.styles.join(', ') : 'Non spécifié'
          }}
        </p>
        <p class="mb-2">
          <span class="font-semibold">Compétences :</span>
          {{
            talent.skills && talent.skills.length > 0 ? talent.skills.join(', ') : 'Non spécifié'
          }}
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
        const response = await axios.get(`http://localhost:5000/api/talents/${this.id}`)
        this.talent = response.data
        console.log('Talent Details:', this.talent)
      } catch (err) {
        console.error('Erreur lors du chargement du talent:', err.response?.data || err.message)
        this.error =
          'Impossible de charger le profil de ce talent. Il pourrait ne pas exister ou ne pas être un talent.'
      } finally {
        this.loading = false
      }
    },
    async checkSubscriptionStatus() {
      const token = localStorage.getItem('token')
      if (!token) {
        this.isSubscribed = false
        console.log('checkSubscriptionStatus: Aucun token trouvé, utilisateur non abonné.')
        return
      }

      try {
        const response = await axios.get('http://localhost:5000/api/subscriptions/status', {
          headers: { Authorization: `Bearer ${token}` },
        })
        this.isSubscribed = response.data.isSubscribed
        console.log("checkSubscriptionStatus: Statut d'abonnement:", this.isSubscribed)
      } catch (err) {
        console.error(
          "Erreur lors de la vérification du statut d'abonnement:",
          err.response?.data || err.message,
        )
        this.isSubscribed = false // Par défaut, non abonné en cas d'erreur
        // Si l'erreur est 401/403, cela peut indiquer un token invalide, donc déconnexion
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          console.log(
            "Token invalide ou expiré lors de la vérification d'abonnement. Déconnexion...",
          )
          // Optionnel: déconnecter l'utilisateur ici si vous voulez forcer la reconnexion
          // localStorage.removeItem('token');
          // this.$router.push('/login');
        }
      }
    },
  },
}
</script>

<style scoped></style>
