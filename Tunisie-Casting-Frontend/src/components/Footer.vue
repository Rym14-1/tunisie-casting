<template>
  <footer class="bg-gray-800 text-white p-6 mt-8">
    <div class="container mx-auto text-center text-sm">
      <p>&copy; {{ currentYear }} Tunisie Casting. Tous droits réservés.</p>
      <div class="mt-2 space-x-4">
        <router-link to="/mentions-legales" class="hover:text-gray-300"
          >Mentions Légales</router-link
        >
        <router-link to="/confidentialite" class="hover:text-gray-300"
          >Politique de Confidentialité</router-link
        >
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'

const currentYear = ref(new Date().getFullYear())
</script>

<style scoped></style>
