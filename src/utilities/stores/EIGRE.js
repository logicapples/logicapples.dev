/** @format */

import { load } from "cheerio";
//import { levenshtein } from "string-comparison";

const products = [];
const store = {
  EIGRE: "eIgre",
};

const fetchProducts = async searchQuery => {
  const url = `https://eigre.si/catalogsearch/result/index/?product_list_order=price&q=${searchQuery}&product_list_dir=asc`;
  const res = await fetch(`/api/cdn/fetchUrl?url=${url}`);
  //const resf = await fetch(
  //  `https://cors-anywhere.herokuapp.com/https://eigre.si/catalogsearch/result/index/?product_list_order=price&q=${searchQuery}&product_list_dir=asc`
  //);
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
