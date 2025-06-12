<template>
  <div
    class="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
    @click="$emit('view-details', talent.id)"
  >
    <img
      :src="talent.profilePic || 'https://via.placeholder.com/400x300/e2e8f0/6b7280?text=Image'"
      :alt="`Photo de profil de ${talent.name}`"
      class="w-full h-48 object-cover"
    />
    <div class="p-4">
      <h3 class="text-xl font-bold text-gray-900 mb-1">{{ talent.name }}</h3>
      <p class="text-indigo-600 font-semibold mb-2">{{ talent.category }}</p>
      <p class="text-gray-600 text-sm mb-4">{{ talent.location }}</p>
      <button
        @click.stop="$emit('view-details', talent.id)"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full text-sm"
      >
        Voir le profil
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TalentCard',
  props: {
    talent: {
      type: Object,
      required: true,
      default: () => ({
        id: '0',
        name: 'Nom Inconnu',
        category: 'Non spécifié',
        location: 'Inconnu',
        profilePic: '',
      }),
    },
  },
}
</script>

<style scoped></style>
