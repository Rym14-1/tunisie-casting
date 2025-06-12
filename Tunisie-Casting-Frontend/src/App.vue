<template>
  <div id="app" class="flex flex-col min-h-screen">
    <Header />

    <main class="flex-grow">
      <router-view></router-view>
    </main>

    <Footer />
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<style></style>
