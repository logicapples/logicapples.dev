<!-- @format -->

<script setup>
  import ContactForm from "../components/ContactForm.vue";
</script>

<template>
  <ContactForm />
</template>

<script>
  export default {
    mounted() {
      document.querySelector(".navspace").style.visibility = "visible";
      document.querySelector(".navspace").style.animation =
        "navbarMovement .8s";
      document.querySelector(".app").style.animation = "changeBg 1s forwards";
      document.querySelector("footer").style.display = "flex";
      document.querySelector(".navpfp").style.visibility = "visible";
    },
  };
</script>
