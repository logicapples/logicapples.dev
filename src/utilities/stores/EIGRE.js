/** @format */

import { load } from "cheerio";
//import { levenshtein } from "string-comparison";

const products = [];
const store = {
  EIGRE: "eIgre",
};

const fetchProducts = async searchQuery => {
  const res = await fetch(
    `http://localhost:8080/getStores?store=${
      Object.keys(store)[0]
    }&search=${encodeURIComponent(searchQuery)}`
  );
  const html = await res.text();
  const $ = load(html);

  $(".product-item-info").each((i, child) => {
    const $sec = load(child);
    const name = $sec(".product-item-link")[0].children[0].data;
    const stringPrice =
      $sec(".price-box")[0].children[0].children[0].children[0].children[0]
        .data;
    const productPrice = Number(
      stringPrice.slice(0, -1).trim().replace(/\./g, "").replace(",", ".")
    );
    const id = $sec(".price-box")[0].attribs["data-product-id"];
    const displayStore = store.EIGRE;
    //const querySimilarity = levenshtein.distance(name, searchQuery);
    products.push({
      name,
      productPrice,
      displayStore,
      id,
      //querySimilarity,
    });
  });
};

export default {
  fetchProducts,
  products,
  store,
};
