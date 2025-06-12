<template>
  <div class="professional-search-page container mx-auto p-4 md:p-8">
    <h1 class="text-4xl font-bold text-center text-gray-900 mb-10">
      Rechercher des professionnels techniques
    </h1>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
      <div class="md:col-span-1">
        <ProfessionalFilter @apply-filters="handleFilterChange" />
      </div>

      <div class="md:col-span-3">
        <div v-if="loading" class="text-center text-gray-500 text-xl py-10">
          Chargement des professionnels...
        </div>
        <div v-else-if="error" class="text-center text-red-500 text-xl py-10">{{ error }}</div>
        <div v-else-if="professionals.length === 0" class="text-center text-gray-600 text-xl py-10">
          Aucun professionnel trouvé avec ces critères.
        </div>
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProfessionalCard
            v-for="professional in professionals"
            :key="professional.id"
            :professional="professional"
            @view-details="navigateToProfessionalDetails"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProfessionalFilter from '../components/ProfessionalFilter.vue'
import ProfessionalCard from '../components/ProfessionalCard.vue'
import axios from 'axios'

export default {
  name: 'ProfessionalSearchPage',
  components: {
    ProfessionalFilter,
    ProfessionalCard,
  },
  data() {
    return {
      professionals: [],
      loading: false,
      error: null,
      filters: {},
    }
  },
  mounted() {
    this.fetchProfessionals()
  },
  methods: {
    async fetchProfessionals() {
      this.loading = true
      this.error = null
      try {
        // on va remplacer par l'URL reelle  API backend
        const response = await axios.get('http://localhost:3000/api/professionals', {
          params: this.filters,
        })
        this.professionals = response.data
      } catch (err) {
        console.error('Erreur lors du chargement des professionnels:', err)
        this.error =
          'Impossible de charger les professionnels. Le serveur est peut-être indisponible.'
      } finally {
        this.loading = false
      }
    },
    handleFilterChange(newFilters) {
      this.filters = { ...newFilters }
      this.fetchProfessionals()
    },
    navigateToProfessionalDetails(professionalId) {
      this.$router.push(`/professionals/${professionalId}`)
    },
  },
}
</script>

<style scoped></style>
