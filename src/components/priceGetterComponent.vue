<!-- @format -->

<script setup>
  import Product from "./Product.vue";
  import ProductGetter from "../utilities/product-getter";
  import CartProduct from "./CartProduct.vue";
</script>

<template>
  <div id="searchdiv">
    <form @submit.prevent="getSearch" id="searchForm">
      <label> Search for stuff </label>
      <input type="text" id="search-box" />
      <button id="submitButton" type="submit"> Search </button>
    </form>
    <button @click="sortBy('PRICE')">price</button>
    <button @click="sortBy('SIMILARITY')">similarity</button>
    <div class="result-products">
      <Product
        @click="addToList(one)"
        v-for="one of stuff"
        :name="one.name"
        :price="one.productPrice"
        :store="one.store"
        :querySimilarity="one.querySimilarity"
        v-if="is_data_fetched" />
    </div>
  </div>
  <div class="cart">
    <CartProduct
      v-for="one of finalListArray"
      :name="one.name"
      :price="one.productPrice"
      :store="one.store"
      :listID="one.id"
      v-if="cartEngaged" />
    <p id="cart-price" v-if="cartEngaged">{{ cartTotal.toLocaleString() }}</p>
  </div>
</template>

<script>
  export default {
    mounted() {
      this.emitter.on("removeCartElementEvent", key => {
        this.removeFromList(key);
      });
      this.emitter.on("searchButtonTextChange", text => {
        document.getElementById("submitButton").innerText = text;
      });
    },
    data() {
      return {
        stuff: null,
        is_data_fetched: false,
        finalListArray: [],
        cartEngaged: false,
        cartTotal: 0,
      };
    },
    methods: {
      async getSearch() {
        const searchBox = document.getElementById("search-box");
        const submitButton = document.getElementById("submitButton");
        const productGetter = new ProductGetter();
        this.is_data_fetched = false;
        document.getElementById("submitButton").disabled = true;

        submitButton.innerText = "fetching html";

        const products = await productGetter.getAllProducts(searchBox.value);

        this.stuff = products;
        this.is_data_fetched = true;
        submitButton.innerText = "done";
        submitButton.disabled = false;
      },
      addToList(product) {
        this.cartEngaged = true;
        if (this.finalListArray.find(x => x.id === product.id)) return;
        this.finalListArray.push(
          this.stuff.filter(x => x.name === product.name)[0]
        );
        const productPrice = this.finalListArray.slice(-1)[0].productPrice;
        this.cartTotal = this.cartTotal + productPrice;
      },
      removeFromList(key) {
        const productPrice = this.finalListArray.filter(
          item => item.id === key
        )[0].productPrice;
        this.finalListArray = this.finalListArray.filter(
          item => item.id !== key
        );
        this.cartTotal = this.cartTotal - productPrice;
        if (this.finalListArray.length < 1) {
          this.cartEngaged = false;
          this.cartTotal = 0;
        }
      },
      sortBy(method) {
        switch (method) {
          case "SIMILARITY":
            this.stuff
              .sort((a, b) => {
                return a.querySimilarity - b.querySimilarity;
              })
              .reverse();
            break;
          case "PRICE":
            this.stuff.sort((a, b) => {
              return a.productPrice - b.productPrice;
            });
            break;
          default:
            break;
        }
      },
    },
  };
</script>

<style scoped>
  #searchDiv {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #searchForm {
    display: flex;
    width: 520px;
  }

  .result-products {
    display: flex;
    width: 80%;
    justify-content: center;
    flex-wrap: wrap;
  }

  .cart {
    position: absolute;
    bottom: 60px;
    height: 60px;
    width: 100%;
  }

  .loader {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    animation: spin 1s linear infinite;
    display: none;
  }

  @keyframes spin {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
</style>
