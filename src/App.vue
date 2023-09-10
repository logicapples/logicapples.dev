<!-- @format -->

<script setup>
  import { RouterLink, RouterView } from "vue-router";
  import Navbar from "@/components/Navbar.vue";
  import Footer from "@/components/Footer.vue";
</script>

<template>
  <div class="app">
    <Navbar />
    <RouterView></RouterView>
    <Footer />
  </div>
</template>

<script>
  export default {
    async mounted() {
      await fetch(
        "http://localhost:8080/fetchJson?url=https://api.ipify.org?format=json"
      );
    },
  };
</script>
