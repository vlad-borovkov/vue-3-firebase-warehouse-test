<template>
  <Header />
  <SearchWithTabs @handleInput="handleFavoritsSearch" />
  <ProductList :products="favoritsSrore.sortFavorits" />
</template>
  
  
  <script lang="ts">
import { watch } from "vue";
import Header from "@/components/Header/Header.vue";
import SearchWithTabs from "@/components/SearchWithTabs/SearchWithTabs.vue";
import ProductList from "@/components/ProductList/ProductList.vue";
import { useRouter } from "vue-router";
import { useFavoritsStore } from "@/stores/favoritsStore";
export default {
  name: "Favorits",
  components: { Header, SearchWithTabs, ProductList },
  setup() {
    const favoritsSrore = useFavoritsStore();
    const router = useRouter();
    const currentQuery = router.currentRoute.value.query;

    const handleFavoritsSearch = (value: string) => {
      router.push({ query: { ...currentQuery, search: value } });
    };

    function getProducts(currentQuery) {
      console.log(currentQuery);
      favoritsSrore.fetchAllFavoritsProducts(
        "/favorits",
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

    return { favoritsSrore, handleFavoritsSearch };
  },
};
</script>
  
  <style lang="scss" scoped>
</style>