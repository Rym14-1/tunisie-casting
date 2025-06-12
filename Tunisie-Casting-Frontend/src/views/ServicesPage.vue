<!-- src/views/ServicesPage.vue -->
<template>
  <div class="container mx-auto p-4 md:p-8 bg-gray-50 min-h-screen">
    <h1 class="text-4xl font-bold text-center text-gray-900 mb-10">Nos Services</h1>

    <p class="text-lg text-gray-700 text-center max-w-3xl mx-auto mb-12">
      Découvrez les services professionnels que nous proposons pour vous aider à exceller dans votre
      carrière artistique et créative.
    </p>

    <!-- Section: Shooting photo professionnel -->
    <section
      class="my-12 bg-white p-8 rounded-xl shadow-lg flex flex-col md:flex-row items-center md:space-x-8"
    >
      <div class="md:w-1/2 mb-6 md:mb-0">
        <img
          src="https://placehold.co/600x400/E0E0E0/333333?text=Shooting+Photo"
          alt="Image de shooting photo professionnel"
          class="rounded-lg shadow-md w-full h-auto object-cover"
        />
      </div>
      <div class="md:w-1/2 text-center md:text-left">
        <h2 class="text-3xl font-bold text-blue-700 mb-4">Shooting Photo Professionnel</h2>
        <p class="text-gray-700 mb-4">
          Un book photo de qualité est essentiel pour tout talent. Nos photographes expérimentés
          vous aideront à capturer votre essence et votre potentiel. Nous offrons des séances
          personnalisées en studio ou en extérieur.
        </p>
        <ul class="list-disc list-inside text-gray-600 text-left mb-6 mx-auto md:mx-0">
          <li>Séances photo personnalisées</li>
          <li>Retouche professionnelle des images</li>
          <li>Galerie en ligne pour sélection</li>
          <li>Livraison rapide des clichés haute résolution</li>
        </ul>
        <router-link
          to="/contact"
          class="inline-block bg-blue-600 text-white font-bold py-3 px-6 rounded-md hover:bg-blue-700 transition-colors duration-300 shadow-md"
        >
          Réserver un shooting
        </router-link>
      </div>
    </section>

    <!-- Section: Création de book (modèle, acteur, portfolio) -->
    <section
      class="my-12 bg-white p-8 rounded-xl shadow-lg flex flex-col md:flex-row-reverse items-center md:space-x-reverse md:space-x-8"
    >
      <div class="md:w-1/2 mb-6 md:mb-0">
        <img
          src="https://placehold.co/600x400/D0D0D0/333333?text=Creation+Book"
          alt="Image de création de book professionnel"
          class="rounded-lg shadow-md w-full h-auto object-cover"
        />
      </div>
      <div class="md:w-1/2 text-center md:text-right">
        <h2 class="text-3xl font-bold text-blue-700 mb-4">Création de Book Professionnel</h2>
        <p class="text-gray-700 mb-4">
          Mettez en valeur votre talent avec un book ou un portfolio impeccablement conçu. Que vous
          soyez modèle, acteur ou artiste, un book professionnel est votre carte de visite
          incontournable.
        </p>
        <ul class="list-disc list-inside text-gray-600 text-right mb-6 mx-auto md:mx-0">
          <li>Conception graphique personnalisée</li>
          <li>Sélection et agencement des meilleures photos</li>
          <li>Versions numérique et imprimée disponibles</li>
          <li>Optimisation pour les castings et les agences</li>
        </ul>
        <router-link
          to="/contact"
          class="inline-block bg-blue-600 text-white font-bold py-3 px-6 rounded-md hover:bg-blue-700 transition-colors duration-300 shadow-md"
        >
          Demander un devis
        </router-link>
      </div>
    </section>

    <!-- Section: Formations (lien vers la page dédiée) -->
    <section class="my-12 bg-blue-100 p-8 rounded-xl shadow-lg text-center">
      <h2 class="text-3xl font-bold text-gray-800 mb-4">
        Développez vos Compétences avec nos Formations
      </h2>
      <p class="text-gray-700 mb-6 max-w-2xl mx-auto">
        Au-delà de la mise en relation, Tunisie Casting vous propose des formations ciblées en
        modeling, acting, montage vidéo et bien plus encore pour perfectionner votre art.
      </p>
      <router-link
        to="/formation"
        class="inline-block bg-purple-600 text-white font-bold py-3 px-6 rounded-md hover:bg-purple-700 transition-colors duration-300 shadow-md"
      >
        Découvrir toutes nos formations
      </router-link>
    </section>
  </div>
</template>

<script setup></script>

<style scoped></style>
