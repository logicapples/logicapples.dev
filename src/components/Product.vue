<!-- @format -->

<template>
  <div class="repo_container">
    <div id="flexDiv">
      <p id="name">{{ name }}</p>
      <p id="price">{{ price }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    props: ["name", "price"],
  };
</script>

<style scoped>
  .repo_container {
    height: 100px;
    width: 100%;
    cursor: pointer;
    outline: white solid 1px;
  }
</style>
