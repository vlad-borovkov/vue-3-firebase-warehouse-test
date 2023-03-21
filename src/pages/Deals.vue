<template>
  <Header />
  <SearchWithTabs @handleInput="handleDealsSearch" />
  <ProductList :products="dealsStore.sortDealProducts" />
</template>
  
  
  <script lang="ts">
import { watch } from "vue";
import Header from "@/components/Header/Header.vue";
import SearchWithTabs from "@/components/SearchWithTabs/SearchWithTabs.vue";
import ProductList from "@/components/ProductList/ProductList.vue";
import { useRouter } from "vue-router";
import { useDealsStore } from "@/stores/dealsStore";
export default {
  name: "Deals",
  components: { Header, SearchWithTabs, ProductList },
  setup() {
    const router = useRouter();
    const dealsStore = useDealsStore();

    const currentQuery = router.currentRoute.value.query;

    const handleDealsSearch = (value: string) => {
      router.push({ query: { ...currentQuery, search: value } });
    };

    function getProducts(currentQuery) {
      console.log(currentQuery);
      dealsStore.fetchAllDealsProducts(
        "/deals",
        currentQuery.sales_type,
        currentQuery.search
      );
    }
    getProducts(currentQuery);

    watch(
      () => router.currentRoute.value.query,
      (query) => {
        getProducts(query);
      }
    );

    // получаем сделки при открытии страницы
    return { dealsStore, handleDealsSearch };
  },
};
</script>
  
  <style lang="scss" scoped>
</style>