/** @format */

import { load } from "cheerio";
//import { levenshtein } from "string-comparison";

const products = [];
const store = {
  EXTREME_DIGITAL: "eDigital",
};

const fetchProducts = async searchQuery => {
  const res = await fetch(
    `/api/getStores?store=${
      Object.keys(store)[0]
    }&search=${encodeURIComponent(searchQuery)}`
  );
  const html = await res.text();
  const $ = load(html);

  $(".col-md-4").each((i, child) => {
    if (child.name != "li") return;
    const name = JSON.parse(child.children[0].attribs["data-ga-360-data"]).name;
    const displayStore = store.EXTREME_DIGITAL;
    const stringPrice =
      child.children[0].children[2].children[9].children[2].children[0]
        .children[0].data;
    const productPrice = Number(
      stringPrice.slice(0, -1).trim().replace(/\./g, "").replace(",", ".")
    );
    const id =
      child.children[0].children[2].children[7].children[1].children[1]
        .children[0].data;
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
