<!-- @format -->

<template>
  <div class="navspace">
    <div class="nav">
      <div class="links">
        <RouterLink class="link" to="/cdn">CDN</RouterLink>
      </div>
      <div class="menu">
        <img
          v-on:click="openBurgerMenu"
          class="burger-menu"
          src="@/assets/menu.png"
          alt="burger" />
        <div class="linksInMenu">
          <div class="actual">
            <RouterLink class="link" to="/cdn">CDN</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { RouterLink } from "vue-router";

  export default {
    methods: {
      openBurgerMenu() {
        if (document.querySelector(".linksInMenu").style.display === "none") {
          document.querySelector(".linksInMenu").style.display = "flex";
          document.querySelector(".linksInMenu").style.animation =
            "openMenu .4s forwards";
        } else {
          console.log("close");
          document.querySelector(".linksInMenu").style.animation =
            "closeMenu .4s";
          setTimeout(() => {
            document.querySelector(".linksInMenu").style.display = "none";
          }, 400);
        }
      },
    },
  };
</script>
