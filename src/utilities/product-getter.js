/** @format */

import { load } from "cheerio";
import { levenshtein } from "string-comparison";
import { useGlobals } from "../main.js";

import mimovrste from "@/utilities/stores/MIMOVRSTE";
import funtech from "@/utilities/stores/FUNTECH";
import eDigital from "@/utilities/stores/EXTREME_DIGITAL";
import komponentko from "@/utilities/stores/KOMPONENTKO";
import anni from "@/utilities/stores/ANNI";
import eIgre from "@/utilities/stores/EIGRE";

const Stores = {
  MIMOVRSTE: "Mimovrste",
  FUNTECH: "FunTech",
  EXTREME_DIGITAL: "eDigital",
  KOMPONENTKO: "KomponentKo",

  ANNI: "Anni",
  EIGRE: "eIgre",
};

export default class ProductGetter {
  constructor() {
    this.products = [];
  }

  async getAllProducts(searchQuery) {
    const { emitter } = useGlobals();

    emitter.emit(
        "searchButtonTextChange",
        {
          text: `Fetching ${mimovrste.store.MIMOVRSTE} | 1/6`,
          degrees: "60"
        }
    );
    await mimovrste.fetchProducts(searchQuery);
    
    emitter.emit("searchButtonTextChange", {text:`Fetching ${funtech.store.FUNTECH} | 2/6`, degrees:"120"});
    await funtech.fetchProducts(searchQuery);
    
    emitter.emit(
      "searchButtonTextChange",
      {
        text: `Fetching ${eDigital.store.EXTREME_DIGITAL} | 3/6`,
        degrees: "180"
      }
    );
    await eDigital.fetchProducts(searchQuery);
    
    emitter.emit(
      "searchButtonTextChange",
      {text: `Fetching ${komponentko.store.KOMPONENTKO} | 4/6`,
      degrees: "240"}
    );
    await komponentko.fetchProducts(searchQuery);
    
    emitter.emit(
      "searchButtonTextChange",
      {text:`Fetching ${anni.store.ANNI} | 5/6`,
      degrees: "300"}
    );
    await anni.fetchProducts(searchQuery);
    
    emitter.emit(
      "searchButtonTextChange",
      {text:`Fetching ${eIgre.store.EIGRE} | 6/6`,
      degrees: "360"}
    );
    await eIgre.fetchProducts(searchQuery);

    //blokada
    //mimovrste.products = mimovrste.products.slice(0, 4);

    this.products = [
      ...mimovrste.products,
      ...funtech.products,
      ...eDigital.products,
      ...komponentko.products,
      ...anni.products,
      ...eIgre.products,
    ];
    this.products = this.products
      .sort((a, b) => {
        return a.querySimilarity - b.querySimilarity;
      })
      .reverse();
    this.products = this.products.sort((a, b) => {
      return a.productPrice - b.productPrice;
    });
    return this.products; //.slice(0, 15);
  }
}
