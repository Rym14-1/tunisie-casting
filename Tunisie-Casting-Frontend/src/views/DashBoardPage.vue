<template>
  <div class="container mx-auto p-4 md:p-8 bg-gray-50 min-h-screen">
    <h1 class="text-4xl font-bold text-center text-gray-900 mb-10">Mon Tableau de Bord</h1>
    <div class="bg-white p-8 rounded-xl shadow-lg w-full max-w-6xl mx-auto">
      <p class="text-gray-700 text-lg mb-8 text-center">
        Bienvenue sur votre tableau de bord ! Retrouvez ici toutes les informations et outils pour
        gérer votre activité sur Tunisie Casting.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <div
          class="bg-blue-100 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 text-center"
        >
          <h3 class="text-xl font-bold text-blue-800 mb-3">Mon Profil</h3>
          <p class="text-gray-700 mb-4">
            Mettez à jour vos informations personnelles et votre portfolio.
          </p>
          <router-link
            to="/userprofil"
            class="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Gérer le profil
          </router-link>
        </div>

        <div
          class="bg-green-100 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 text-center"
        >
          <h3 class="text-xl font-bold text-green-800 mb-3">Mon Abonnement</h3>
          <p class="text-gray-700 mb-4">Consultez les détails de votre abonnement actuel.</p>
          <router-link
            to="/subscription"
            class="inline-block bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Voir l'abonnement
          </router-link>
        </div>

        <div
          class="bg-yellow-100 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 text-center"
        >
          <h3 class="text-xl font-bold text-yellow-800 mb-3">Messagerie & Collaborations</h3>
          <p class="text-gray-700 mb-4">Accédez à votre messagerie et suivez vos demandes.</p>
          <router-link
            to="/messages"
            class="inline-block bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700"
          >
            Voir les messages
          </router-link>
        </div>
      </div>

      <section class="my-8 p-6 bg-red-50 rounded-xl shadow-lg border border-red-200">
        <h2 class="text-3xl font-bold text-red-800 mb-6 text-center">
          Mes Notifications ({{ unreadNotificationsCount }})
        </h2>
        <div v-if="loadingNotifications" class="text-center text-gray-500 py-6 animate-pulse">
          Chargement des notifications...
        </div>
        <div v-else-if="notifications.length === 0" class="text-center text-gray-600 py-6">
          Vous n'avez aucune notification.
        </div>
        <div v-else>
          <div
            v-for="notification in notifications"
            :key="notification.id"
            :class="[
              'flex items-center justify-between p-4 mb-3 rounded-lg shadow-sm',
              notification.read
                ? 'bg-gray-100 text-gray-600'
                : 'bg-red-100 text-red-800 font-semibold',
            ]"
          >
            <div class="flex-grow text-left">
              <p :class="{ 'font-bold': !notification.read }">{{ notification.message }}</p>
              <p class="text-xs text-gray-500 mt-1">
                {{ formatTimestamp(notification.timestamp) }}
              </p>
            </div>
            <div class="flex space-x-2 ml-4">
              <button
                v-if="!notification.read"
                @click="markAsRead(notification.id)"
                class="bg-blue-500 text-white text-sm px-3 py-1 rounded-md hover:bg-blue-600 transition-colors duration-200"
              >
                Marquer lu
              </button>
              <button
                @click="deleteNotification(notification.id)"
                class="bg-gray-400 text-white text-sm px-3 py-1 rounded-md hover:bg-gray-500 transition-colors duration-200"
              >
                Supprimer
              </button>
            </div>
          </div>
          <div class="text-center mt-6">
            <button
              v-if="notifications.length > 0"
              @click="confirmClearAllNotifications"
              class="bg-red-600 text-white font-bold py-2 px-6 rounded-md hover:bg-red-700 transition-colors duration-300"
            >
              Supprimer toutes les notifications
            </button>
          </div>
        </div>
      </section>

      <div class="mt-12 text-center">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">Accès Rapide</h2>
        <div class="flex flex-wrap justify-center gap-4">
          <router-link
            to="/searchtalent"
            class="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 shadow-md"
          >
            Rechercher Talents
          </router-link>
          <router-link
            to="/prolist"
            class="bg-purple-500 text-white px-6 py-3 rounded-md hover:bg-purple-600 shadow-md"
          >
            Rechercher Professionnels
          </router-link>
          <router-link
            to="/formation"
            class="bg-teal-500 text-white px-6 py-3 rounded-md hover:bg-teal-600 shadow-md"
          >
            Découvrir Formations
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'DashboardPage',
  data() {
    return {
      loadingNotifications: true,
      notifications: [],
    }
  },
  computed: {
    unreadNotificationsCount() {
      return this.notifications.filter((n) => !n.isRead).length
    },
  },
  mounted() {
    this.fetchNotifications()

    window.addEventListener('storage', this.handleStorageChange)
  },
  beforeUnmount() {
    window.removeEventListener('storage', this.handleStorageChange)
  },
  methods: {
    handleStorageChange(event) {
      if (event.key === 'token' || event.key === 'newNotificationEvent') {
        console.log('Dashboard: Changement de storage détecté, re-fetching notifications.')
        this.fetchNotifications()
      }
    },
    async fetchNotifications() {
      this.loadingNotifications = true
      this.error = null
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          console.warn(
            "Aucun token d'authentification trouvé. Les notifications pourraient ne pas être chargées.",
          )
          this.notifications = []
          return
        }

        const response = await axios.get('http://localhost:5000/api/user/notifications', {
          headers: { Authorization: `Bearer ${token}` },
        })

        this.notifications = response.data.map((notification) => ({
          ...notification,
          read: notification.isRead,
          id: notification._id,
        }))
      } catch (err) {
        console.error('Erreur lors du chargement des notifications:', err)
        this.notifications = []
        this.error = 'Impossible de charger vos notifications. Veuillez réessayer.'
      } finally {
        this.loadingNotifications = false
      }
    },
    async markAsRead(notificationId) {
      const notification = this.notifications.find((n) => n.id === notificationId)
      if (notification && !notification.read) {
        const originalReadState = notification.read
        notification.read = true

        try {
          const token = localStorage.getItem('token')
          // *** Utiliser le port 5000 ***
          await axios.put(
            `http://localhost:5000/api/notifications/${notificationId}/read`,
            {},
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          )
          console.log(`Notification ${notificationId} marquée comme lue sur le serveur.`)

          notification.isRead = true
        } catch (error) {
          console.error('Erreur lors de la mise à jour de la notification:', error)
          notification.read = originalReadState
        }
      }
    },
    async deleteNotification(notificationId) {
      const originalNotifications = [...this.notifications]
      this.notifications = this.notifications.filter((n) => n.id !== notificationId)

      try {
        const token = localStorage.getItem('token')
        await axios.delete(`http://localhost:5000/api/notifications/${notificationId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        console.log(`Notification ${notificationId} supprimée du serveur.`)
      } catch (error) {
        console.error('Erreur lors de la suppression de la notification:', error)
        this.notifications = originalNotifications
      }
    },
    async confirmClearAllNotifications() {
      const isConfirmed = window.confirm(
        'Êtes-vous sûr de vouloir supprimer toutes les notifications ? Cette action est irréversible.',
      )

      if (isConfirmed) {
        this.clearAllNotifications()
      } else {
        console.log('Suppression de toutes les notifications annulée.')
      }
    },
    async clearAllNotifications() {
      const originalNotifications = [...this.notifications]
      this.notifications = []

      try {
        const token = localStorage.getItem('token')

        await axios.delete('http://localhost:5000/api/user/notifications', {
          headers: { Authorization: `Bearer ${token}` },
        })
        console.log('Toutes les notifications ont été supprimées du serveur.')
      } catch (error) {
        console.error('Erreur lors de la suppression de toutes les notifications:', error)
        this.notifications = originalNotifications
      }
    },

    formatTimestamp(isoString) {
      if (!isoString) return ''
      const date = new Date(isoString)

      return date.toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      })
    },
  },
}
</script>

<style scoped></style>
