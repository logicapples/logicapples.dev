/** @format */

import { load } from "cheerio";
//import { levenshtein } from "string-comparison";

const products = [];
const store = {
  FUNTECH: "Funtech",
};

const fetchProducts = async searchQuery => {
  const url = `https://www.funtech.si/si/iskalnik/?search_company=10043&squery=${searchQuery}&sf_price=1&activeSort=sf_price`;
  const res = await fetch(`/api/cdn/fetchUrl?url=${url}`);
  //const resf = await fetch(
  //  `https://cors-anywhere.herokuapp.com/https://www.funtech.si/si/iskalnik/?search_company=10043&squery=${searchQuery}&sf_price=1&activeSort=sf_price`
  //);
  const html = await res.text();
  const $ = load(html);

  $(".artikel_podlaga").each((i, child) => {
    const $sec = load(child);
    const name = $sec(".artikel_naslov")[0].children[0].data;
    const displayStore = store.FUNTECH;
    const id = $sec("a")[0].attribs.href.match(/\/(\d+)\//)[1];
    const stringPrice = $sec(".cena_desno")[0]
      ? $sec(".cena_desno")[0].children[0].data
      : "0 €";
    const productPrice = Number(
      stringPrice.slice(0, -5).trim().replace(/\./g, "").replace(",", ".")
    );
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
