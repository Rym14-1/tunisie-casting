<!-- frontend/src/views/SubscriptionView.vue -->
<template>
  <div class="container mx-auto p-4 md:p-8 bg-gray-50 min-h-screen">
    <h1 class="text-4xl font-bold text-center text-gray-900 mb-10">Nos Plans d'Abonnement</h1>
    <p class="text-lg text-gray-700 text-center max-w-3xl mx-auto mb-12">
      Choisissez le plan qui correspond le mieux à vos besoins et débloquez toutes les
      fonctionnalités de Tunisie Casting !
    </p>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      <!-- Plan Basique -->
      <div
        class="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center transform hover:scale-105 transition-transform duration-300 border-2 border-blue-200"
      >
        <h2 class="text-3xl font-bold text-blue-700 mb-4">Basic</h2>
        <p class="text-5xl font-extrabold text-gray-900 mb-6">
          30 <span class="text-3xl font-semibold">DT/mois</span>
        </p>
        <p class="text-gray-600 mb-6">Ou 300 DT/an</p>
        <ul class="text-gray-700 text-left w-full mb-8 space-y-2">
          <li class="flex items-center">
            <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Accès aux fiches détaillées des talents
          </li>
          <li class="flex items-center">
            <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Recherche avancée de talents
          </li>
          <li class="flex items-center">
            <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Support par email
          </li>
        </ul>
        <button
          @click="handleSubscribe('Basic', 'monthly', 30)"
          :disabled="loading"
          class="bg-blue-600 text-white font-bold py-3 px-8 rounded-full hover:bg-blue-700 transition-colors duration-300 shadow-md transform hover:scale-105"
        >
          {{ loading ? 'Chargement...' : "S'abonner" }}
        </button>
      </div>

      <!-- Plan Pro -->
      <div
        class="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center transform hover:scale-105 transition-transform duration-300 border-2 border-purple-400"
      >
        <h2 class="text-3xl font-bold text-purple-700 mb-4">Pro</h2>
        <p class="text-5xl font-extrabold text-gray-900 mb-6">
          60 <span class="text-3xl font-semibold">DT/mois</span>
        </p>
        <p class="text-gray-600 mb-6">Ou 600 DT/an</p>
        <ul class="text-gray-700 text-left w-full mb-8 space-y-2">
          <li class="flex items-center">
            <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Toutes les fonctionnalités de l'abonnement Basic
          </li>
          <li class="flex items-center">
            <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Accès aux fiches détaillées des professionnels techniques
          </li>
          <li class="flex items-center">
            <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Messagerie intégrée avec les talents et professionnels
          </li>
        </ul>
        <button
          @click="handleSubscribe('Pro', 'monthly', 60)"
          :disabled="loading"
          class="bg-purple-600 text-white font-bold py-3 px-8 rounded-full hover:bg-purple-700 transition-colors duration-300 shadow-md transform hover:scale-105"
        >
          {{ loading ? 'Chargement...' : "S'abonner" }}
        </button>
      </div>

      <!-- Plan Premium -->
      <div
        class="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center transform hover:scale-105 transition-transform duration-300 border-2 border-indigo-400"
      >
        <h2 class="text-3xl font-bold text-indigo-700 mb-4">Premium</h2>
        <p class="text-5xl font-extrabold text-gray-900 mb-6">
          90 <span class="text-3xl font-semibold">DT/mois</span>
        </p>
        <p class="text-gray-600 mb-6">Ou 960 DT/an</p>
        <ul class="text-gray-700 text-left w-full mb-8 space-y-2">
          <li class="flex items-center">
            <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Toutes les fonctionnalités de l'abonnement Pro
          </li>
          <li class="flex items-center">
            <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Avantages exclusifs (réductions sur les services, événements)
          </li>
          <li class="flex items-center">
            <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Priorité dans les recherches et les mises en avant
          </li>
          <li class="flex items-center">
            <svg class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path
                fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Support client dédié et personnalisé
          </li>
        </ul>
        <button
          @click="handleSubscribe('Premium', 'monthly', 90)"
          :disabled="loading"
          class="bg-indigo-600 text-white font-bold py-3 px-8 rounded-full hover:bg-indigo-700 transition-colors duration-300 shadow-md transform hover:scale-105"
        >
          {{ loading ? 'Chargement...' : "S'abonner" }}
        </button>
      </div>
    </div>

    <div
      v-if="error"
      class="mt-8 p-4 bg-red-100 text-red-700 rounded-md text-center max-w-md mx-auto"
    >
      {{ error }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const loading = ref(false)
const error = ref(null)

const loadStripeScript = () => {
  return new Promise((resolve) => {
    if (document.getElementById('stripe-script')) {
      resolve()
      return
    }
    const script = document.createElement('script')
    script.src = 'https://js.stripe.com/v3/'
    script.id = 'stripe-script'
    script.onload = () => resolve()
    document.head.appendChild(script)
  })
}

const handleSubscribe = async (plan, billingCycle, price) => {
  loading.value = true
  error.value = null

  try {
    const token = localStorage.getItem('token')
    if (!token) {
      error.value = 'Vous devez être connecté pour vous abonner.'
      loading.value = false
      // Rediriger vers la page de connexion si nécessaire
      // router.push('/login');
      return
    }

    // Charger le script Stripe.js si ce n'est pas déjà fait
    await loadStripeScript()

    // Initialiser Stripe avec votre clé publishable (du frontend, pas le secret !)
    const stripe = Stripe(
      import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_VOTRE_PUBLISHABLE_KEY_STRIPE',
    ) // Remplacez par votre clé publishable Stripe

    const response = await axios.post(
      'http://localhost:5000/api/stripe/create-checkout-session',
      {
        plan,
        billingCycle,
        price,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    )

    const sessionId = response.data.id

    // Rediriger l'utilisateur vers la page de paiement hébergée par Stripe
    const { error: stripeError } = await stripe.redirectToCheckout({ sessionId })

    if (stripeError) {
      console.error('Erreur de redirection Stripe:', stripeError.message)
      error.value =
        'Une erreur est survenue lors de la redirection vers le paiement: ' + stripeError.message
    }
  } catch (err) {
    console.error(
      'Erreur lors de la création de la session de paiement:',
      err.response ? err.response.data : err.message,
    )
    error.value =
      err.response && err.response.data && err.response.data.message
        ? err.response.data.message
        : 'Une erreur est survenue lors du démarrage du paiement. Veuillez réessayer.'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped></style>
