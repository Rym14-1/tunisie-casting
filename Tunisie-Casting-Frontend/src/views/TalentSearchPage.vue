<template>
  <div class="talent-search-page container mx-auto p-4 md:p-8">
    <h1 class="text-4xl font-bold text-center text-gray-900 mb-10">Rechercher des talents</h1>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
      <div class="md:col-span-1">
        <TalentFilter @apply-filters="handleFilterChange" />
      </div>

      <div class="md:col-span-3">
        <div v-if="loading" class="text-center text-blue-500 text-xl py-10 animate-pulse">
          Chargement des talents...
        </div>
        <div v-else-if="error" class="text-center text-red-500 text-xl py-10">
          <p>{{ error }}</p>
          <button
            @click="fetchTalents"
            class="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
          >
            Réessayer
          </button>
        </div>
        <div v-else-if="talents.length === 0" class="text-center text-gray-600 text-xl py-10">
          Aucun talent trouvé avec ces critères.
        </div>
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <TalentCard
            v-for="talent in talents"
            :key="talent._id"
            :talent="talent"
            @view-details="navigateToTalentDetails"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import TalentFilter from '../components/TalentFilter.vue'
import TalentCard from '../components/TalentCard.vue'

const router = useRouter()

const talents = ref([])
const loading = ref(false)
const error = ref(null)
const filters = ref({
  category: '',
  city: '',
  region: '',
  languages: [],
  styles: [],
  skills: [],
  gender: '',
})

//  pour récupérer les talents depuis l'API
const fetchTalents = async () => {
  loading.value = true
  error.value = null
  try {
    const params = new URLSearchParams()
    if (filters.value.category) params.append('category', filters.value.category)
    if (filters.value.city) params.append('city', filters.value.city)
    if (filters.value.region) params.append('region', filters.value.region)
    if (filters.value.languages.length > 0)
      params.append('languages', filters.value.languages.join(','))
    if (filters.value.styles.length > 0) params.append('styles', filters.value.styles.join(','))
    if (filters.value.skills.length > 0) params.append('skills', filters.value.skills.join(','))
    if (filters.value.gender) params.append('gender', filters.value.gender)

    const response = await axios.get(`http://localhost:5000/api/talents?${params.toString()}`)
    talents.value = response.data //  backend devrait renvoyer directement un tableau de talents
  } catch (err) {
    console.error('Erreur lors du chargement des talents:', err.response?.data || err.message)
    error.value =
      err.response?.data?.message ||
      'Impossible de charger les talents. Le serveur est peut-être indisponible.'
  } finally {
    loading.value = false
  }
}

const handleFilterChange = (newFilters) => {
  filters.value = { ...filters.value, ...newFilters }
  fetchTalents()
}

const navigateToTalentDetails = (talentId) => {
  router.push(`/talentdetail/${talentId}`)
}

onMounted(() => {
  fetchTalents()
})
</script>

<style scoped></style>
