<template>
  <div class="container mx-auto p-4 md:p-8 bg-gray-50 min-h-screen">
    <h1 class="text-4xl font-bold text-center text-gray-900 mb-10">Messagerie & Collaborations</h1>
    <div
      class="bg-white p-8 rounded-xl shadow-lg w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-6 h-[calc(100vh-180px)]"
    >
      <div
        class="conversation-list-sidebar w-full md:w-1/4 flex-shrink-0 bg-gray-50 p-4 rounded-lg shadow-inner overflow-y-auto"
      >
        <h3 class="text-xl font-bold text-gray-800 mb-4 border-b pb-2">Mes Conversations</h3>
        <div v-if="loadingConversations" class="text-center text-gray-500 py-6 animate-pulse">
          Chargement des conversations...
        </div>
        <div v-else-if="errorLoadingConversations" class="text-center text-red-500 py-6">
          Erreur lors du chargement des conversations.
        </div>
        <ul v-else-if="conversations.length > 0">
          <li
            v-for="conv in conversations"
            :key="conv.id"
            @click="selectConversation(conv.id)"
            :class="[
              'p-3 mb-2 rounded-md cursor-pointer transition-colors duration-200 flex items-center justify-between',
              conv.id === selectedConversationId
                ? 'bg-blue-600 text-white font-semibold shadow-md'
                : 'bg-white hover:bg-gray-100 text-gray-800 border border-gray-200',
            ]"
          >
            <div>
              {{ conv.name || 'Conversation Inconnue' }}
              <span
                v-if="conv.unreadCount > 0 && conv.id !== selectedConversationId"
                class="ml-2 px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full"
              >
                {{ conv.unreadCount }}
              </span>
            </div>
            <span class="text-xs text-gray-400" v-if="conv.lastMessageTime">{{
              formatTimestamp(conv.lastMessageTime)
            }}</span>
          </li>
        </ul>
        <p v-else class="text-gray-600 text-center py-4">
          Vous n'avez pas encore de conversations.
        </p>
      </div>

      <div
        class="chat-window-area w-full md:w-3/4 flex-grow flex flex-col rounded-lg shadow bg-white"
      >
        <ChatWindow
          v-if="selectedConversationId"
          :currentConversationId="selectedConversationId"
          :currentUser="currentUser"
          @messageSent="handleMessageSent"
          @messagesLoaded="handleMessagesLoaded"
        />
        <div
          v-else
          class="flex items-center justify-center h-full bg-gray-100 rounded-lg text-gray-700 text-lg"
        >
          Veuillez sélectionner une conversation pour voir les messages.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChatWindow from '@/components/ChatWindow.vue'
import axios from 'axios'
import { io } from 'socket.io-client'

