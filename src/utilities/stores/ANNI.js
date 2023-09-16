/** @format */

import { load } from "cheerio";
//import { levenshtein } from "string-comparison";

const products = [];
const store = "Anni";

const fetchProducts = async searchQuery => {
  const res = await fetch(
    `/api/getStores?store=${store.toUpperCase()}&search=${encodeURIComponent(
      searchQuery
    )}`
  );
  const html = await res.text();
  const $ = load(html);

  $(".ajax_block_product").each((i, child) => {
    const $sec = load(child);
    const name = $sec(".product-name")[0].children[0].data.trim();
    const stringPrice = $sec(".product-price")[0].children[0].data.trim();
    const productPrice = Number(
      stringPrice.slice(0, -1).trim().replace(/\./g, "").replace(",", ".")
    );
    const id = child.attribs["data-id-product"];
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
