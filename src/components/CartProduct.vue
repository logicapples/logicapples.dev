<!-- @format -->

<template>
  <div class="cart_item_container">
    <div id="left">
      <p id="name">{{ name }}</p>
      <p id="store">{{ store }}</p>
    </div>
    <div id="right">
      <p id="price">{{ price.toLocaleString() + " €" }}</p>
      <div id="trash-can" @click="removeElement"></div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ["name", "price", "store", "listID"],
    methods: {
      async removeElement() {
        let self = this;
        this.emitter.emit("removeCartElementEvent", self.listID);
      },
    },
  };
</script>

<style scoped>
  .cart_item_container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: lightblue;
    color: white;
  }

  #store {
    color: lightgray;
  }

  #trash-can {
    height: 60px;
    width: 60px;
    background-image: url("@/assets/trash-can-closed.webp");
    object-fit: cover;
    background-size: cover;
  }

  #trash-can:hover {
    background-image: url("@/assets/trash-can-opened.webp");
    cursor: pointer;
  }

  #right {
    display: flex;
  }

  #left {
    display: flex;
    flex-direction: column;
  }
</style>
