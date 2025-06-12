<template>
  <div class="p-6 bg-white rounded-lg shadow-xl border border-gray-200">
    <h2 class="text-2xl font-bold text-gray-800 mb-5">Filtrer les professionnels</h2>
    <form @submit.prevent="applyFilters">
      <div class="mb-4">
        <label for="specialty" class="block text-gray-700 text-sm font-semibold mb-2"
          >Spécialité :</label
        >
        <select
          id="specialty"
          v-model="filters.specialty"
          class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Toutes les spécialités</option>
          <option value="photographe">Photographe</option>
          <option value="videaste">Vidéaste</option>
          <option value="realisateur">Réalisateur</option>
          <option value="dop">DOP</option>
          <option value="son">Technicien Son</option>
          <option value="lumiere">Technicien Lumière</option>
          <option value="community manager">Community Manager</option>
        </select>
      </div>

      <div class="mb-4">
        <label for="location" class="block text-gray-700 text-sm font-semibold mb-2"
          >Localisation :</label
        >
        <input
          type="text"
          id="location"
          v-model="filters.location"
          placeholder="Ex: Tunis, Sousse..."
          class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <div class="mb-6">
        <label for="experience" class="block text-gray-700 text-sm font-semibold mb-2"
          >Expérience (années) :</label
        >
        <input
          type="number"
          id="experience"
          v-model.number="filters.experience"
          placeholder="Minimum années d'expérience"
          class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      <button
        type="submit"
        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Appliquer les filtres
      </button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'ProfessionalFilter',
  data() {
    return {
      filters: {
        specialty: '',
        location: '',
        experience: null,
      },
    }
  },
  methods: {
    applyFilters() {
      this.$emit('apply-filters', this.filters)
    },
  },
}
</script>

<style scoped></style>
