<template>
  <div class="p-6 bg-white rounded-lg shadow-xl border border-gray-200">
    <h2 class="text-2xl font-bold text-gray-800 mb-5">Filtrer les talents</h2>
    <form @submit.prevent="applyFilters">
      <div class="mb-4">
        <label for="category" class="block text-gray-700 text-sm font-semibold mb-2"
          >Catégorie :</label
        >
        <select
          id="category"
          v-model="filters.category"
          class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Toutes les catégories</option>
          <option value="acteur">Acteur</option>
          <option value="modele">Modèle</option>
          <option value="danseur">Danseur</option>
          <option value="musicien">Musicien</option>
          <option value="comedien">Comédien</option>
          <option value="chanteur">Chanteur</option>
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

      <div class="mb-4">
        <label for="gender" class="block text-gray-700 text-sm font-semibold mb-2">Sexe :</label>
        <select
          id="gender"
          v-model="filters.gender"
          class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="">Tous</option>
          <option value="homme">Homme</option>
          <option value="femme">Femme</option>
        </select>
      </div>

      <div class="mb-6">
        <label for="tags" class="block text-gray-700 text-sm font-semibold mb-2"
          >Mots-clés (tags) :</label
        >
        <input
          type="text"
          id="tags"
          v-model="filters.tags"
          placeholder="Ex: bilingue, classique, jeune..."
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
  name: 'TalentFilter',
  data() {
    return {
      filters: {
        category: '',
        location: '',
        gender: '',
        tags: '',
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
