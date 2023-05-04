<!-- @format -->
<script setup>
  import { useRouter, RouterLink } from "vue-router";
  import Footer from "../components/Footer.vue";
</script>

<template>
  <div class="home">
    <div class="content">
      <div class="upper">
        <h1 class="mainTitle">A Full Time</h1>
        <li>
          <a
            id="one"
            class="sliding"
            href="https://en.wikipedia.org/wiki/Procrastination"
            >Procrastinator</a
          >
          <a
            id="two"
            class="sliding"
            href="https://www.coursera.org/articles/back-end-developer"
            >Backend Enjoyer</a
          >
          <a
            id="three"
            class="sliding"
            href="https://sajjankumarjain.medium.com/10-things-that-i-hate-about-frontend-development-cf447bcc3369"
            >Frontend Hater</a
          >
          <a
            id="four"
            class="sliding"
            href="https://www.linkedin.com/pulse/programmers-depression-why-one-talks-8-powerful-ways-jason-humphrey"
            >Fullstack Depression Specialist</a
          >
        </li>
      </div>
    </div>
    <img class="pfp" src="@/assets/logo.jpg" alt="pfp" />
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
