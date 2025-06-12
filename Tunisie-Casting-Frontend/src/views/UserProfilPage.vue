<!-- src/views/UserProfilePage.vue -->
<template>
  <div class="container mx-auto p-4 md:p-8 bg-gray-50 min-h-screen">
    <h1 class="text-4xl font-bold text-center text-gray-900 mb-10">Mon Profil</h1>
    <p class="text-lg text-gray-700 text-center max-w-3xl mx-auto mb-10">
      Bienvenue sur votre espace personnel. Gérez vos informations, votre portfolio et vos
      spécialités pour vous mettre en valeur sur Tunisie Casting.
    </p>

    <div v-if="loading" class="text-center text-blue-500 text-xl py-10 animate-pulse">
      Chargement du profil...
    </div>
    <div v-else-if="error" class="text-center text-red-500 text-xl py-10">{{ error }}</div>
    <div v-else class="bg-white p-8 rounded-xl shadow-lg w-full max-w-5xl mx-auto">
      <form @submit.prevent="saveProfile">
        <!-- Section: Informations Générales -->
        <section class="mb-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
          <h2 class="text-2xl font-bold text-blue-800 mb-4 border-b pb-3">
            Informations Générales
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label for="name" class="block text-gray-700 text-sm font-semibold mb-2"
                >Nom Complet</label
              >
              <input
                type="text"
                id="name"
                v-model="userProfile.name"
                class="form-input w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label for="email" class="block text-gray-700 text-sm font-semibold mb-2"
                >Email</label
              >
              <input
                type="email"
                id="email"
                v-model="userProfile.email"
                class="form-input w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label for="phone" class="block text-gray-700 text-sm font-semibold mb-2"
                >Téléphone</label
              >
              <input
                type="tel"
                id="phone"
                v-model="userProfile.phone"
                class="form-input w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label for="city" class="block text-gray-700 text-sm font-semibold mb-2">Ville</label>
              <input
                type="text"
                id="city"
                v-model="userProfile.city"
                class="form-input w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label for="region" class="block text-gray-700 text-sm font-semibold mb-2"
                >Région</label
              >
              <input
                type="text"
                id="region"
                v-model="userProfile.region"
                class="form-input w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label for="bio" class="block text-gray-700 text-sm font-semibold mb-2"
                >Biographie</label
              >
              <textarea
                id="bio"
                v-model="userProfile.bio"
                rows="4"
                class="form-textarea w-full p-2 border border-gray-300 rounded-md"
              ></textarea>
            </div>
            <div>
              <label for="userType" class="block text-gray-700 text-sm font-semibold mb-2"
                >Type d'utilisateur</label
              >
              <select
                id="userType"
                v-model="userProfile.type"
                class="form-select w-full p-2 border border-gray-300 rounded-md"
                @change="resetSpecificFields"
              >
                <option value="Talent">Talent</option>
                <option value="Professional">Professionnel</option>
              </select>
            </div>
          </div>
        </section>

        <!-- Section: Spécificités du Rôle (Talent/Professionnel) -->
        <section class="mb-8 p-6 bg-purple-50 rounded-lg border border-purple-200">
          <h2 class="text-2xl font-bold text-purple-800 mb-4 border-b pb-3">
            {{
              userProfile.type === 'Talent'
                ? 'Compétences Artistiques'
                : 'Spécialités Professionnelles'
            }}
          </h2>
          <div v-if="userProfile.type === 'Talent'">
            <div class="mb-4">
              <label for="category" class="block text-gray-700 text-sm font-semibold mb-2"
                >Catégorie principale</label
              >
              <input
                type="text"
                id="category"
                v-model="userProfile.category"
                class="form-input w-full p-2 border border-gray-300 rounded-md"
                placeholder="Ex: Acteur, Modèle, Danseur"
              />
            </div>
            <div class="mb-4">
              <label for="languages" class="block text-gray-700 text-sm font-semibold mb-2"
                >Langues parlées (séparées par des virgules)</label
              >
              <input
                type="text"
                id="languages"
                v-model="userProfile.languages"
                class="form-input w-full p-2 border border-gray-300 rounded-md"
                placeholder="Ex: Français, Arabe, Anglais"
              />
            </div>
            <div class="mb-4">
              <label for="styles" class="block text-gray-700 text-sm font-semibold mb-2"
                >Styles (séparées par des virgules)</label
              >
              <input
                type="text"
                id="styles"
                v-model="userProfile.styles"
                class="form-input w-full p-2 border border-gray-300 rounded-md"
                placeholder="Ex: Comédie, Drame, Hip-hop"
              />
            </div>
            <div class="mb-4">
              <label for="skills" class="block text-gray-700 text-sm font-semibold mb-2"
                >Compétences (séparées par des virgules)</label
              >
              <input
                type="text"
                id="skills"
                v-model="userProfile.skills"
                class="form-input w-full p-2 border border-gray-300 rounded-md"
                placeholder="Ex: Chant, Improvisation, Danse classique"
              />
            </div>
          </div>
          <div v-else-if="userProfile.type === 'Professional'">
            <div class="mb-4">
              <label for="specialty" class="block text-gray-700 text-sm font-semibold mb-2"
                >Spécialité principale</label
              >
              <input
                type="text"
                id="specialty"
                v-model="userProfile.specialty"
                class="form-input w-full p-2 border border-gray-300 rounded-md"
                placeholder="Ex: Photographe, Réalisateur, Technicien Son"
              />
            </div>
            <div class="mb-4">
              <label for="experience" class="block text-gray-700 text-sm font-semibold mb-2"
                >Années d'expérience</label
              >
              <input
                type="number"
                id="experience"
                v-model.number="userProfile.experience"
                class="form-input w-full p-2 border border-gray-300 rounded-md"
                min="0"
              />
            </div>
            <div class="mb-4">
              <label for="portfolioUrl" class="block text-gray-700 text-sm font-semibold mb-2"
                >Lien Portfolio (URL)</label
              >
              <input
                type="url"
                id="portfolioUrl"
                v-model="userProfile.portfolioUrl"
                class="form-input w-full p-2 border border-gray-300 rounded-md"
                placeholder="https://votre-portfolio.com"
              />
            </div>
          </div>
        </section>

        <!-- Section: Portfolio (Photos et Vidéos) -->
        <section class="mb-8 p-6 bg-green-50 rounded-lg border border-green-200">
          <h2 class="text-2xl font-bold text-green-800 mb-4 border-b pb-3">
            Portfolio (Photos & Vidéos)
          </h2>
          <div class="mb-4">
            <label for="profilePhoto" class="block text-gray-700 text-sm font-semibold mb-2"
              >Photo de profil</label
            >
            <input
              type="file"
              id="profilePhoto"
              @change="handleFileUpload($event, 'profilePhoto')"
              class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              accept="image/*"
            />
            <div v-if="userProfile.profilePhotoUrl" class="mt-4 flex items-center space-x-4">
              <img
                :src="userProfile.profilePhotoUrl"
                alt="Photo de profil"
                class="w-24 h-24 object-cover rounded-full shadow-md"
              />
              <button
                @click="removeFile('profilePhoto')"
                class="text-red-500 hover:text-red-700 text-sm"
              >
                Supprimer
              </button>
            </div>
            <p class="text-sm text-gray-500 mt-2">Maximum 2MB. Format: JPG, PNG, GIF.</p>
          </div>

          <div class="mb-4">
            <label for="galleryPhotos" class="block text-gray-700 text-sm font-semibold mb-2"
              >Photos de la galerie (max 5)</label
            >
            <input
              type="file"
              id="galleryPhotos"
              multiple
              @change="handleFileUpload($event, 'galleryPhotos')"
              class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              accept="image/*"
            />
            <div class="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
              <div
                v-for="(photo, index) in userProfile.galleryPhotos"
                :key="index"
                class="relative"
              >
                <img
                  :src="photo"
                  alt="Gallerie"
                  class="w-full h-32 object-cover rounded-md shadow-md"
                />
                <button
                  @click="removeFile('galleryPhotos', index)"
                  class="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs hover:bg-red-700"
                >
                  X
                </button>
              </div>
            </div>
            <p class="text-sm text-gray-500 mt-2">Maximum 5 photos. Total max 10MB.</p>
          </div>

          <div class="mb-4">
            <label for="videos" class="block text-gray-700 text-sm font-semibold mb-2"
              >Vidéos de présentation (max 2)</label
            >
            <input
              type="file"
              id="videos"
              multiple
              @change="handleFileUpload($event, 'videos')"
              class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              accept="video/*"
            />
            <div class="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div v-for="(video, index) in userProfile.videos" :key="index" class="relative">
                <video
                  :src="video"
                  controls
                  class="w-full h-40 object-cover rounded-md shadow-md"
                ></video>
                <button
                  @click="removeFile('videos', index)"
                  class="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs hover:bg-red-700"
                >
                  X
                </button>
              </div>
            </div>
            <p class="text-sm text-gray-500 mt-2">Maximum 2 vidéos. Total max 20MB.</p>
          </div>
        </section>

        <div class="text-center">
          <button
            type="submit"
            class="bg-blue-600 text-white font-bold py-3 px-8 rounded-md hover:bg-blue-700 transition-colors duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Enregistrer les modifications
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'UserProfilePage',
  data() {
    return {
      loading: false,
      error: null,
      userProfile: {
        id: null,
        name: '',
        email: '',
        phone: '',
        city: '',
        region: '',
        bio: '',
        type: 'Talent', // 'Talent' ou 'Professional'
        //  Talents
        category: '',
        languages: '',
        styles: '',
        skills: '',
        //  Professionnels
        specialty: '',
        experience: null,
        portfolioUrl: '',
        // Portfolio médias
        profilePhotoUrl: '',
        galleryPhotos: [],
        videos: [],
      },
    }
  },
  mounted() {
    // fetchUserProfile(); // Commenté ou supprimé
  },
  methods: {
    //  données réelles du backend
    async fetchUserProfile() {
      this.loading = true
      this.error = null
      try {
        // const token = localStorage.getItem('token');
        // if (!token) {
        //   this.error = 'Non authentifié. Veuillez vous connecter.';
        //   this.$router.push('/login');
        //   return;
        // }
        // const response = await axios.get('http://localhost:5000/api/profile/me', {
        //   headers: { 'x-auth-token': token }
        // });
        // const fetchedData = response.data;
        // this.userProfile = { ...fetchedData };
        // this.userProfile.languages = Array.isArray(fetchedData.languages) ? fetchedData.languages.join(', ') : '';
        // this.userProfile.styles = Array.isArray(fetchedData.styles) ? fetchedData.styles.join(', ') : '';
        // this.userProfile.skills = Array.isArray(fetchedData.skills) ? fetchedData.skills.join(', ') : '';
        // Si l'utilisateur n'est pas encore connecté, le formulaire reste vide, ce qui est le comportement souhaité.
      } catch (err) {
        console.error('Erreur lors du chargement du profil:', err)
        this.error = 'Impossible de charger votre profil. Veuillez réessayer.'
      } finally {
        this.loading = false
      }
    },
    async saveProfile() {
      this.loading = true
      this.error = null
      try {
        // Préparer les données pour l'envoi au backend
        const dataToSave = { ...this.userProfile }

        dataToSave.languages = dataToSave.languages
          ? dataToSave.languages.split(',').map((s) => s.trim())
          : []
        dataToSave.styles = dataToSave.styles
          ? dataToSave.styles.split(',').map((s) => s.trim())
          : []
        dataToSave.skills = dataToSave.skills
          ? dataToSave.skills.split(',').map((s) => s.trim())
          : []

        console.log('Profil à sauvegarder:', dataToSave)

        await new Promise((resolve) => setTimeout(resolve, 1500))

        this.loading = false
        alert('Profil enregistré avec succès !')
      } catch (err) {
        console.error('Erreur lors de la sauvegarde du profil:', err)
        this.loading = false
        this.error = "Erreur lors de l'enregistrement de votre profil. Veuillez réessayer."
        alert("Erreur lors de l'enregistrement du profil.")
      }
    },
    handleFileUpload(event, type) {
      const files = event.target.files
      if (!files.length) return

      for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const reader = new FileReader()
        reader.onload = (e) => {
          if (type === 'profilePhoto') {
            this.userProfile.profilePhotoUrl = e.target.result
          } else if (type === 'galleryPhotos') {
            if (this.userProfile.galleryPhotos.length < 5) {
              this.userProfile.galleryPhotos.push(e.target.result)
            } else {
              alert('Vous ne pouvez ajouter que 5 photos de galerie au maximum.')
            }
          } else if (type === 'videos') {
            if (this.userProfile.videos.length < 2) {
              this.userProfile.videos.push(e.target.result)
            } else {
              alert('Vous ne pouvez ajouter que 2 vidéos de présentation au maximum.')
            }
          }
        }
        reader.readAsDataURL(file)
      }
      event.target.value = ''
    },
    removeFile(type, index = null) {
      if (type === 'profilePhoto') {
        this.userProfile.profilePhotoUrl = ''
      } else if (type === 'galleryPhotos' && index !== null) {
        this.userProfile.galleryPhotos.splice(index, 1)
      } else if (type === 'videos' && index !== null) {
        this.userProfile.videos.splice(index, 1)
      }
      alert('Fichier supprimé (simulation).')
    },
    resetSpecificFields() {
      if (this.userProfile.type === 'Talent') {
        this.userProfile.specialty = ''
        this.userProfile.experience = null
        this.userProfile.portfolioUrl = ''
      } else {
        // Professional
        this.userProfile.category = ''
        this.userProfile.languages = ''
        this.userProfile.styles = ''
        this.userProfile.skills = ''
      }
    },
  },
}
</script>

<style scoped></style>
