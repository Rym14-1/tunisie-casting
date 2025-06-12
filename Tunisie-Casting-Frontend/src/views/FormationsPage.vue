<!-- src/views/FormationsPage.vue -->
<template>
  <div class="p-8 container mx-auto text-center bg-gray-50 min-h-screen">
    <h1 class="text-4xl font-bold text-gray-900 mb-6">Nos Formations</h1>
    <p class="text-lg text-gray-700 mb-8 max-w-3xl mx-auto">
      Développez vos compétences et donnez un nouvel élan à votre carrière artistique grâce à nos
      programmes de formation spécialisés, conçus par des experts de l'industrie.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <!-- Formation Modeling -->
      <div
        class="bg-white p-6 rounded-lg shadow-md border-t-4 border-orange-500 hover:shadow-xl transition-shadow duration-300"
      >
        <h2 class="text-2xl font-bold text-orange-700 mb-3">Formation Modeling</h2>
        <p class="text-gray-600 mb-4">
          Apprenez les bases du mannequinat, la posture, la marche, et les techniques de pose pour
          briller devant l'objectif et sur les podiums.
        </p>
        <ul class="text-left text-gray-700 mb-6 list-disc list-inside">
          <li>Photogénie et expression scénique</li>
          <li>Techniques de défilé et Catwalk</li>
          <li>Conseils pour la création de portfolio professionnel</li>
        </ul>
        <button
          @click="showEnrollmentMessage('Modeling')"
          class="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 w-full"
        >
          En savoir plus & S'inscrire
        </button>
      </div>

      <!-- Atelier Acting -->
      <div
        class="bg-white p-6 rounded-lg shadow-md border-t-4 border-teal-500 hover:shadow-xl transition-shadow duration-300"
      >
        <h2 class="text-2xl font-bold text-teal-700 mb-3">Atelier Acting</h2>
        <p class="text-gray-600 mb-4">
          Développez vos compétences d'acteur pour le théâtre, le cinéma ou la publicité. Maîtrisez
          l'art de l'interprétation.
        </p>
        <ul class="text-left text-gray-700 mb-6 list-disc list-inside">
          <li>Techniques d'improvisation théâtrale</li>
          <li>Travail approfondi sur le personnage</li>
          <li>Préparation aux techniques de casting</li>
        </ul>
        <button
          @click="showEnrollmentMessage('Acting')"
          class="bg-teal-500 hover:bg-teal-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 w-full"
        >
          En savoir plus & S'inscrire
        </button>
      </div>

      <!-- Montage Vidéo Express -->
      <div
        class="bg-white p-6 rounded-lg shadow-md border-t-4 border-red-500 hover:shadow-xl transition-shadow duration-300"
      >
        <h2 class="text-2xl font-bold text-red-700 mb-3">Montage Vidéo Express</h2>
        <p class="text-gray-600 mb-4">
          Maîtrisez les logiciels de montage pour créer vos propres démos, portfolios vidéo et
          projets créatifs avec impact.
        </p>
        <ul class="text-left text-gray-700 mb-6 list-disc list-inside">
          <li>Introduction et maîtrise d'Adobe Premiere Pro</li>
          <li>Comprendre la structure narrative d'un montage</li>
          <li>Techniques d'exportation et de publication professionnelles</li>
        </ul>
        <button
          @click="showEnrollmentMessage('Montage Vidéo')"
          class="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 w-full"
        >
          En savoir plus & S'inscrire
        </button>
      </div>
    </div>

    <!-- Section: Calendrier des formations et Inscription en ligne -->
    <section class="mt-16 bg-white p-8 rounded-xl shadow-lg border-t-4 border-blue-500">
      <h2 class="text-3xl font-bold text-gray-900 mb-6">
        Inscrivez-vous à nos Prochaines Sessions
      </h2>
      <p class="text-gray-700 mb-6 max-w-2xl mx-auto">
        Consultez notre calendrier interactif pour découvrir les dates et horaires de nos prochaines
        formations. L'inscription se fait facilement en ligne pour toutes les sessions.
      </p>
      <div class="bg-blue-50 p-6 rounded-md border border-blue-200 mb-6">
        <h3 class="text-2xl font-semibold text-blue-800 mb-3">
          Accéder au Calendrier & S'inscrire
        </h3>
        <p class="text-gray-700 mb-4">
          Visualisez les disponibilités et réservez votre place en quelques clics pour la formation
          de votre choix.
        </p>
        <router-link
          to="/contact"
          class="inline-block bg-blue-600 text-white font-bold py-3 px-8 rounded-md hover:bg-blue-700 transition-colors duration-300 shadow-md"
        >
          Voir le Calendrier et S'inscrire
        </router-link>
      </div>
      <p class="text-sm text-gray-500 mt-4">
        Pour toute question ou demande de renseignements, n'hésitez pas à nous contacter via le
        formulaire dédié.
      </p>
    </section>

    <!-- Section: Témoignages et résultats des participants -->
    <section
      class="mt-16 bg-gradient-to-r from-purple-500 to-indigo-600 p-8 rounded-xl shadow-lg text-white"
    >
      <h2 class="text-3xl font-bold mb-8 text-center">Témoignages et Succès de nos Participants</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Témoignage Formation 1 -->
        <div
          class="bg-white text-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
        >
          <p class="text-gray-700 italic mb-4 text-center">
            "La formation Modeling a transformé ma confiance en moi et m'a donné toutes les clés
            pour démarrer ma carrière. J'ai été repérée suite à la création de mon book !"
          </p>
          <p class="font-semibold text-purple-600">- Alia B., Mannequin diplômée</p>
          <p class="text-sm text-gray-500 mt-2">
            Résultat : Premier contrat avec une agence de mode.
          </p>
        </div>
        <!-- Témoignage Formation 2 -->
        <div
          class="bg-white text-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
        >
          <p class="text-gray-700 italic mb-4 text-center">
            "L'atelier Acting est intense et incroyablement formateur. J'ai non seulement amélioré
            mes techniques, mais j'ai aussi appris à gérer le stress des auditions. Je recommande
            vivement !"
          </p>
          <p class="font-semibold text-purple-600">- Youssef C., Acteur en herbe</p>
          <p class="text-sm text-gray-500 mt-2">
            Résultat : Admission à l'école d'art dramatique de Tunis.
          </p>
        </div>
        <!-- Témoignage Formation 3 -->
        <div
          class="bg-white text-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
        >
          <p class="text-gray-700 italic mb-4 text-center">
            "Je suis maintenant capable de monter mes propres vidéos promotionnelles pour mes
            projets musicaux grâce à la formation Montage Vidéo Express. C'est un gain de temps
            énorme !"
          </p>
          <p class="font-semibold text-purple-600">- Samy R., Musicien et VJ</p>
          <p class="text-sm text-gray-500 mt-2">
            Résultat : Production de clips musicaux auto-réalisés de qualité professionnelle.
          </p>
        </div>
      </div>
    </section>

    <!-- Modal pour les messages d'inscription (simple alert simulé) -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    >
      <div class="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full text-center">
        <h3 class="text-2xl font-bold text-gray-800 mb-4">
          Inscription à la Formation {{ selectedFormation }}
        </h3>
        <p class="text-gray-700 mb-6">
          Pour vous inscrire à cette formation, veuillez consulter notre calendrier détaillé et
          remplir le formulaire sur la page d'inscription.
        </p>
        <button
          @click="showModal = false"
          class="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
        >
          Fermer
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormationsPage',
  data() {
    return {
      showModal: false,
      selectedFormation: '',
    }
  },
  methods: {
    showEnrollmentMessage(formationName) {
      this.selectedFormation = formationName
      this.showModal = true
    },
  },
}
</script>

<style scoped></style>
