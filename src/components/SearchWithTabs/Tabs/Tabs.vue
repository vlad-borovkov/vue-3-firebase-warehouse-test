<template>
  <div class="tabs">
    <button
      :class="[
        'tabs__button',
        activeTabState === 'all' && 'tabs__button_active',
      ]"
      id="all"
      @click="handleBtnClick"
    >
      Все типы
    </button>
    <button
      :class="[
        'tabs__button',
        activeTabState === 'direct' && 'tabs__button_active',
      ]"
      id="direct"
      @click="handleBtnClick"
    >
      Прямые продажи
    </button>
    <button
      :class="[
        'tabs__button',
        activeTabState === 'auction' && 'tabs__button_active',
      ]"
      id="auction"
      @click="handleBtnClick"
    >
      Аукцион
    </button>
  </div>
</template>

<script lang="ts">
// активные состояния кнопок глядяа на роут и поле дата
export default {
  name: "Tabs",
  props: {
    activeTabState: String,
  },
  setup(props, { emit }) {
    const handleBtnClick = (event: any) =>
      emit("handleFilterClick", event.srcElement.id);

    return { handleBtnClick };
  },
};
</script>

<style scoped>
.tabs {
  width: 304px;
  height: 40px;
  background: #f4f5f9;
  border: 1px solid #e0e3ee;
  border-radius: 10px;
  display: flex;
  justify-content: space-evenly;
  align-content: center;
}
.tabs__button {
  font-family: "Rubik-Regular";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  color: #969dc3;
  border: none;
  background-color: transparent;
}
.tabs__button_active {
  color: #2d3b87;
}
</style>