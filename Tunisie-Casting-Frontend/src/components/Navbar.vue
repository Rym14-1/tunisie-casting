<template>
  <nav class="p-4 bg-gray-800 text-white flex justify-between items-center shadow-md">
    <div class="text-xl font-bold">
      <router-link to="/">Tunisie Casting</router-link>
    </div>
    <div>
      <router-link to="/" class="mr-4 hover:text-blue-300">Accueil</router-link>
      <router-link to="/talents" class="mr-4 hover:text-blue-300"
        >Rechercher des talents</router-link
      >
      <router-link to="/professionals" class="mr-4 hover:text-blue-300"
        >Professionnels techniques</router-link
      >
      <router-link to="/formations" class="mr-4 hover:text-blue-300">Formations</router-link>
      <router-link to="/subscriptions" class="mr-4 hover:text-blue-300">Abonnements</router-link>
      <router-link to="/about-us" class="mr-4 hover:text-blue-300">À propos</router-link>
      <router-link to="/contact" class="hover:text-blue-300">Contact</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
}
</script>

<style scoped>
/* Les styles Tailwind sont déjà dans le template.
   Utilisez <style scoped> pour des styles qui n'affectent que ce composant. */
</style>
