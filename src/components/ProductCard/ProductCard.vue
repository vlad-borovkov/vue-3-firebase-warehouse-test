<template>
  <li class="product-card">
    <img class="product-card__img" :src="`${product.image}`" alt="доски" />
    <div class="product-card__about">
      <p class="about__sale-type">{{ product.sales_type }}</p>
      <h2 class="about__title">{{ product.name }}</h2>
      <p class="about__location">
        <img src="@/images/geo.svg" alt="геотег" />
        <span about__location-text>{{ product.location }}</span>
      </p>
      <p class="about__sales-person-title">
        Продавец
        <span class="about__sales-person"> {{ product.salesman }}</span>
      </p>

      <p class="about__product-type-title">
        Вид товара
        <span class="about__product-type"> {{ product.product_type }} </span>
      </p>
      <div class="about__description">
        {{ product.about }}
      </div>
    </div>
    <div class="product-card__price">
      <div class="price-wrap">
        <p class="price__amount">{{ computedPrice }}</p>
        <p class="price__quantity">
          <span class="price__quantity-title">Колличество</span>
          <span class="price__quantity-value">{{ product.unit_count }}</span>
        </p>
        <p class="price__per-piece">
          <span class="price__per-piece-title">Стоимость за штуку</span>
          <span class="price__per-piece-value">{{ computedMaskPer }}</span>
        </p>
      </div>

      <div class="product-card__btn-wrap">
        <template v-if="currentPath === '/' || currentPath === '/favorits'">
          <add-to-button
            @handleClick="handleAddDealClick"
            :btnType="`deal`"
            :isActive="isDealBtnActive"
          >
            Добавить в сделки
          </add-to-button>
        </template>
        <template v-else="currentPath === '/deals'">
          <add-to-button
            @handleClick="handlePaymentClick"
            :btnType="`pay`"
            :isActive="isPaymentBtnActive"
          >
            Оплатить
          </add-to-button>
        </template>

        <add-to-button
          @handleClick="handleFavClick"
          :btnType="`favorite`"
          :isActive="isFavBtnActive"
        >
          <img
            class="product-card__add-fav-btn-img"
            :src="
              require(`@/images/${
                isFavBtnActive ? 'favorits_light.svg' : 'favorits_dark.svg'
              }`)
            "
            alt="добавить в избранное"
          />
        </add-to-button>
      </div>
    </div>
  </li>
</template>

<script lang="ts">
import { ref, toRefs, PropType, computed, onMounted } from "vue";
import { IProduct } from "@/types/IProduct";
import { useRouter } from "vue-router";
import { useFavoritsStore } from "@/stores/favoritsStore";

export default {
  name: "ProductCard",
  props: {
    product: {
      type: Object as PropType<IProduct>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const currentPath = useRouter().currentRoute.value.path;
    const isFavBtnActive = ref(false);
    const isDealBtnActive = ref(false);
    const isPaymentBtnActive = ref(false);

    const favoritsStore = useFavoritsStore();
    onMounted(() => {
      setTimeout(() => {
        const isLiked = favoritsStore.sortFavorits.some(
          (item) => item.productId === props.product.productId
        );
        isFavBtnActive.value = isLiked;
      }, 100);
    });

    const handlePaymentClick = () => {
      emit("payment", props.product.name);
      isPaymentBtnActive.value = !isPaymentBtnActive.value;
    };

    const handleAddDealClick = () => {
      emit("addToDeals", props.product);
    };

    const handleFavClick = () => {
      isFavBtnActive.value = !isFavBtnActive.value;

      if (isFavBtnActive.value) {
        emit("addtoFavorite", props.product);
      } else emit("removeFromFavorite", props.product);
    };
    const computedPrice = computed(() => {
      return (
        props.product.unit_count * props.product.price_per_unit
      ).toLocaleString("ru-RU", {
        style: "currency",
        currency: "RUB",
        minimumFractionDigits: 0,
      });
    });

    const computedMaskPer = computed(() => {
      return props.product.price_per_unit.toLocaleString("ru-RU", {
        style: "currency",
        currency: "RUB",
        minimumFractionDigits: 0,
      });
    });

    return {
      currentPath,
      handleFavClick,
      handleAddDealClick,
      handlePaymentClick,
      isPaymentBtnActive,
      isDealBtnActive,
      isFavBtnActive,
      computedPrice,
      computedMaskPer,
    };
  },
};
</script>

<style scoped>
.product-card {
  list-style: none;
  width: 1166px;
  height: 366px;
  border: 1px solid #e0e3ee;
  border-radius: 20px;
  display: grid;
  grid-template-columns: repeat(3, auto);
  gap: 20px;
}
.product-card:not(:nth-child(1)) {
  margin-top: 40px;
}
.product-card__img {
  width: 256px;
  height: 256px;
  border-radius: 10px;
  object-fit: contain;
  margin: 20px 0 0 20px;
}

.product-card__about {
  margin-top: 20px;
}

.about__sale-type {
  font-family: "Rubik-Regular";
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  color: #969dc3;
  margin-bottom: 15px;
}
.about__title {
  font-family: "Rubik-Bold";
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  color: #2d3b87;
  margin-bottom: 20px;
}
.about__location {
  width: 198px;
  min-height: 23px;
  background: #f4f5f9;
  border-radius: 5px;
  font-family: "Rubik-Regular";
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  color: #616ca5;
  margin-bottom: 12px;
  padding: 3px;
}

.about__location-text {
  margin-left: 5px;
}

.about__sales-person-title {
  font-family: "Rubik-Regular";
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  align-items: center;
  color: #969dc3;
  margin-bottom: 12px;
  max-width: 178px;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-content: flex-start;
  flex-wrap: wrap;
}

.about__sales-person {
  font-family: "Rubik-Regular";
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  color: #2d3b87;
}

.about__product-type-title {
  width: 124px;
  min-height: 48px;
  background: #f4f5f9;
  border-radius: 10px;
  font-family: "Rubik-Regular";
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  color: #969dc3;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 8px;
}
.about__product-type {
  font-family: "Rubik-Regular";
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 100%;
  text-align: left;
  color: #616ca5;
  margin-top: 5px;
}
.about__description {
  margin-top: 12px;
  font-family: "Rubik-Regular";
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 150%;
  color: #2d3b87;
  height: 104px;
  overflow: hidden;
}
.product-card__price {
  width: 314px;
  height: 366px;
  border-left: 1px solid #e0e3ee;
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.price__amount {
  font-family: "Rubik-Bold";
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  color: #2d3b87;
  margin-bottom: 14px;
}
.price__quantity {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-family: "Rubik-Regular";
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  color: #969dc3;
  margin-bottom: 15px;
  align-items: center;
}
.price__quantity-title {
}
.price__quantity-value {
  color: #2d3b87;
}
.price__per-piece {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-family: "Rubik-Regular";
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  color: #969dc3;
}
/* .price__per-piece-title {
} */
.price__per-piece-value {
  color: #2d3b87;
}

.product-card__btn-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.product-card__add-fav-btn-img {
  margin: 18px 17px;
}
</style>