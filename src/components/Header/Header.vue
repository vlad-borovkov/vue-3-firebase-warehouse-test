<template>
  <div class="header">
    <div class="header__top"></div>
    <nav class="header__nav">
      <router-link
        :class="['nav__link', currentPath === 'Favorits' && 'nav__link_active']"
        :to="{ name: 'Favorits', query: { sales_type: 'all' } }"
      >
        <img src="@/images/favorits_dark.svg" />
        <span>Избранное</span>
      </router-link>
      <router-link
        :class="[
          'nav__link',
          currentPath === 'Warehouse' && 'nav__link_active',
        ]"
        :to="{ name: 'Warehouse', query: { sales_type: 'all' } }"
      >
        <img src="@/images/box.svg" />
        <span>Склад</span>
      </router-link>
      <router-link
        :class="['nav__link', currentPath === 'Deals' && 'nav__link_active']"
        :to="{ name: 'Deals', query: { sales_type: 'all' } }"
      >
        <img src="@/images/bag.svg" />
        <span>Сделки</span>
      </router-link>
    </nav>
  </div>
</template>

<script lang="ts">
import router from "@/router";

export default {
  name: "Header",
  setup(props, context) {
    const currentPath = router.currentRoute.value.name;

    return { currentPath };
  },
};
</script>

<style scoped>
.header {
  margin: 0;
  display: flex;
  flex-direction: column;
  margin-bottom: 88px;
}
.header__top {
  background-color: #e0e3ee;
  border-radius: 0px 0px 10px 10px;
  min-width: 1200px;
  height: 40px;
}

@media screen and (max-width: 1201px) and (min-width: 1023px) {
  .header__top {
    min-width: 1000px;
  }
}
.header__nav {
  display: flex;
  align-self: flex-end;
  margin-top: 20px;
}

.nav__link {
  font-family: "Rubik-Bold";
  font-style: bold;
  font-weight: 500;
  font-size: 13px;
  line-height: 13px;
  color: #2d3b87;
  text-decoration: none;
  width: 86px;
  height: 50px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 5px;
}
.nav__link_active {
  background: #f4f5f9;
}
</style>