export default {
  name: 'MessagesPage',
  components: {
    ChatWindow,
  },
  data() {
    return {
      selectedConversationId: null,

      currentUser: { id: 102, name: 'Utilisateur Actuel (Vous)' },
      conversations: [],
      loadingConversations: true,
      errorLoadingConversations: false,
      socket: null,
    }
  },
  computed: {},
  watch: {
    currentUser: {
      handler(newVal, oldVal) {
        if (newVal && newVal.id && newVal.id !== (oldVal ? oldVal.id : null)) {
          this.fetchConversations()
          this.setupSocket()
        }
      },
      immediate: true,
    },
  },
  created() {
    if (this.currentUser && this.currentUser.id) {
      this.setupSocket()
    }
  },
  beforeUnmount() {
    // Déconnexion du socket avant que le composant ne soit détruit
    if (this.socket) {
      this.socket.disconnect()
    }
  },
  methods: {
    async fetchConversations() {
      this.loadingConversations = true
      this.errorLoadingConversations = false
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          console.warn("Aucun token d'authentification trouvé pour les conversations.")
        }
        const response = await axios.get(
          `http://localhost:3001/api/users/${this.currentUser.id}/conversations`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        )
        this.conversations = response.data

        if (this.conversations.length > 0 && !this.selectedConversationId) {
          this.selectedConversationId = this.conversations[0].id
        }
      } catch (error) {
        console.error('Erreur lors du chargement des conversations:', error)
        this.errorLoadingConversations = true

        this.conversations = [
          {
            id: 1,
            name: 'Conversation avec Alice (simulé)',
            unreadCount: 2,
            lastMessageTime: new Date().toISOString(),
          },
          {
            id: 2,
            name: 'Chat de groupe : Projet X (simulé)',
            unreadCount: 0,
            lastMessageTime: new Date(Date.now() - 3600000).toISOString(),
          },
        ]
        if (this.conversations.length > 0 && !this.selectedConversationId) {
          this.selectedConversationId = this.conversations[0].id
        }
      } finally {
        this.loadingConversations = false
      }
    },
    selectConversation(id) {
      this.selectedConversationId = id
      // Optionnel : Marquer la conversation comme lue côté frontend quand elle est sélectionnée
      const conv = this.conversations.find((c) => c.id === id)
      if (conv) {
        conv.unreadCount = 0 // Réinitialise le compteur non lu
        // Idéalement, envoyer une requête au backend pour marquer comme lue
        // this.markConversationAsReadOnBackend(id);
      }
    },

    setupSocket() {
      if (this.socket) {
        this.socket.disconnect()
      }
      // Connecte au serveur Socket.IO
      this.socket = io('http://localhost:3001', {
        query: { userId: this.currentUser.id, token: localStorage.getItem('token') },
      })

      this.socket.on('connect', () => {
        console.log('Connecté au serveur de messagerie Socket.IO')
      })

      this.socket.on('disconnect', () => {
        console.log('Déconnecté du serveur de messagerie Socket.IO')
      })

      this.socket.on('newMessage', (message) => {
        console.log('Nouveau message reçu via socket:', message)

        if (message.conversation_id === this.selectedConversationId) {
        } else {
          const conv = this.conversations.find((c) => c.id === message.conversation_id)
          if (conv) {
            conv.unreadCount = (conv.unreadCount || 0) + 1
            conv.lastMessageTime = new Date().toISOString() // Mettre à jour l'heure du dernier message
          }
        }

        this.conversations.sort(
          (a, b) => new Date(b.lastMessageTime || 0) - new Date(a.lastMessageTime || 0),
        )
      })

      this.socket.on('error', (error) => {
        console.error('Erreur Socket.IO:', error)
      })
    },
    handleMessageSent(message) {
      console.log(
        'Message envoyé depuis ChatWindow, rafraîchissement potentiel de la liste:',
        message,
      )

      const conv = this.conversations.find((c) => c.id === message.conversation_id)
      if (conv) {
        conv.lastMessageTime = new Date().toISOString()
        // Optionnel: remettre le unreadCount à 0 si l'utilisateur vient d'envoyer un message dedans
        // conv.unreadCount = 0;
      }
      this.conversations.sort(
        (a, b) => new Date(b.lastMessageTime || 0) - new Date(a.lastMessageTime || 0),
      )
    },
    handleMessagesLoaded(conversationId) {
      this.markConversationAsReadOnBackend(conversationId)
    },
    async markConversationAsReadOnBackend(conversationId) {
      try {
        const token = localStorage.getItem('token')

        await axios.put(
          `http://localhost:3001/api/conversations/${conversationId}/read`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        )
        console.log(`Conversation ${conversationId} marquée comme lue sur le backend.`)
      } catch (error) {
        console.error('Erreur lors du marquage de la conversation comme lue:', error)
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

<style scoped>
.h-\[calc\(100vh-180px\)\] {
  height: calc(100vh - 180px);
}
.conversation-list-sidebar {
  height: 100%;
}
.chat-window-area {
  height: 100%;
}
</style>
