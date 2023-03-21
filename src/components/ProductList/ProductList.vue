<template>
  <ul class="product-list">
    <ProductCard
      v-for="product in products"
      :key="product.productId"
      :product="product"
      @addtoFavorite="addtoFavorite"
      @removeFromFavorite="removeFromFavorite"
      @addToDeals="addToDeals"
      @payment="makePayment"
    />
  </ul>
</template>

<script lang="ts">
import ProductCard from "../ProductCard/ProductCard.vue";
import { PropType } from "vue";
import { IProduct } from "@/types/IProduct";
import { IDealProduct } from "@/types/IDealProduct";
import { useDealsStore } from "@/stores/dealsStore";
import { useFavoritsStore } from "@/stores/favoritsStore";

export default {
  name: "ProductList",
  props: {
    products: {
      type: Array as PropType<IProduct[]>,
      require: true,
    },
  },
  components: {
    ProductCard,
  },
  setup() {
    const dealsStore = useDealsStore();
    const favoritsStore = useFavoritsStore();
    const makePayment = (productName: string) => {
      alert(`Ваш товар ${productName} - оплачен!`);
    };

    const addtoFavorite = (cardItem: IProduct) => {
      console.log("addtoFavorite");
      favoritsStore.addFavoritsToFireBase(cardItem);
    };

    const removeFromFavorite = (cardItem: IProduct) => {
      console.log("removeFromFavorite");
      favoritsStore.removeFavoritsProducts(cardItem.productId);
    };

    //console.log(cardItem);
    const addToDeals = (cardItem: IDealProduct) => {
      console.log("addToDeals");
      dealsStore.addDealProductData(cardItem);
    };

    return {
      makePayment,
      addtoFavorite,
      removeFromFavorite,
      addToDeals,
    };
  },
};
</script>

<style scoped>
.product-list {
  display: grid;
  max-width: 1200px;
  margin-top: 40px;
}
</style>