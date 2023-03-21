import { defineStore } from 'pinia';
import {
    getDatabase,
    ref,
    set,
    onValue,
} from 'firebase/database';

import { IDealProduct } from '@/types/IDealProduct';
import { getArray } from '@/assets/adapters/convertToArray';


export const useDealsStore = defineStore('dealsStore', {
    state: () => ({
        sortDealProducts: [] as IDealProduct[],
        error: { message: '' },
        isLoading: false,
    }),
    getters: {
    },
    actions: {
        async fetchAllDealsProducts(endpoint: string, type?: string, searchString?: string) {
            try {
                this.isLoading = true;
                const dbRef = ref(getDatabase(), endpoint);
                onValue(dbRef, (snapshot) => {
                    if (snapshot.exists()) {

                        this.sortDealProducts = getArray(snapshot.val());

                        if (type === "all") this.getFilteredDealsProducts("Все", searchString)
                        if (type === 'direct') this.getFilteredDealsProducts("Разовая продажа", searchString)
                        if (type === 'auction') this.getFilteredDealsProducts("Аукцион", searchString)
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

        getFilteredDealsProducts(type?: string, searchString?: string) {

            let filteredProducts = this.sortDealProducts.slice();
            if (type !== 'Все') {
                filteredProducts = filteredProducts.filter((item: any) => item.sales_type === type);
            }
            if (searchString) {
                const adaptQuery = searchString.charAt(0).toUpperCase() + searchString.slice(1);
                filteredProducts = filteredProducts.filter((item: any) => item.name.startsWith(adaptQuery));
            }
            return this.sortDealProducts = filteredProducts;
        },
        addDealProductData(dealObject: IDealProduct) {
            const db = getDatabase();
            const getDealId = Date.now()
            set(ref(db, "deals/" + getDealId), {
                productId: dealObject.productId,
                dealId: getDealId,
                name: dealObject.name,
                about: dealObject.about,
                sales_type: dealObject.sales_type,
                product_type: dealObject.product_type,
                location: dealObject.location,
                salesman: dealObject.salesman,
                price_per_unit: dealObject.price_per_unit,
                unit_count: dealObject.unit_count,
                image: dealObject.image,
            });
        }
    },
});
