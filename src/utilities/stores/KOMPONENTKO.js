/** @format */

import { load } from "cheerio";
//import { levenshtein } from "string-comparison";

const products = [];
const store = {
  KOMPONENTKO: "KomponentKo",
};

const fetchProducts = async searchQuery => {
  const url = `https://komponentko.si/?s=${searchQuery}&post_type=product&et_search=true&orderby=price`;
  const res = await fetch(`/api/cdn/fetchUrl?url=${url}`);
  //const resf = await fetch(
  //  `https://cors-anywhere.herokuapp.com/https://komponentko.si/?s=${searchQuery}&post_type=product&et_search=true&orderby=price`
  //);
  const html = await res.text();
  const $ = load(html);

  $(".content-product").each((i, child) => {
    const $sec = load(child);
    if (
      $sec(".items")[0].children[1].children[0].children[0].children[0]
        .children[0].data == "Odkupimo" ||
      !$sec(".price")[0]
    )
      return;
    const name = $sec(".product-title")[0].children[1].children[0].data;
    const displayStore = store.KOMPONENTKO;
    //const stringDiscount = $sec(".price")[0].children[2].children[0].children[0].children[0].data
    const stringPrice = $sec(".price")[0].children[0].children[0].children[0]
      .data
      ? $sec(".price")[0].children[0].children[0].children[0].data
      : $sec(".price")[0].children[0].children[0].children[0].children[0].data;
    const productPrice = Number(
      stringPrice.slice(0, -1).trim().replace(/\./g, "").replace(",", ".")
    );
    const id = $sec(".add_to_cart_button")[0].attribs["data-product_id"];
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
