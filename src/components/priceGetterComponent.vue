<!-- @format -->

<script setup>
  import cheerio from "cheerio";
  import Product from "./Product.vue";
  import ProductGetter from "../utilities/product-getter"
  const { data: value } = [{ name: "hi", price: 300 }];
</script>

<template>
  <div id="searchdiv">
    <form @submit.prevent="getSearch">
      <label> Search for stuff </label>
      <input type="text" id="search-box" />
      <button id="submitButton" type="submit">submit</button>
    </form>
    <div class="result-products">
      <Product
        @click="addToList(one)"
        v-for="one of stuff"
        :name="one.name"
        :price="one.price"
        :store="'mimovrste'"
        v-if="is_data_fetched" />
    </div>
  </div>
  <div class="cart">
    <p id="cart-price" v-if="cartEngaged">{{ cartTotal }}</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        stuff: null,
        is_data_fetched: false,
        finalListArray: [],
        cartEngaged: false,
        cartTotal: 0
      };
    },
    methods: {
      async getSearch() {
        const searchBox = document.getElementById("search-box");
        const submitButton = document.getElementById("submitButton");
        const productGetter = new ProductGetter(searchBox.value);
        submitButton.innerText = "fetching html";
        
        const products = await productGetter.getAllProducts();

        this.stuff = products;
        this.is_data_fetched = true;
        submitButton.innerText = "done";
      },
      addToList(product) {
        this.finalListArray.push(this.stuff.filter(x => x.name === product.name));
        console.log(this.finalListArray);
        this.finalListArray.forEach(x => {
          console.log(x[0].price.slice(0, -5).trim());
          this.cartTotal = this.cartTotal + Number(x[0].price.slice(0, -5).trim())
        })
        console.log(this.cartTotal);
        this.cartEngaged = true;
      },
    },
  };
</script>

<style scoped>
  #searchdiv {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  .result-products {
    display: flex;
    width: 80%;
    flex-wrap: wrap;
  }
</style>
