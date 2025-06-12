<template>
  <div
    class="bg-white rounded-lg shadow-lg-custom overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out"
  >
    <img :src="professional.profilePic" :alt="professional.name" class="w-full h-48 object-cover" />
    <div class="p-6">
      <h3 class="text-xl font-bold text-gray-900 mb-2">{{ professional.name }}</h3>
      <p class="text-blue-600 font-semibold mb-2">{{ formatSpecialty(professional.specialty) }}</p>
      <p class="text-gray-700 text-sm mb-3">{{ professional.shortBio }}</p>
      <div class="text-gray-600 text-xs mb-4">
        <span class="mr-3">Expérience: {{ formatExperience(professional.experience) }}</span>
        <span>Localisation: {{ professional.location }}</span>
      </div>
      <button @click="viewProfile" class="button primary w-full">Voir le profil</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, inject } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const props = defineProps({
  professional: {
    type: Object,
    required: true,
  },
})

const router = useRouter()
const authStore = useAuthStore()

const formatSpecialty = (specialty) => {
  const specialties = {
    photographe: 'Photographe',
    videaste: 'Vidéaste',
    realisateur: 'Réalisateur',
    dop: 'DOP',
    technicien_lumiere: 'Technicien lumière',
    technicien_son: 'Technicien son',
    community_manager: 'Community Manager',
  }
  return specialties[specialty] || specialty
}

const formatExperience = (experience) => {
  const experiences = {
    junior: 'Junior',
    confirme: 'Confirmé',
    senior: 'Sénior',
  }
  return experiences[experience] || experience
}

const viewProfile = () => {
  if (!authStore.isLoggedIn || (authStore.user && authStore.user.subscription_level < 'pro')) {
    router.push('/abonnements')
  } else {
    router.push(`/professionnels/${props.professional.id}`)
  }
}
</script>

<style scoped></style>
