<!-- @format -->

<script setup>
  import cheerio from "cheerio";
  import Product from "./Product.vue";
  const { data: value } = [{ name: "hi", price: 300 }];
</script>

<template>
  <div id="searchdiv">
    <form @submit.prevent="getSearch">
      <label> Search for stuff </label>
      <input type="text" id="search-box" />
      <button id="submitButton" type="submit">submit</button>
    </form>
    <Product
      @click="addToList(one.id)"
      v-for="one of stuff"
      :name="one.name"
      :price="one.price"
      v-if="is_data_fetched" />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        stuff: null,
        is_data_fetched: false,
        finalListArray: [],
      };
    },
    methods: {
      async getSearch() {
        const searchBox = document.getElementById("search-box");
        const submitButton = document.getElementById("submitButton");
        submitButton.innerText = "fetching html";
        const res = await fetch(
          `https://cors-anywhere.herokuapp.com/https://www.mimovrste.com/iskanje?src=sug&s=${searchBox.value}&o=_price`
        );
        const html = await res.text();
        submitButton.innerText = "parsing html";
        const $ = cheerio.load(html);

        const products = [];

        $(".pbcr").each((i, child) => {
          const id = i;
          const name = child.children[3].children[0].children[0].data.trim();
          const price =
            child.children[6].children[5].children[0].children[0].data;
          products.push({ id, name, price });
        });

        //const { data: value } = products;
        //isLoaded = true;
        this.stuff = products.slice(0, 2);
        this.is_data_fetched = true;
        submitButton.innerText = "done";
      },
      addToList(productId) {
        this.finalListArray.push(this.stuff[productId]);
        console.log(this.finalListArray);
      },
    },
  };
</script>

<style scoped>
  #searchdiv {
    display: flex;
    flex-direction: column;
  }
</style>
