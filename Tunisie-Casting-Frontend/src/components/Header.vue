<!-- frontend/src/components/Navbar.vue -->
<template>
  <header class="bg-blue-700 text-white p-4 shadow-md">
    <div class="container mx-auto flex flex-col md:flex-row justify-between items-center">
      <router-link
        to="/"
        class="text-2xl font-bold text-white rounded-md p-2 hover:bg-blue-600 transition-colors duration-300"
      >
        Tunisie Casting
      </router-link>

      <nav class="mt-4 md:mt-0">
        <ul class="flex flex-wrap justify-center items-center md:space-x-6 space-x-2">
          <li>
            <router-link
              to="/"
              class="text-white hover:text-blue-200 px-3 py-2 rounded-md transition-colors duration-300"
              >Accueil</router-link
            >
          </li>
          <li>
            <router-link
              to="/talentsearch"
              class="text-white hover:text-blue-200 px-3 py-2 rounded-md transition-colors duration-300"
              >Rechercher Talents</router-link
            >
          </li>
          <li>
            <router-link
              to="/prolist"
              class="text-white hover:text-blue-200 px-3 py-2 rounded-md transition-colors duration-300"
              >Professionnels</router-link
            >
          </li>
          <li>
            <router-link
              to="/prosearch"
              class="text-white hover:text-blue-200 px-3 py-2 rounded-md transition-colors duration-300"
              >Recherche Pro</router-link
            >
          </li>
          <li>
            <router-link
              to="/services"
              class="text-white hover:text-blue-200 px-3 py-2 rounded-md transition-colors duration-300"
              >Services</router-link
            >
          </li>
          <li>
            <router-link
              to="/formation"
              class="text-white hover:text-blue-200 px-3 py-2 rounded-md transition-colors duration-300"
              >Formations</router-link
            >
          </li>
          <li>
            <router-link
              to="/subscription"
              class="text-white hover:text-blue-200 px-3 py-2 rounded-md transition-colors duration-300"
              >Abonnements</router-link
            >
          </li>
          <li>
            <router-link
              to="/contact"
              class="text-white hover:text-blue-200 px-3 py-2 rounded-md transition-colors duration-300"
              >Contact</router-link
            >
          </li>

          <!-- Boutons affichés si l'utilisateur N'EST PAS authentifié -->
          <template v-if="!isAuthenticated">
            <li>
              <router-link
                to="/login"
                class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300"
                >Connexion</router-link
              >
            </li>
            <li>
              <router-link
                to="/register"
                class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 ml-2"
                >Inscription</router-link
              >
            </li>
          </template>

          <!-- Boutons affichés si l'utilisateur EST authentifié -->
          <template v-else>
            <li>
              <router-link
                to="/dashboard"
                class="text-white hover:text-blue-200 px-3 py-2 rounded-md transition-colors duration-300"
                >Tableau de Bord</router-link
              >
            </li>
            <li>
              <router-link
                to="/userprofil"
                class="text-white hover:text-blue-200 px-3 py-2 rounded-md transition-colors duration-300"
                >Mon Profil</router-link
              >
            </li>
            <li>
              <button
                @click="handleLogout"
                class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 cursor-pointer ml-2"
              >
                Déconnexion
              </button>
            </li>
          </template>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const isAuthenticated = ref(false)
const router = useRouter()

const checkAuth = async () => {
  const token = localStorage.getItem('token')
  console.log('Navbar: checkAuth() démarré. Token dans localStorage:', !!token)

  if (!token) {
    isAuthenticated.value = false
    console.log('Navbar: Aucun token trouvé. Non authentifié.')
    return
  }

  try {
    console.log('Navbar: Tentative de validation du token avec /api/profile/me...')

    const response = await axios.get('http://localhost:5000/api/profile/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
    isAuthenticated.value = true
    console.log(
      'Navbar: Token validé par le backend (Statut:',
      response.status,
      "). L'utilisateur est authentifié. isAuthenticated:",
      isAuthenticated.value,
    )
  } catch (error) {
    console.error(
      'Navbar: La validation du token a échoué:',
      error.response ? error.response.status : error.message,
    )
    localStorage.removeItem('token')
    localStorage.removeItem('userRole')
    localStorage.removeItem('userId')
    localStorage.removeItem('userData')
    isAuthenticated.value = false
    console.log(
      "Navbar: Token invalide effacé. L'utilisateur n'est pas authentifié. isAuthenticated:",
      isAuthenticated.value,
    )
  }
}

const handleLogout = () => {
  console.log('Navbar: Déconnexion initiée.')
  localStorage.removeItem('token')
  localStorage.removeItem('userRole')
  localStorage.removeItem('userId')
  localStorage.removeItem('userData')
  isAuthenticated.value = false
  console.log('Navbar: Token et données supprimés. isAuthenticated:', isAuthenticated.value)
  router.push('/login')
}

const handleStorageChange = (event) => {
  console.log('Navbar: Événement "storage" détecté:', event)
  if (
    event.key === 'token' ||
    event.key === 'userRole' ||
    event.key === 'userId' ||
    event.key === null
  ) {
    console.log(
      "Navbar: Changement de clé pertinente détecté dans localStorage. Re-vérification de l'authentification.",
    )
    checkAuth()
  }
}

onMounted(() => {
  console.log("Navbar: Composant monté. Effectue la vérification initiale de l'authentification.")
  checkAuth()
  window.addEventListener('storage', handleStorageChange)
})

onUnmounted(() => {
  console.log('Navbar: Composant démonté. Nettoyage de l\'écouteur "storage".')
  window.removeEventListener('storage', handleStorageChange)
})
</script>

<style scoped></style>
