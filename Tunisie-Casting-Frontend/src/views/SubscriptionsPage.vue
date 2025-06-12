<!-- src/views/SubscriptionsPage.vue -->
<template>
  <div class="p-8 container mx-auto bg-gray-50 min-h-screen">
    <h1 class="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-6">
      Nos Offres d'Abonnement
    </h1>
    <p class="text-lg md:text-xl text-gray-700 text-center max-w-3xl mx-auto mb-12">
      Choisissez l'abonnement qui correspond le mieux à vos besoins et débloquez l'accès à des
      profils détaillés, des fonctionnalités avancées et des avantages exclusifs.
    </p>

    <!-- Section d'accès gratuit limité -->
    <section
      class="mb-12 bg-blue-100 p-6 rounded-xl shadow-md border-t-4 border-blue-400 text-center"
    >
      <h2 class="text-2xl font-bold text-blue-800 mb-4">Accès Gratuit Limité</h2>
      <p class="text-gray-700 mb-4 max-w-2xl mx-auto">
        Découvrez gratuitement un aperçu de nos talents et professionnels. Pour accéder aux fiches
        détaillées complètes et interagir, un abonnement payant est requis.
      </p>
      <router-link
        to="/register"
        class="inline-block bg-blue-600 text-white font-bold py-3 px-6 rounded-md hover:bg-blue-700 transition-colors duration-300 shadow-md"
      >
        Créer un compte gratuit
      </router-link>
    </section>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <!-- Abonnement Basic -->
      <div
        class="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-500 flex flex-col hover:shadow-xl transition-shadow duration-300"
      >
        <h2 class="text-2xl font-bold text-blue-700 mb-3">Basic</h2>
        <p class="text-4xl font-extrabold mb-2">
          30 DT<span class="text-lg font-normal">/mois</span>
        </p>
        <p class="text-gray-600 mb-6">Ou 300 DT/an</p>
        <ul class="text-left text-gray-700 mb-8 list-disc list-inside flex-grow">
          <li>Accès aux fiches détaillées des talents</li>
          <li>Recherche avancée de talents</li>
        </ul>
        <button
          @click="showSubscriptionModal('Basic')"
          class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          S'abonner
        </button>
      </div>

      <!-- Abonnement Pro -->
      <div
        class="bg-white p-6 rounded-lg shadow-md border-t-4 border-purple-500 flex flex-col hover:shadow-xl transition-shadow duration-300"
      >
        <h2 class="text-2xl font-bold text-purple-700 mb-3">Pro</h2>
        <p class="text-4xl font-extrabold mb-2">
          60 DT<span class="text-lg font-normal">/mois</span>
        </p>
        <p class="text-gray-600 mb-6">Ou 600 DT/an</p>
        <ul class="text-left text-gray-700 mb-8 list-disc list-inside flex-grow">
          <li>Toutes les fonctionnalités de l'abonnement Basic</li>
          <li>Accès aux fiches détaillées des professionnels techniques</li>
          <li>Messagerie intégrée avec les talents et professionnels</li>
        </ul>
        <button
          @click="showSubscriptionModal('Pro')"
          class="w-full bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          S'abonner
        </button>
      </div>

      <!-- Abonnement Premium -->
      <div
        class="bg-white p-6 rounded-lg shadow-md border-t-4 border-indigo-500 flex flex-col hover:shadow-xl transition-shadow duration-300"
      >
        <h2 class="text-2xl font-bold text-indigo-700 mb-3">Premium</h2>
        <p class="text-4xl font-extrabold mb-2">
          90 DT<span class="text-lg font-normal">/mois</span>
        </p>
        <p class="text-gray-600 mb-6">Ou 960 DT/an</p>
        <ul class="text-left text-gray-700 mb-8 list-disc list-inside flex-grow">
          <li>Toutes les fonctionnalités de l'abonnement Pro</li>
          <li>Avantages exclusifs (réductions sur les services, événements)</li>
          <li>Priorité dans les recherches et les mises en avant</li>
          <li>Support client dédié et personnalisé</li>
        </ul>
        <button
          @click="showSubscriptionModal('Premium')"
          class="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          S'abonner
        </button>
      </div>
    </div>

    <!-- Nouvelle Section: Nos Services Supplémentaires -->
    <section class="my-16 bg-white p-8 rounded-xl shadow-lg text-center">
      <h2 class="text-3xl font-bold text-gray-800 mb-6">
        Optimisez votre carrière avec nos Services Supplémentaires
      </h2>
      <p class="text-gray-700 mb-8 max-w-3xl mx-auto">
        En plus de l'accès à notre base de données de talents et professionnels, nous vous proposons
        une gamme de services dédiés pour propulser votre carrière. Les abonnés Premium bénéficient
        de réductions exclusives sur ces offres !
      </p>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="p-6 bg-gray-100 rounded-lg shadow-md border-t-4 border-yellow-500">
          <h3 class="text-xl font-semibold text-yellow-700 mb-3">Shooting Photo Professionnel</h3>
          <p class="text-gray-700 text-sm mb-4">
            Réservez votre séance photo avec nos photographes experts pour un book qui vous
            ressemble. Calendrier en ligne disponible.
          </p>
          <router-link to="/services" class="text-blue-600 hover:underline font-medium"
            >En savoir plus &rarr;</router-link
          >
        </div>
        <div class="p-6 bg-gray-100 rounded-lg shadow-md border-t-4 border-green-500">
          <h3 class="text-xl font-semibold text-green-700 mb-3">Création de Book Personnalisé</h3>
          <p class="text-gray-700 text-sm mb-4">
            Concevez votre portfolio (imprimé ou numérique) pour présenter vos compétences de
            manière professionnelle.
          </p>
          <router-link to="/services" class="text-blue-600 hover:underline font-medium"
            >En savoir plus &rarr;</router-link
          >
        </div>
        <div class="p-6 bg-gray-100 rounded-lg shadow-md border-t-4 border-red-500">
          <h3 class="text-xl font-semibold text-red-700 mb-3">Formations Spécialisées</h3>
          <p class="text-gray-700 text-sm mb-4">
            Inscrivez-vous à nos formations en modeling, acting ou montage vidéo pour développer vos
            compétences.
          </p>
          <router-link to="/formation" class="text-blue-600 hover:underline font-medium"
            >En savoir plus &rarr;</router-link
          >
        </div>
      </div>
    </section>

    <!-- Modale de confirmation d'abonnement simulée -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center">
        <h3 class="text-2xl font-bold text-gray-800 mb-4">Abonnement {{ selectedPlan }}</h3>
        <p class="text-gray-700 mb-6">
          Merci de votre intérêt ! Pour procéder à l'abonnement {{ selectedPlan }}, veuillez vous
          connecter si ce n'est pas déjà fait, ou vous inscrire. Vous serez ensuite redirigé(e) vers
          la page de paiement.
        </p>
        <button
          @click="handleModalConfirm"
          class="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300 mr-2"
        >
          Continuer
        </button>
        <button
          @click="showModal = false"
          class="bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-md hover:bg-gray-400 transition-colors duration-300"
        >
          Annuler
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SubscriptionsPage',
  data() {
    return {
      showModal: false,
      selectedPlan: '',
    }
  },
  methods: {
    showSubscriptionModal(planName) {
      this.selectedPlan = planName
      this.showModal = true
    },
    handleModalConfirm() {
      console.log(`Action confirmée pour l'abonnement ${this.selectedPlan}.`)
      this.showModal = false

      this.$router.push('/login')
    },
  },
}
</script>

<style scoped></style>
