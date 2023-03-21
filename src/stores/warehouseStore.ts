import { defineStore } from 'pinia';
import {
  getDatabase,
  ref,
  set,
  onValue,
} from 'firebase/database';

import { IProduct } from '@/types/IProduct';
import { getArray } from '@/assets/adapters/convertToArray';
import { useFavoritsStore } from './favoritsStore';

export const useWarehouseStore = defineStore('warehouseStore', {
  state: () => ({
    sortProducts: [] as IProduct[],
    error: { message: '' },
    isLoading: false,
  }),
  actions: {
    async fetchAllWarehouseProducts(endpoint: string, type?: string, searchString?: string) {
      try {
        this.isLoading = true;
        const dbRef = ref(getDatabase(), endpoint);
        const dbRefFav = ref(getDatabase(), '/favorits')

        onValue(dbRef, (snapshot) => {
          if (snapshot.exists()) {
            this.sortProducts = getArray(snapshot.val());
            if (type === "all") this.getFilteredProducts("Все", searchString)
            if (type === 'direct') this.getFilteredProducts("Разовая продажа", searchString)
            if (type === 'auction') this.getFilteredProducts("Аукцион", searchString)
          } else {
            console.log("No data available");
          }
          this.isLoading = false;
        });

        onValue(dbRefFav, (snapshot) => {
          if (snapshot.exists()) {
            useFavoritsStore().sortFavorits = getArray(snapshot.val());
          } else {
            console.log("No data available");
          }
          this.isLoading = false;
        })
      } catch (error) {
        console.error(error);
        this.error.message = error.message;
      }
    },

    getFilteredProducts(type?: string, searchString?: string) {

      let filteredProducts = this.sortProducts.slice();

      if (type !== 'Все') {
        filteredProducts = filteredProducts.filter((item: any) => item.sales_type === type);
      }

      if (searchString) {
        const adaptQuery = searchString.charAt(0).toUpperCase() + searchString.slice(1);
        filteredProducts = filteredProducts.filter((item: any) => item.name.startsWith(adaptQuery));
      }
      return this.sortProducts = filteredProducts;
    },

    addProductToFireBase() {

      function writeUserData(productId, name, about, sales_type, product_type, location, salesman, price_per_unit, unit_count, image) {
        const db = getDatabase();
        set(ref(db, "warehouse/" + productId), {
          productId: productId,
          name: name,
          about: about,
          sales_type: sales_type,
          product_type: product_type,
          location: location,
          salesman: salesman,
          price_per_unit: price_per_unit,
          unit_count: unit_count,
          image: image,
        });
      }

      this.products.map((item) => writeUserData(item.productId, item.name, item.about, item.sales_type, item.product_type, item.location, item.salesman, item.price_per_unit, item.unit_count, item.image))

    },
  },
});
