/** @format */

import { load } from "cheerio";
//import { levenshtein } from "string-comparison";

const products = [];
const store = {
  ANNI: "Anni",
};

const fetchProducts = async searchQuery => {
  const url = `https://anni.si/search?search_query=${searchQuery}&submit_search=&orderby=price&orderway=asc`;
  const res = await fetch(`http://localhost:8080/fetchText?url=${encodeURI(url, "UTF-8")}`);
  //const resf = await fetch(
  //  `https://cors-anywhere.herokuapp.com/https://anni.si/search?search_query=${searchQuery}&submit_search=&orderby=price&orderway=asc`
  //);
  const html = await res.text();
  console.log(html);
  const $ = load(html);

  $(".ajax_block_product").each((i, child) => {
    const $sec = load(child);
    const name = $sec(".product-name")[0].children[0].data.trim();
    const stringPrice = $sec(".product-price")[0].children[0].data.trim();
    const productPrice = Number(
      stringPrice.slice(0, -1).trim().replace(/\./g, "").replace(",", ".")
    );
    const displayStore = store.ANNI;
    const id = child.attribs["data-id-product"];
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
