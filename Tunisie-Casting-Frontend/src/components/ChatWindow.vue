<template>
  <div class="chat-container">
    <div class="messages-list" ref="messagesContainer">
      <p v-if="messages.length === 0" class="no-messages">
        Aucun message pour le moment. Démarrez une conversation !
      </p>
      <div
        v-for="message in messages"
        :key="message.id"
        :class="['message', message.senderId === currentUser.id ? 'sent' : 'received']"
      >
        <span class="sender-name">
          {{ message.senderId === currentUser.id ? 'Vous' : message.senderName }}
        </span>
        <p class="message-content">{{ message.content }}</p>
        <span class="timestamp">{{ formatTimestamp(message.timestamp) }}</span>
      </div>
      <div ref="scrollAnchor"></div>
    </div>

    <form @submit.prevent="sendMessage" class="message-input-form">
      <input
        type="text"
        v-model="newMessage"
        placeholder="Écrivez votre message..."
        class="message-input"
        :disabled="!currentConversationId"
      />
      <button
        type="submit"
        class="send-button"
        :disabled="!newMessage.trim() || !currentConversationId"
      >
        Envoyer
      </button>
    </form>
  </div>
</template>

<script>
import io from 'socket.io-client'
export default {
  name: 'ChatWindow',
  props: {
    currentConversationId: {
      type: Number,
      default: null,
    },
    currentUser: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      messages: [],
      newMessage: '',
      socket: null,
    }
  },
  watch: {
    currentConversationId: {
      immediate: true,
      handler(newId, oldId) {
        if (newId) {
          this.fetchMessages(newId)

          if (this.socket) {
            if (oldId) {
              this.socket.emit('leaveConversation', oldId)
            }
            this.socket.emit('joinConversation', newId)
          }
        } else {
          this.messages = []
        }
      },
    },
    messages: {
      handler() {
        this.$nextTick(() => {
          this.scrollToBottom()
        })
      },
      deep: true,
    },
  },
  mounted() {
    this.socket = io('http://localhost:5000')

    this.socket.on('connect', () => {
      console.log('Connecté au serveur WebSocket')
      if (this.currentConversationId) {
        this.socket.emit('joinConversation', this.currentConversationId)
      }
    })

    this.socket.on('newMessage', (message) => {
      // Ajouter le message seulement s'il appartient à la conversation active
      if (message.conversationId === this.currentConversationId) {
        this.messages.push(message)
      }
    })

    this.socket.on('disconnect', () => {
      console.log('Déconnecté du serveur WebSocket')
    })

    this.socket.on('connect_error', (error) => {
      console.error('Erreur de connexion WebSocket:', error)
    })
  },
  beforeUnmount() {
    if (this.socket) {
      if (this.currentConversationId) {
        this.socket.emit('leaveConversation', this.currentConversationId)
      }
      this.socket.disconnect()
    }
  },
  methods: {
    async fetchMessages(conversationId) {
      console.log(`Chargement des messages pour la conversation ${conversationId}...`)
      try {
        const response = await fetch(
          `http://localhost:3001/api/conversations/${conversationId}/messages`,
        )
        if (!response.ok) throw new Error('Échec du chargement des messages')
        const data = await response.json()
        this.messages = data
      } catch (error) {
        console.error('Erreur lors du chargement des messages:', error)
        this.messages = []
      }
    },

    async sendMessage() {
      if (!this.newMessage.trim() || !this.currentConversationId) return

      const messagePayload = {
        conversationId: this.currentConversationId,
        senderId: this.currentUser.id,
        senderName: this.currentUser.name,
        content: this.newMessage.trim(),
      }

      try {
        const response = await fetch(
          `http://localhost:3001/api/conversations/${this.currentConversationId}/messages`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(messagePayload),
          },
        )
        if (!response.ok) throw new Error("Échec de l'envoi du message via API HTTP")

        this.newMessage = ''
      } catch (error) {
        console.error("Erreur lors de l'envoi du message:", error)
      }
    },

    scrollToBottom() {
      const container = this.$refs.messagesContainer
      if (container) {
        container.scrollTop = container.scrollHeight
      }
    },

    formatTimestamp(isoString) {
      const date = new Date(isoString)

      return date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
    },
  },
}
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 600px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  background-color: #f9f9f9;
}

.messages-list {
  flex-grow: 1;
  padding: 15px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.message {
  max-width: 70%;
  padding: 10px 15px;
  border-radius: 20px;
  margin-bottom: 10px;
  position: relative;
  font-size: 0.95em;
  word-wrap: break-word;
}

.message.sent {
  align-self: flex-end;
  background-color: #007bff;
  color: white;
  border-bottom-right-radius: 5px;
}

.message.received {
  align-self: flex-start;
  background-color: #e0e0e0;
  color: #333;
  border-bottom-left-radius: 5px;
}

.sender-name {
  display: block;
  font-size: 0.8em;
  font-weight: bold;
  margin-bottom: 3px;
  color: #555;
}
.message.sent .sender-name {
  color: rgba(255, 255, 255, 0.8);
}

.message-content {
  margin: 0;
  line-height: 1.4;
}

.timestamp {
  display: block;
  font-size: 0.7em;
  color: #888;
  margin-top: 5px;
  text-align: right;
}
.message.sent .timestamp {
  color: rgba(255, 255, 255, 0.7);
}

.message-input-form {
  display: flex;
  padding: 15px;
  border-top: 1px solid #eee;
  background-color: #fff;
}

.message-input {
  flex-grow: 1;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 25px;
  margin-right: 10px;
  font-size: 1em;
  outline: none;
}

.message-input:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

.send-button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 25px;
  padding: 10px 20px;
  font-size: 1em;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.send-button:hover {
  background-color: #0056b3;
}

.send-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.no-messages {
  text-align: center;
  color: #777;
  margin-top: 20px;
}
</style>
