import { load } from "cheerio";
const Stores = {
	MIMOVRSTE: Symbol("Mimovrste"),
}

export default class ProductGetter {
    constructor(searchQuery) {
        this.searchQuery = searchQuery
        if (!searchQuery) throw new Error("No search query provided!");
        this.products = [];
    }

    async getAllProducts() {
        await this.fetchMimovrste();
        return this.products.slice(0, 4);
    }

    async fetchMimovrste() {
        const res = await fetch(
            `https://cors-anywhere.herokuapp.com/https://www.mimovrste.com/iskanje?src=sug&s=${this.searchQuery}&o=_price`
          );
        const html = await res.text();
        const $ = load(html);
        
        $(".pbcr").each((i, child) => {
            const name = child.children[3].children[0].children[0].data.trim();
            const price =
              child.children[6].children[5].children[0].children[0].data;
            const store = Stores.MIMOVRSTE
            this.products.push({ name, price, store });
        });
    }
}