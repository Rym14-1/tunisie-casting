// src/stores/notifications.js
import { defineStore } from 'pinia'
import axios from 'axios'

export const useNotificationStore = defineStore('notifications', {
  state: () => ({
    notifications: [],
    unreadCount: 0,
    loading: false,
    error: null,
  }),
  getters: {
    getNotifications: (state) => state.notifications,
    getUnreadCount: (state) => state.unreadCount,
  },
  actions: {
    async fetchNotifications(userId) {
      this.loading = true
      this.error = null
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/${userId}/notifications`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          },
        )
        this.notifications = response.data
        this.unreadCount = response.data.filter((n) => !n.read).length
      } catch (err) {
        console.error('Erreur lors de la récupération des notifications:', err)
        this.error = 'Impossible de charger les notifications.'
      } finally {
        this.loading = false
      }
    },

    async markNotificationAsRead(notificationId, userId) {
      try {
        await axios.patch(
          `http://localhost:5000/api/notifications/${notificationId}/read`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          },
        )

        const notification = this.notifications.find((n) => n._id === notificationId)
        if (notification) {
          notification.read = true
          this.unreadCount--
        }
      } catch (err) {
        console.error('Erreur lors du marquage comme lu:', err)
        this.error = 'Erreur en marquant la notification comme lue.'
      }
    },

    addNotification(notification) {
      this.notifications.unshift(notification)
      if (!notification.read) {
        this.unreadCount++
      }
    },

    // Initialisation pour les WebSockets
    initializeSocket(userId) {
      /* Supposons que vous avez un client Socket.IO configuré
       import io from 'socket.io-client';
      const socket = io('http://localhost:5000'); // Ou l'URL de votre serveur WebSocket
       socket.on('connect', () => {
         console.log('Connecté au serveur WebSocket.');
         socket.emit('register', userId); // Enregistrer l'utilisateur connecté
       });
       socket.on('newNotification', (notification) => {
         console.log('Nouvelle notification reçue:', notification);
         this.addNotification(notification);
       });
       socket.on('disconnect', () => {
         console.log('Déconnecté du serveur WebSocket.');
       });*/
    },
  },
})
