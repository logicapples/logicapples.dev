/** @format */

import { load } from "cheerio";
//import { levenshtein } from "string-comparison";

const products = [];
const store = "Akcija";

async function fetchProducts({searchQuery, apiPrefix}) {
  const res = await fetch(
    `${apiPrefix}${store.toUpperCase()}&search=${encodeURIComponent(
      searchQuery
    )}`
  );
  const html = await res.text();
  const $ = load(html);

  $(".wrapper_prods").each((i, child) => {
    const $sec = load(child);
    const name = $sec(".ProductNameOneLine")[0].children[0].children[0]
      .children[0].children[0].data;

    const stringPrice = $sec(".price")[0].children[1].children[0].data.trim();
    const productPrice = Number(
      stringPrice.slice(0, -1).trim().replace(/\./g, "").replace(",", ".")
    );
    const id = child.attribs["data-productid"];
    //const querySimilarity = levenshtein.distance(name, searchQuery);
    products.push({
      name,
      productPrice,
      store,
      id,
      //querySimilarity,
    });
  });
}

export default {
  fetchProducts,
  store,
  products,
};
