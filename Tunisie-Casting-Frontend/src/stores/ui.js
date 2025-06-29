// src/stores/ui.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUiStore = defineStore('ui', () => {
  const isLoading = ref(false)
  const alert = ref({
    show: false,
    message: '',
    type: 'info',
  })

  const startLoading = () => {
    isLoading.value = true
  }

  const stopLoading = () => {
    isLoading.value = false
  }

  const showAlert = (message, type = 'info', duration = 3000) => {
    alert.value = { show: true, message, type }
    if (duration > 0) {
      setTimeout(() => {
        hideAlert()
      }, duration)
    }
  }

  const hideAlert = () => {
    alert.value = { show: false, message: '', type: 'info' }
  }

  return { isLoading, alert, startLoading, stopLoading, showAlert, hideAlert }
})
