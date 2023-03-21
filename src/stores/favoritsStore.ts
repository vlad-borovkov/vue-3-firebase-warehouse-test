import { defineStore } from 'pinia';
import {
  getDatabase,
  ref,
  set,
  onValue,
  remove,
} from 'firebase/database';
import { IProduct } from '@/types/IProduct';
import { getArray } from '@/assets/adapters/convertToArray';

export const useFavoritsStore = defineStore('favoritsStore', {
  state: () => ({
    sortFavorits: [] as IProduct[],
    error: { message: '' },
    isLoading: false,
  }),

  actions: {
    removeFavoritsProducts(objectProductId: string) {
      const db = getDatabase();
      remove(ref(db, 'favorits/' + objectProductId))
        .then(() => {
          this.sortFavorits = this.sortFavorits.filter((item) => item.productId !== objectProductId)
        })
        .catch((error) => {
          // The write failed...
        });
    },

    async fetchAllFavoritsProducts(endpoint: string, type?: string, searchString?: string) {
      try {
        this.isLoading = true;
        const dbRef = ref(getDatabase(), endpoint);
        onValue(dbRef, (snapshot) => {
          if (snapshot.exists()) {
            //useFavoritsStore().fetchAllFavoritsProducts('/favorits')

            this.sortFavorits = getArray(snapshot.val());

            if (type === "all") this.getFilteredFavoritsProducts("Все", searchString)
            if (type === 'direct') this.getFilteredFavoritsProducts("Разовая продажа", searchString)
            if (type === 'auction') this.getFilteredFavoritsProducts("Аукцион", searchString)
          } else {
            console.log("No data available");
          }
          this.isLoading = false;
        });
      } catch (error) {
        console.error(error);
        this.error.message = error.message;
      }
    },

    getFilteredFavoritsProducts(type?: string, searchString?: string) {
      let filteredProducts = this.sortFavorits.slice();

      if (type !== 'Все') {
        filteredProducts = filteredProducts.filter((item: any) => item.sales_type === type);
      }

      if (searchString) {
        const adaptQuery = searchString.charAt(0).toUpperCase() + searchString.slice(1);
        filteredProducts = filteredProducts.filter((item: any) => item.name.startsWith(adaptQuery));
      }
      return this.sortFavorits = filteredProducts;
    },

    addFavoritsToFireBase(favObj: IProduct) {
      const db = getDatabase();
      set(ref(db, "favorits/" + favObj.productId), {
        productId: favObj.productId,
        name: favObj.name,
        about: favObj.about,
        sales_type: favObj.sales_type,
        product_type: favObj.product_type,
        location: favObj.location,
        salesman: favObj.salesman,
        price_per_unit: favObj.price_per_unit,
        unit_count: favObj.unit_count,
        image: favObj.image,
      }).then(() => {
        // Data saved successfully!
      })
        .catch((error) => {
          // The write failed...
        });;
    },
  },
});