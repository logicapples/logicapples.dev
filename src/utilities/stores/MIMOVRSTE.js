/** @format */

import { load } from "cheerio";
//import { levenshtein } from "string-comparison";

const products = [];
const store = "Mimovrste";

const fetchProducts = async ({ searchQuery, apiPrefix }) => {
  const res = await fetch(
    `${apiPrefix}${store.toUpperCase()}&search=${encodeURIComponent(
      searchQuery
    )}`
  );
  const html = await res.text();
  const $ = load(html);

  $(".pbcr").each((i, child) => {
    const name = child.children[3].children[0].children[0].data.trim();
    const stringPrice =
      child.children[6].children[5].children[0].children[0].data;
    const productPrice = Number(
      stringPrice.slice(0, -5).trim().replace(/\./g, "").replace(",", ".")
    );
    const id = child.attribs.id;
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
