/** @format */

import { load } from "cheerio";
//import { levenshtein } from "string-comparison";

const products = [];
const store = "Balix";

const fetchProducts = async ({ searchQuery, apiPrefix }) => {
  const res = await fetch(
    `${apiPrefix}${store.toUpperCase()}&search=${encodeURIComponent(
      searchQuery
    )}`
  );

  const html = await res.text();
  const $ = load(html);

  $(".product-inner").each((i, child) => {
    const $sec = load(child);

    const name = $sec(".woocommerce-loop-product__title")[0].children[0].data;
    const stringPrice = $sec(
      ".woocommerce-Price-amount"
    )[0].children[0].children[0].data.replace(" ", "");
    const productPrice = Number(
      stringPrice.slice(0, -1).trim().replace(/\./g, "").replace(",", ".")
    );
    const id = 1;
    //const querySimilarity = levenshtein.distance(name, searchQuery);
    products.push({
      name,
      productPrice,
      store,
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
