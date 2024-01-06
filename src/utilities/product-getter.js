/** @format */

import { useGlobals } from "../main.js";

import mimovrste from "@/utilities/stores/MIMOVRSTE";
import funtech from "@/utilities/stores/FUNTECH";
import eDigital from "@/utilities/stores/EXTREME_DIGITAL";
import komponentko from "@/utilities/stores/KOMPONENTKO";
import anni from "@/utilities/stores/ANNI";
import eIgre from "@/utilities/stores/EIGRE";
import balix from "@/utilities/stores/BALIX";
import akcija from "@/utilities/stores/AKCIJA";

export default class ProductGetter {
  constructor() {
    this.products = [];
    this.apiPrefix = "/api/getStores?store=";
  }

  async getAllProducts(searchQuery) {
    const { emitter } = useGlobals();
    const fetchParams = {searchQuery, apiPrefix: this.apiPrefix}

    emitter.emit("searchButtonTextChange", {
      text: `Fetching ${mimovrste.store} | 1/8`,
      degrees: "45",
    });
    await mimovrste.fetchProducts(fetchParams);

    emitter.emit("searchButtonTextChange", {
      text: `Fetching ${funtech.store} | 2/8`,
      degrees: "90",
    });
    await funtech.fetchProducts(fetchParams);

    emitter.emit("searchButtonTextChange", {
      text: `Fetching ${eDigital.store} | 3/8`,
      degrees: "135",
    });
    await eDigital.fetchProducts(fetchParams);

    emitter.emit("searchButtonTextChange", {
      text: `Fetching ${komponentko.store} | 4/8`,
      degrees: "180",
    });
    await komponentko.fetchProducts(fetchParams);

    emitter.emit("searchButtonTextChange", {
      text: `Fetching ${anni.store} | 5/8`,
      degrees: "225",
    });
    await anni.fetchProducts(fetchParams);

    emitter.emit("searchButtonTextChange", {
      text: `Fetching ${eIgre.store} | 6/8`,
      degrees: "270",
    });
    await eIgre.fetchProducts(fetchParams);

    emitter.emit("searchButtonTextChange", {
      text: `Fetching ${balix.store} | 7/8`,
      degrees: "315",
    });
    await balix.fetchProducts(fetchParams);

    emitter.emit("searchButtonTextChange", {
      text: `Fetching ${akcija.store} 8/8`,
      degrees: "360",
    });
    await akcija.fetchProducts(fetchParams);

    //blokada
    //mimovrste.products = mimovrste.products.slice(0, 4);

    this.products = [
      ...mimovrste.products,
      ...funtech.products,
      ...eDigital.products,
      ...komponentko.products,
      ...anni.products,
      ...eIgre.products,
      ...balix.products,
      ...akcija.products,
    ];

    console.log(this.products);
    this.products = this.products
      .sort((a, b) => {
        return a.querySimilarity - b.querySimilarity;
      })
      .reverse();
    //this.products = this.products.sort((a, b) => {
    //  return a.productPrice - b.productPrice;
    //});
    return this.products; //.slice(0, 15);
  }
}
