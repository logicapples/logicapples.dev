<!-- @format -->
<script setup></script>

<script>
  import Repository from "../components/Repository.vue"

  const d = await fetch("https://api.github.com/users/blaz6/repos");
  const dd = await d.json();
  const image = await fetch("https://source.unsplash.com/random/250×100")
  const images = {
    "ArianaAPI": "https://upload.wikimedia.org/wikipedia/commons/d/dd/Ariana_Grande_Grammys_Red_Carpet_2020.png",
    "klemencicblazz": "https://cosmopolitan.metropolitan.si/media/cache/upload/Photo/2019/11/18/ariana-grande_bigimage.jpg"
  }
  dd.forEach((element, index) => {
    const arr = Object.keys(images).filter(item => item === element.name)
    if(arr[0]) {
      element.image_link = images[arr[0]]
    }
  });

  export default {
    components: {
      Repository
    },
    data() {
      return {
        repositories: dd,
        image_link: image.url
      }
    },
    mounted() {
        const elements = document.querySelectorAll('.repo');

        elements.forEach(element => {
          const bg = element.querySelector(".background")
          element.addEventListener('mouseenter', function () {
              bg.style.opacity = '.4';
          });

          element.addEventListener('mouseleave', function () {
              bg.style.opacity = '0';
          });
        });
    }
  };
</script>

<template>
  <div class="home">
    <div class="repositories">
      <Repository class="repo" v-for="repo in repositories" :key="repo.id" :repositoryName="repo.name" :image="repo.image_link" />
    </div>
  </div>
</template>

<style scoped>
.repositories {
  display: grid;
  grid-template-columns: repeat(5, 20%);
  grid-template-rows: repeat(2, 50%);
  gap: 5px 5px;
}

</style>