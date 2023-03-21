<template>
  <template v-if="btnType === 'pay'">
    <button
      v-bind:class="['add-to-btn_pay', isActive && 'active-btn_pay']"
      @click="handleClick"
    >
      <p
        :class="[
          'product-card__add-pay-btn-text',
          isActive && 'product-card__add-pay-btn-text_active',
        ]"
      >
        <slot></slot>
      </p>
    </button>
  </template>
  <template v-else-if="btnType === 'favorite'">
    <button
      v-bind:class="['add-to-btn', isActive && 'active-btn_favorite']"
      @click="handleClick"
    >
      <slot></slot>
    </button>
  </template>
  <template v-else-if="btnType === 'deal'">
    <button v-bind:class="['add-to-btn']" @click="handleClick">
      <p :class="['product-card__add-deal-btn-text ']">
        <slot></slot>
      </p>
    </button>
  </template>
</template>

<script lang="ts">
import { toRefs } from "vue";

export default {
  name: "add-to-button",
  props: {
    isActive: {
      type: Boolean,
    },
    btnType: {
      type: String,
    },
  },

  setup(props, { emit }) {
    const handleClick = () => emit("handleClick");

    return { handleClick };
  },
};
</script>

<style scoped>
.add-to-btn_pay {
  background: #69c57f;
  border-radius: 10px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
}
.active-btn_pay {
  background: #ffffff;
}
.add-to-btn {
  background: #f4f5f9;
  border-radius: 10px;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
}
.add-to-btn:hover {
  opacity: 0.8;
}
.active-btn_favorite {
  background: #2d3b87;
}

.product-card__add-pay-btn-text {
  width: 212px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Rubik-Bold";
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  color: #ffffff;
}

.product-card__add-pay-btn-text_active {
  color: #969dc3;
}

.product-card__add-deal-btn-text {
  width: 212px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Rubik-Bold";
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  color: #2d3b87;
}
</style>