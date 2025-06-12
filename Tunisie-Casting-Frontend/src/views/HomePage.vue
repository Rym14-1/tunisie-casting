<!-- src/views/HomePage.vue -->
<template>
  <div class="container mx-auto p-8 bg-gray-50 min-h-screen">
    <!-- Section d'accueil et description générale de la plateforme -->
    <section class="mb-16 text-center">
      <h1 class="text-4xl md:text-5xl font-extrabold text-blue-700 mb-4">
        Bienvenue sur Tunisie Casting
      </h1>
      <p class="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto mb-8">
        Tunisie Casting est votre base de données en ligne dédiée aux talents des domaines
        culturels, artistiques, de la mode, de la publicité, et des métiers techniques associés.
        Nous connectons talents et professionnels pour des collaborations réussies.
      </p>
      <img
        src="@/assets/logo.jpeg"
        alt="Logo Tunisie Casting"
        class="mx-auto mt-8 w-48 h-auto rounded-lg shadow-lg"
        onerror="this.onerror=null;this.src='https://placehold.co/192x192/E0E0E0/333333?text=Logo';"
      />
      <p class="text-md text-gray-600 mt-6 max-w-2xl mx-auto">
        Accédez gratuitement à un aperçu de nos profils, et explorez nos offres d'abonnement pour
        débloquer les fiches détaillées, ainsi que nos services exclusifs : shootings photo,
        création de books, et formations spécialisées.
      </p>
    </section>

    <!-- Section: Dernières actualités et mises à jour -->
    <section class="my-16 bg-white p-8 rounded-xl shadow-lg">
      <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">
        Dernières Actualités et Mises à Jour
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Article d'actualité 1 -->
        <div
          class="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
        >
          <h3 class="text-xl font-semibold text-blue-600 mb-3">
            Ouverture des Inscriptions pour le Festival de Cinéma
          </h3>
          <p class="text-gray-700 text-sm mb-4">
            Les inscriptions sont officiellement ouvertes pour la 15ème édition du Festival
            International du Film de Carthage. Ne manquez pas cette opportunité !
          </p>
          <a href="#" class="text-blue-500 hover:underline font-medium">Lire la suite &rarr;</a>
        </div>
        <!-- Article d'actualité 2 -->
        <div
          class="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
        >
          <h3 class="text-xl font-semibold text-blue-600 mb-3">
            Nouveaux Ateliers de Théâtre pour Débutants
          </h3>
          <p class="text-gray-700 text-sm mb-4">
            Découvrez nos nouveaux ateliers intensifs de théâtre pour les passionnés de tous
            niveaux. Apprenez les bases de l'acting.
          </p>
          <a href="#" class="text-blue-500 hover:underline font-medium">Lire la suite &rarr;</a>
        </div>
        <!-- Article d'actualité 3 -->
        <div
          class="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
        >
          <h3 class="text-xl font-semibold text-blue-600 mb-3">
            Mise à Jour de la Plateforme : Nouvelles Fonctionnalités
          </h3>
          <p class="text-gray-700 text-sm mb-4">
            Nous avons déployé des améliorations majeures, incluant une recherche de talents plus
            intuitive et des profils enrichis.
          </p>
          <a href="#" class="text-blue-500 hover:underline font-medium">Lire la suite &rarr;</a>
        </div>
      </div>
    </section>
    <!-- Section: Blog/Ressources avec articles sur les industries créatives -->
    <section class="my-16 bg-white p-8 rounded-xl shadow-lg">
      <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">
        Blog & Ressources : Réussir dans les Industries Créatives
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Article de blog 1 -->
        <div
          class="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
        >
          <img
            src="https://placehold.co/400x200/D0D0D0/333333?text=Article+1"
            alt="Image Article 1"
            class="rounded-md mb-4"
          />
          <h3 class="text-xl font-semibold text-gray-800 mb-2">
            Les Tendances du Mannequinat en 2025
          </h3>
          <p class="text-gray-700 text-sm mb-4">
            Découvrez les nouvelles directions et les opportunités émergentes dans le monde du
            mannequinat en Tunisie et à l'international.
          </p>
          <a href="#" class="text-blue-500 hover:underline font-medium">Lire l'article &rarr;</a>
        </div>
        <!-- Article de blog 2 -->
        <div
          class="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
        >
          <img
            src="https://placehold.co/400x200/D0D0D0/333333?text=Article+2"
            alt="Image Article 2"
            class="rounded-md mb-4"
          />
          <h3 class="text-xl font-semibold text-gray-800 mb-2">
            Comment Réussir son Audition de Cinéma
          </h3>
          <p class="text-gray-700 text-sm mb-4">
            Conseils pratiques et astuces d'experts pour briller lors de vos prochaines auditions et
            décrocher le rôle de vos rêves.
          </p>
          <a href="#" class="text-blue-500 hover:underline font-medium">Lire l'article &rarr;</a>
        </div>
        <!-- Article de blog 3 -->
        <div
          class="bg-gray-100 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
        >
          <img
            src="https://placehold.co/400x200/D0D0D0/333333?text=Article+3"
            alt="Image Article 3"
            class="rounded-md mb-4"
          />
          <h3 class="text-xl font-semibold text-gray-800 mb-2">
            L'Importance d'un Bon Portfolio Artistique
          </h3>
          <p class="text-gray-700 text-sm mb-4">
            Un guide complet pour créer un portfolio qui mettra en valeur votre talent et attirera
            les opportunités de collaboration.
          </p>
          <a href="#" class="text-blue-500 hover:underline font-medium">Lire l'article &rarr;</a>
        </div>
      </div>
    </section>

    <!-- Section: Témoignages d'utilisateurs -->
    <section class="my-16 bg-blue-100 p-8 rounded-xl shadow-lg">
      <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">
        Ce que disent nos utilisateurs
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Témoignage 1 -->
        <div
          class="bg-white p-6 rounded-lg shadow-md flex flex-col items-center hover:shadow-xl transition-shadow duration-300"
        >
          <p class="text-gray-700 italic mb-4 text-center">
            "Grâce à Tunisie Casting, j'ai décroché mon premier rôle au cinéma ! La plateforme est
            intuitive, les opportunités sont réelles et le support est excellent."
          </p>
          <p class="font-semibold text-blue-600">- Sarah M., Actrice</p>
        </div>
        <!-- Témoignage 2 -->
        <div
          class="bg-white p-6 rounded-lg shadow-md flex flex-col items-center hover:shadow-xl transition-shadow duration-300"
        >
          <p class="text-gray-700 italic mb-4 text-center">
            "Une ressource indispensable pour tout professionnel de l'audiovisuel en Tunisie. Je
            trouve rapidement des talents qualifiés pour tous mes projets, des photographes aux
            techniciens son."
          </p>
          <p class="font-semibold text-blue-600">- Omar K., Réalisateur</p>
        </div>
        <!-- Témoignage 3 -->
        <div
          class="bg-white p-6 rounded-lg shadow-md flex flex-col items-center hover:shadow-xl transition-shadow duration-300"
        >
          <p class="text-gray-700 italic mb-4 text-center">
            "Les formations proposées par Tunisie Casting m'ont permis de développer mes compétences
            en modeling et de créer un book professionnel. Je recommande vivement !"
          </p>
          <p class="font-semibold text-blue-600">- Lina S., Mannequin</p>
        </div>
        <!-- Témoignage 4 -->
        <div
          class="bg-white p-6 rounded-lg shadow-md flex flex-col items-center hover:shadow-xl transition-shadow duration-300"
        >
          <p class="text-gray-700 italic mb-4 text-center">
            "En tant que photographe, la plateforme m'a ouvert de nouvelles opportunités de
            collaboration avec des talents incroyables. C'est un outil précieux pour mon réseau."
          </p>
          <p class="font-semibold text-blue-600">- Sami Z., Photographe</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup></script>

<style scoped></style>
