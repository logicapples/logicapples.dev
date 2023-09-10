/** @format */

import { load } from "cheerio";
//import { levenshtein } from "string-comparison";

const products = [];
const store = {
  MIMOVRSTE: "Mimovrste",
};

const fetchProducts = async searchQuery => {
  const res = await fetch(
    `/api/getStores?store=${
      Object.keys(store)[0]
    }&search=${encodeURIComponent(searchQuery)}`
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
    const displayStore = store.MIMOVRSTE;
    const id = child.attribs.id;
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
