/** @format */

import { load } from "cheerio";
import { levenshtein } from "string-comparison";
const Stores = {
  MIMOVRSTE: "Mimovrste",
  FUNTECH: "FunTech",
};

export default class ProductGetter {
  constructor(searchQuery) {
    this.searchQuery = searchQuery;
    if (!searchQuery) throw new Error("No search query provided!");
    this.mimovrsteProducts = [];
    this.funtechProducts = [];
    this.products = [];
  }

  async getAllProducts() {
    await this.fetchFuntech();
    await this.fetchMimovrste();
    //this.mimovrsteProducts = this.mimovrsteProducts.slice(0, 4);
    //this.funtechProducts = this.funtechProducts.slice(0, 4);
    this.products = [...this.funtechProducts, ...this.mimovrsteProducts];
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

    $(".artikli_vrstica2").each((i, child) => {
      child.children.forEach(child => {
        if (!child.attribs) return;
        child.children.forEach(child => {
          if (!child.attribs) return;
          const name = child.children[1].children[1].children[0].data;
          const store = Stores.FUNTECH;
          const id =
            child.children[9].children[1].attribs.href.match(/([1-9])\w+/g)[0];
          const stringPrice =
            child.children[7].children[1].children[3].children[0].data;
          const productPrice = Number(
            stringPrice.slice(0, -1).trim().replace(/\./g, "").replace(",", ".")
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
      });
    });
  }
}
