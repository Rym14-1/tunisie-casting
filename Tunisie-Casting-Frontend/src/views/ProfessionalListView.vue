<!-- src/views/ProfessionalListView.vue -->
<template>
  <div class="container mx-auto p-4 md:p-8">
    <h1 class="text-3xl md:text-4xl text-blue-700 font-extrabold mb-8 text-center">
      Découvrez nos professionnels techniques
    </h1>

    <div class="bg-white p-6 rounded-lg shadow-md mb-8">
      <h3 class="text-xl font-semibold text-gray-800 mb-4">Filtres de recherche</h3>
      <form
        @submit.prevent="applyFilters"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <div>
          <label for="specialty" class="block text-sm font-medium text-gray-700 mb-1"
            >Spécialité :</label
          >
          <select id="specialty" v-model="filters.specialty" class="input-field">
            <option value="">Toutes les spécialités</option>
            <option value="photographe">Photographe</option>
            <option value="videaste">Vidéaste</option>
            <option value="realisateur">Réalisateur</option>
            <option value="dop">DOP (Directeur de la photographie)</option>
            <option value="technicien_lumiere">Technicien lumière</option>
            <option value="technicien_son">Technicien son</option>
            <option value="community_manager">Community Manager</option>
            <option value="maquilleur">Maquilleur</option>
            <option value="coiffeur">Coiffeur</option>
            <option value="styliste">Styliste</option>
            <option value="regisseur">Régisseur</option>
            <option value="monteur">Monteur</option>
          </select>
        </div>
        <div>
          <label for="experience" class="block text-sm font-medium text-gray-700 mb-1"
            >Expérience :</label
          >
          <select id="experience" v-model="filters.experience" class="input-field">
            <option value="">Toutes expériences</option>
            <option value="junior">Junior (0-2 ans)</option>
            <option value="confirme">Confirmé (3-5 ans)</option>
            <option value="senior">Sénior (6+ ans)</option>
          </select>
        </div>
        <div>
          <label for="location" class="block text-sm font-medium text-gray-700 mb-1"
            >Localisation (Ville) :</label
          >
          <input
            type="text"
            id="location"
            v-model="filters.location"
            placeholder="Ex: Tunis, Sousse"
            class="input-field"
          />
        </div>
        <div class="md:col-span-2 lg:col-span-3 flex justify-end">
          <button type="submit" class="button primary">Appliquer les filtres</button>
        </div>
      </form>
    </div>

    <!-- Loading state -->
    <div v-if="loading" class="text-center text-blue-500 text-xl py-10 animate-pulse">
      Chargement des professionnels...
    </div>

    <!-- Error state -->
    <div v-else-if="error" class="text-center text-red-500 text-xl py-10">
      <p>{{ error }}</p>
      <button
        @click="fetchProfessionals(filters)"
        class="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
      >
        Réessayer
      </button>
    </div>

    <div
      v-else-if="professionals.length === 0"
      class="text-center text-gray-600 p-8 bg-white rounded-lg shadow-md"
    >
      <p>Aucun professionnel trouvé pour les critères de recherche.</p>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProfessionalCard
        v-for="professional in professionals"
        :key="professional.id"
        :professional="professional"
      />
    </div>

    <div
      v-if="showSubscriptionModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div class="bg-white rounded-lg p-8 shadow-xl max-w-md w-full text-center">
        <h3 class="text-2xl font-bold text-gray-900 mb-4">Accès réservé aux abonnés</h3>
        <p class="text-gray-700 mb-6">
          Pour consulter les fiches détaillées des professionnels et les contacter, veuillez
          souscrire à un abonnement.
        </p>
        <button @click="router.push('/subscription')" class="button primary mb-4">
          Voir les offres d'abonnement
        </button>
        <button @click="showSubscriptionModal = false" class="button secondary ml-2">Fermer</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import ProfessionalCard from '@/components/ProfessionalCard.vue'
import axios from 'axios'

const router = useRouter()
const authStore = useAuthStore()

const professionals = ref([])
const loading = ref(true)
const error = ref(null)

const filters = ref({
  specialty: '',
  experience: '',
  location: '',
})

const showSubscriptionModal = ref(false)

const fetchProfessionals = async (currentFilters) => {
  loading.value = true
  error.value = null
  try {
    const params = new URLSearchParams()
    if (currentFilters.specialty) params.append('specialty', currentFilters.specialty)
    if (currentFilters.experience) params.append('experience', currentFilters.experience)
    if (currentFilters.location) params.append('location', currentFilters.location)

    const response = await axios.get(
      `http://localhost:5000/api/users/professionals?${params.toString()}`,
    )

    professionals.value = response.data.map((user) => ({
      id: user._id,
      name: user.name,
      specialty: user.specialty,
      experience: user.experience,
      location: user.city,
      profilePic: user.profilePhotoUrl || 'https://placehold.co/150x150/CCCCCC/FFFFFF?text=PROFIL',
      shortBio: user.bio,
    }))
  } catch (err) {
    console.error(
      'Erreur lors du chargement des professionnels:',
      err.response ? err.response.data : err.message,
    )
    error.value = 'Impossible de charger les professionnels. Veuillez réessayer.'
  } finally {
    loading.value = false
  }
}

const applyFilters = () => {
  console.log('Filtres appliqués :', filters.value)
  fetchProfessionals(filters.value)
}

onMounted(() => {
  fetchProfessionals(filters.value)

  if (!authStore.isLoggedIn) {
    showSubscriptionModal.value = true
  }
})
</script>

<style scoped lang="postcss">
.input-field {
  @apply w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200;
}
.button {
  @apply px-6 py-2 rounded-md font-semibold transition-colors duration-200;
}
.button.primary {
  @apply bg-blue-600 text-white hover:bg-blue-700;
}
.button.secondary {
  @apply bg-gray-200 text-gray-800 hover:bg-gray-300;
}
</style>
