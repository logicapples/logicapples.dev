<!-- @format -->
<script setup>
  import { useRouter, RouterLink } from "vue-router";
  import Footer from "../components/Footer.vue";
</script>

<template>
  <div class="home">
  </div>
</template>

<script>
  export default {
    mounted() {
      window.onload = () => {
        document.querySelector(".app").style.animation =
          "changeBg 2.5s forwards";
      };
    },
    methods: {
      openGithub() {
        window.location.href = "https://github.com/logicapples";
      },
      openDiscord() {
        window.location.href = "http://www.w3schools.com";
      },
    },
  };
</script>
