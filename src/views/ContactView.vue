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
      document.querySelector(".app").style.animation = "changeBg 1s forwards";
    },
  };
</script>
