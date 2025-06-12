<template>
  <div class="p-8 container mx-auto max-w-3xl">
    <h1 class="text-4xl font-bold text-center text-gray-900 mb-8">Contactez-nous</h1>
    <div class="bg-white rounded-lg shadow-xl p-8">
      <form @submit.prevent="submitContactForm">
        <div class="mb-4">
          <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Votre Nom :</label>
          <input
            type="text"
            id="name"
            v-model="form.name"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div class="mb-4">
          <label for="email" class="block text-gray-700 text-sm font-bold mb-2"
            >Votre Email :</label
          >
          <input
            type="email"
            id="email"
            v-model="form.email"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div class="mb-6">
          <label for="message" class="block text-gray-700 text-sm font-bold mb-2"
            >Votre Message :</label
          >
          <textarea
            id="message"
            v-model="form.message"
            rows="5"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          ></textarea>
        </div>
        <div class="flex items-center justify-between">
          <button
            type="submit"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Envoyer le Message
          </button>
        </div>
      </form>
      <div class="mt-8 text-center text-gray-700">
        <p class="mb-2"><strong>Adresse :</strong> 81 Rue Habib Bourguiba , Ariana, Tunisie</p>
        <p class="mb-2"><strong>Téléphone :</strong> +216 92 721 104</p>
        <p><strong>Email :</strong> tunisiecasting2017@gmail.com</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ContactPage',
  data() {
    return {
      form: {
        name: '',
        email: '',
        message: '',
      },
    }
  },
  methods: {
    submitContactForm() {
      alert(
        'Message envoyé (fonctionnalité backend à implémenter) :\n' +
          JSON.stringify(this.form, null, 2),
      )
      // axios.post('/api/contact', this.form)
      //   .then(response => { /* gérer le succès */ })
      //   .catch(error => { /* gérer l'erreur */ });
      this.form = { name: '', email: '', message: '' }
    },
  },
}
</script>
<style scoped></style>
