<!-- @format -->

<template>
  <div class="repo_container">
    <div id="flexDiv">
      <p id="name">{{ name }}</p>
      <p id="price">{{ price }}</p>
      <p id="store">{{ store }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    props: ["name", "price", "store"],
  };
</script>

<style scoped>
  .repo_container {
    height: 250px;
    width: 250px;
    cursor: pointer;
    outline: white solid 1px;
    transition: all .3s ;
  }
  .repo_container:hover {
    scale: 1.02;
    outline: none;
  }

  #flexDiv {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
</style>
