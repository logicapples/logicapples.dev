<!-- @format -->

<script setup>
  import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="app">
    <RouterView></RouterView>
  </div>
</template>

<script>
  export default {
    async mounted() {
      await fetch("/api/getRemInfo/p");
    },
  };
</script>
