/** @format */

import { load } from "cheerio";
import { levenshtein } from "string-comparison";
import { useGlobals } from "../main.js";
const Stores = {
  MIMOVRSTE: "Mimovrste",
  FUNTECH: "FunTech",
  EXTREME_DIGITAL: "eDigital",
  KOMPONENTKO: "KomponentKo",
};

export default class ProductGetter {
  constructor() {
    this.mimovrsteProducts = [];
    this.funtechProducts = [];
    this.extremeDigitalProducts = [];
    this.komponentkoProducts = [];
    this.products = [];
  }

  async getAllProducts(searchQuery) {
    this.searchQuery = searchQuery;

    const { emitter } = useGlobals();

    emitter.emit(
      "searchButtonTextChange",
      `Fetching ${Stores.KOMPONENTKO} | 1/4`
    );
    await this.fetchKomponentko();
    emitter.emit(
      "searchButtonTextChange",
      `Fetching ${Stores.EXTREME_DIGITAL} | 2/4`
    );
    await this.fetchExtremeDigital();
    emitter.emit("searchButtonTextChange", `Fetching ${Stores.FUNTECH} | 3/4`);
    await this.fetchFuntech();
    emitter.emit(
      "searchButtonTextChange",
      `Fetching ${Stores.MIMOVRSTE} | 4/4`
    );
    await this.fetchMimovrste();

    //blokada
    //this.mimovrsteProducts = this.mimovrsteProducts.slice(0, 4);

    this.products = [
      ...this.funtechProducts,
      ...this.mimovrsteProducts,
      ...this.extremeDigitalProducts,
      ...this.komponentkoProducts,
    ];
    this.products = this.products
      .sort((a, b) => {
        return a.querySimilarity - b.querySimilarity;
      })
      .reverse();
    this.products = this.products.sort((a, b) => {
      return a.productPrice - b.productPrice;
    });
    return this.products.slice(0, 15);
  }

  async fetchMimovrste() {
    const res = await fetch(
      `https://cors-anywhere.herokuapp.com/https://www.mimovrste.com/iskanje?src=sug&s=${this.searchQuery}&o=_price`
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
      const store = Stores.MIMOVRSTE;
      const id = child.attribs.id;
      const querySimilarity = levenshtein.distance(name, this.searchQuery);
      this.mimovrsteProducts.push({
        name,
        productPrice,
        store,
        id,
        querySimilarity,
      });
    });
  }

  async fetchFuntech() {
    const res = await fetch(
      `https://cors-anywhere.herokuapp.com/https://www.funtech.si/si/iskalnik/?search_company=10043&squery=${this.searchQuery}&sf_price=1&activeSort=sf_price`
    );
    const html = await res.text();
    const $ = load(html);

    $(".artikel_podlaga").each((i, child) => {
      const $sec = load(child);
      const name = $sec(".artikel_naslov")[0].children[0].data;
      const store = Stores.FUNTECH;
      const id = $sec("a")[0].attribs.href.match(/\/(\d+)\//)[1];
      const stringPrice = $sec(".cena_desno")[0]
        ? $sec(".cena_desno")[0].children[0].data
        : "0 €";
      const productPrice = Number(
        stringPrice.slice(0, -5).trim().replace(/\./g, "").replace(",", ".")
      );
      const querySimilarity = levenshtein.distance(name, this.searchQuery);
      this.funtechProducts.push({
        name,
        productPrice,
        store,
        id,
        querySimilarity,
      });
    });
  }

  async fetchExtremeDigital() {
    const res = await fetch(
      `https://cors-anywhere.herokuapp.com/https://edigital.si/search?product%5Bsearch%5D=${this.searchQuery}&product%5Border%5D=cheapest`
    );
    const html = await res.text();
    const $ = load(html);

    $(".col-md-4").each((i, child) => {
      if (child.name != "li") return;
      const name = JSON.parse(
        child.children[0].attribs["data-ga-360-data"]
      ).name;
      const store = Stores.EXTREME_DIGITAL;
      const stringPrice =
        child.children[0].children[2].children[9].children[2].children[0]
          .children[0].data;
      const productPrice = Number(
        stringPrice.slice(0, -1).trim().replace(/\./g, "").replace(",", ".")
      );
      const id =
        child.children[0].children[2].children[7].children[1].children[1]
          .children[0].data;
      const querySimilarity = levenshtein.distance(name, this.searchQuery);
      this.extremeDigitalProducts.push({
        name,
        productPrice,
        store,
        id,
        querySimilarity,
      });
    });
  }

  async fetchKomponentko() {
    const res = await fetch(
      `https://cors-anywhere.herokuapp.com/https://komponentko.si/?s=${this.searchQuery}&post_type=product&et_search=true&orderby=price`
    );
    const html = await res.text();
    const $ = load(html);

    $(".content-product").each((i, child) => {
      const $sec = load(child);
      if (
        $sec(".items")[0].children[1].children[0].children[0].children[0]
          .children[0].data == "Odkupimo" || !$sec(".price")[0]
      )
        return;
      const name = $sec(".product-title")[0].children[1].children[0].data;
      const store = Stores.KOMPONENTKO;
      //const stringDiscount = $sec(".price")[0].children[2].children[0].children[0].children[0].data
      const stringPrice = $sec(".price")[0].children[0].children[0].children[0]
        .data
        ? $sec(".price")[0].children[0].children[0].children[0].data
        : $sec(".price")[0].children[0].children[0].children[0].children[0]
            .data;
      const productPrice = Number(
        stringPrice.slice(0, -1).trim().replace(/\./g, "").replace(",", ".")
      );
      const id = $sec(".add_to_cart_button")[0].attribs["data-product_id"];
      const querySimilarity = levenshtein.distance(name, this.searchQuery);
      this.extremeDigitalProducts.push({
        name,
        productPrice,
        store,
        id,
        querySimilarity,
      });
    });
  }
}
