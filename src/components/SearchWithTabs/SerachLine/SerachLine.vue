!<template>
  <form class="search" @submit.prevent>
    <input class="search__input" v-model="inputValue" @input="handleInput" />
    <button class="search__button">
      <img src="@/images/search.svg" alt="поиск товара" />
    </button>
  </form>
</template>

<script lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
export default {
  name: "SerachLine",
  setup(props, { emit }) {
    const currentQuery = useRouter().currentRoute.value.query.search;
    const inputValue = ref(currentQuery || "");

    const handleInput = () => {
      // требование тз - поиск с небольшой задержкой
      setTimeout(() => {
        emit("handleInput", inputValue.value);
      }, 300);
    };

    return {
      inputValue,
      handleInput,
    };
  },
};
</script>

<style scoped>
.search {
  position: relative;
}
.search__input {
  padding: 0 50px 0 20px;
  width: 274px;
  height: 48px;
  background: #ffffff;
  border: 1px solid #e0e3ee;
  border-radius: 10px;
  font-family: "Rubik-Regular";
  font-style: normal;
  font-weight: 400;
  font-size: 15px;
  color: #2d3b87;
}
.search__input:focus-visible {
  outline: -webkit-focus-ring-color none;
}
.search__button {
  position: absolute;
  top: 4px;
  right: 5px;
  width: 40px;
  height: 40px;
  background: #2d3b87;
  border-radius: 10px;
  border: none;
}
</style>