<template>
  <div class="p-4 bg-gray-100 rounded-lg shadow-md">
    <h2 class="text-2xl font-semibold mb-4">Filtrer les talents</h2>
    <form @submit.prevent="applyFilters">
      <div class="mb-4">
        <label for="category" class="block text-gray-700 text-sm font-bold mb-2">Catégorie :</label>
        <select
          id="category"
          v-model="filters.category"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Toutes les catégories</option>
          <option value="acteur">Acteur</option>
          <option value="modele">Modèle</option>
          <option value="danseur">Danseur</option>
          <option value="musicien">Musicien</option>
        </select>
      </div>

      <div class="mb-4">
        <label for="location" class="block text-gray-700 text-sm font-bold mb-2"
          >Localisation :</label
        >
        <input
          type="text"
          id="location"
          v-model="filters.location"
          placeholder="Ville, Région..."
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div class="mb-6">
        <label for="tags" class="block text-gray-700 text-sm font-bold mb-2"
          >Mots-clés (tags) :</label
        >
        <input
          type="text"
          id="tags"
          v-model="filters.tags"
          placeholder="Ex: bilingue, classique..."
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
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
        tags: '',
      },
    }
  },
  methods: {
    applyFilters() {
      // Quand l'utilisateur clique sur "Appliquer les filtres",
      // on envoie les filtres à la page parente (TalentSearchPage)
      this.$emit('apply-filters', this.filters)
    },
  },
}
</script>

<style scoped>
/* Styles spécifiques au filtre, si nécessaire, au-delà de Tailwind */
</style>
