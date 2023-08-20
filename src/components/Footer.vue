<!-- @format -->

<template>
  <footer class="footer">
    <div class="socials">
      <img
        v-on:click="openGithub"
        class="social"
        src="@/assets/github.png"
        alt="github" />
      <img
        v-on:click="openDiscord"
        class="social"
        src="@/assets/discord.png"
        alt="discord" />
    </div>
    <div class="projects">
      <a
        class="projects-button"
        href="https://github.com/LogicApples?tab=repositories"
        >My projects (soon)</a
      >
    </div>
    <div class="details">
      <p>Copyright &#169; {{ currentYear }}, Logic Developement</p>
    </div>
  </footer>
</template>

<script>
  export default {
    data() {
      return {
        currentYear: new Date().getFullYear(),
      };
    },
    methods: {
      changeTheme() {
        document.querySelector(".myswitch").addEventListener("change", e => {
          if (e.target.checked) {
            document.querySelector(".app").style.animation =
              "changeTheme 2s forwards";
          }
        });
      },
      openGithub() {
        window.location.href = "https://github.com/logicapples";
      },
      openDiscord() {
        window.location.href = "http://www.w3schools.com";
      },
    },
  };
</script>
