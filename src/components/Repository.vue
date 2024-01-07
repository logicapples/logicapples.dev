<script>
export default {
  name: "Repository",
  props: {
    repositoryName: String,
    image: String
  },
  data() {
    return {
        
    }
  },
}
</script>

<template>
    <div class="container" @click="">
        <p class="name">{{ repositoryName }}</p>
        <div class="background" :style="{ backgroundImage: `url(${image})` }"></div>
    </div>
</template>

<style scoped>
.container {
    height: 100px;
    width: 250px;
    border: 2px gray solid;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    transition: all .2s ;
}

.name {
    font-size: 25px;
    z-index: 100;
}

.container:hover {
    cursor: pointer;
    scale: 1.02;
}

.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0); /* Initially transparent */
  background-size: cover;
  background-repeat: no-repeat;
  opacity: 0;
  transition: opacity 0.5s ease; /* Transition for smooth fade */
}
</style>