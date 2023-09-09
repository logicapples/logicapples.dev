/** @format */

import { load } from "cheerio";
//import { levenshtein } from "string-comparison";

const products = [];
const store = {
  EXTREME_DIGITAL: "eDigital",
};

const fetchProducts = async searchQuery => {
  const url = `https://edigital.si/search?product%5Bsearch%5D=${searchQuery}&product%5Border%5D=cheapest`;
  const res = await fetch(`/api/cdn/fetchUrl?url=${url}`);
  //const resf = await fetch(
  //  `https://cors-anywhere.herokuapp.com/https://edigital.si/search?product%5Bsearch%5D=${searchQuery}&product%5Border%5D=cheapest`
  //);
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
