<template>
  <Header />
  <SearchWithTabs @handleInput="handleWarehouseSearch" />
  <ProductList
    :products="warehouseStore.sortProducts"
    :key="warehouseStore.sortProducts.length"
  />
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onBeforeMount,
  watch,
  ref,
  onMounted,
} from "vue";
import Header from "@/components/Header/Header.vue";
import SearchWithTabs from "@/components/SearchWithTabs/SearchWithTabs.vue";
import ProductList from "@/components/ProductList/ProductList.vue";
import { useRouter } from "vue-router";
import { useWarehouseStore } from "@/stores/warehouseStore";
import { useFavoritsStore } from "@/stores/favoritsStore";
import { connectDatabaseEmulator } from "@firebase/database";

export default {
  name: "Warehouse",
  components: { Header, SearchWithTabs, ProductList },

  setup(props, context) {
    const router = useRouter();
    const warehouseStore = useWarehouseStore();
    const currentQuery = router.currentRoute.value.query;

    const handleWarehouseSearch = (value: string) => {
      router.push({ query: { ...currentQuery, search: value } });
    };

    function getProducts(currentQuery) {
      console.log(currentQuery);
      warehouseStore.fetchAllWarehouseProducts(
        "/warehouse",
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

    return { warehouseStore, handleWarehouseSearch };
  },
};
</script>

<style lang="scss" scoped>
</style>