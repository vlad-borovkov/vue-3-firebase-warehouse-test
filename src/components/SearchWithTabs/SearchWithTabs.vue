<template>
  <div class="search-with-tabs">
    <Tabs @handleFilterClick="setActiveTab" :activeTabState="activeTabState" />
    <SearchLine @handleInput="handleInput" />
  </div>
</template>

<script lang="ts">
import { ref, computed, onBeforeMount, onMounted, onUpdated } from "vue";
import Tabs from "@/components/SearchWithTabs/Tabs/Tabs.vue";
import SearchLine from "@/components/SearchWithTabs/SerachLine/SerachLine.vue";
import { useRouter } from "vue-router";

export default {
  name: "SearchWithTabs",
  components: { Tabs, SearchLine },
  setup(props, { emit }) {
    const router = useRouter();
    const currentQuery = router.currentRoute.value.query;
    const activeTabState = ref("") as any;

    const setActiveTab = (tabId: string) => {
      activeTabState.value = tabId;
      router.push({ query: { ...currentQuery, sales_type: tabId } });
    };
    // ставим значение активного таба, смотря на роут. пока хардкодит один тип фильтра, можно улучшить на универсальный
    onBeforeMount(() => {
      activeTabState.value = router.currentRoute.value.query.sales_type;
    });

    const handleInput = (inputValue: string) => {
      emit("handleInput", inputValue);
    };

    return { setActiveTab, activeTabState, handleInput };
  },
};
</script>

<style scoped>
.search-with-tabs {
  display: flex;
  min-width: 1200px;
  justify-content: space-between;
}

@media screen and (max-width: 1201px) and (min-width: 1023px) {
  .search-with-tabs {
    min-width: 1000px;
  }
}
</style>