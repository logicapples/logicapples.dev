<!-- @format -->

<template>
  <div class="product_container">
    <div id="flexDiv">
      <p id="name">{{ name }}</p>
      <div id="details">
        <p id="store">{{ store }}</p>
        <p id="querySimilarity">{{ querySimilarity }}</p>
        <p id="price">{{ price.toLocaleString() + " €" }}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ["name", "price", "store", "querySimilarity"],
  };
</script>

<style scoped>
  .product_container {
    height: 50px;
    width: 80%;
    cursor: pointer;
    outline: white solid 1px;
    transition: all 0.2s;
  }
  .product_container:hover {
    background-color: aliceblue;
    scale: 1.02;
    outline: none;
  }

  #flexDiv {
    padding-left: 20px;
    display: flex;
    height: 100%;
    justify-content: space-between;
    align-items: center;
  }

  #details {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding-right: 20px;
    width: 20%;
  }
</style>
