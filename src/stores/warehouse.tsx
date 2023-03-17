import { defineStore } from 'pinia';
import {
  getDatabase,
  ref,
  set,
  onValue,
  get,
  child,
  push,
  update,
} from 'firebase/database';

export const useWarehouseStore = defineStore('warehouse', {
  state: () => ({
    products: [
      {
        name: 'Пиломатериалы брус доска',
        about:
          'Пиломатериалы брус доска. Распродажа пиломатериалов в связи закрытием ЛЕСО-БАЗЫ Успейте приобрести пиломатериал со скидками до закрытия 01.06.2022. Мы стараемся быть не такими как все и даем вам: Доставка в согласованный день, если переносим - доставка бесплатно за наш счет. Весь материал соответствует гостам. Вы можете проверить пиломатериалы на складе или на адресе. Если материал не соответствует заявленному качеству - бесплатно меняем его.',
        productId: '7s7b7sb7b7s',
        sales_type: 'Аукцион',
        product_type: 'Строительные материалы',
        location: 'Санкт-Петербург, Красное Село',
        salesman: 'Торговый Дом ГОСТ',
        price_per_unit: 11000,
        unit_count: 3,
        image: 'https://lesosklad24.ru/d/1_2_20130516_1418449123.jpg',
      },
      {
        name: 'Цемент',
        about:
          'Пиломатериалы брус доска. Распродажа пиломатериалов в связи закрытием ЛЕСО-БАЗЫ Успейте приобрести пиломатериал со скидками до закрытия 01.06.2022. Мы стараемся быть не такими как все и даем вам: Доставка в согласованный день, если переносим - доставка бесплатно за наш счет. Весь материал соответствует гостам. Вы можете проверить пиломатериалы на складе или на адресе. Если материал не соответствует заявленному качеству - бесплатно меняем его.',
        productId: '6s7b89s',
        sales_type: 'Разовая продажа',
        product_type: 'Строительные материалы',
        location: 'Москва, Красное Село',
        salesman: 'Василий Склад',
        price_per_unit: 4000,
        unit_count: 3,
        image:
          'http://stroyres.net/wp-content/uploads/2014/12/ponyatie-stroitelnogo-tsementa.jpg',
      },
      {
        name: 'Песок',
        about:
          'Пиломатериалы брус доска. Распродажа пиломатериалов в связи закрытием ЛЕСО-БАЗЫ Успейте приобрести пиломатериал со скидками до закрытия 01.06.2022. Мы стараемся быть не такими как все и даем вам: Доставка в согласованный день, если переносим - доставка бесплатно за наш счет. Весь материал соответствует гостам. Вы можете проверить пиломатериалы на складе или на адресе. Если материал не соответствует заявленному качеству - бесплатно меняем его.',
        productId: '8bs7bkks8',
        sales_type: 'Разовая продажа',
        product_type: 'Строительные материалы',
        location: 'Обнинск, Красное Село',
        salesman: 'Димежан Склад',
        price_per_unit: 6000,
        unit_count: 3,
        image:
          'http://stroyres.net/wp-content/uploads/2014/11/kakih-vidov-byivayut-stroitelnyie-peski-800x500_c.jpg',
      },
    ],
    error: { message: '' },
    isLoading: false,
  }),
  getters: {
    productCount(state) {
      return state.products.length;
    },
    productsCheaperThan(state) {
      //   return (price) =>
      //     state.products.filter((product) => product.price < price);
    },
    getAllWarehouseProduts(state) {
      return (endpoint) => {
        state.isLoading = true;
        const dbRef = ref(getDatabase());
        get(child(dbRef, `${endpoint}`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              console.log(snapshot.val());
              state.products = snapshot.val();
            } else {
              console.log('No data available');
            }
          })
          .catch((error) => {
            console.error(error);
            state.error.message = error.message;
          })
          .finally(() => (state.isLoading = true));
      };
    },
  },
  actions: {
    addProduct() {
      this.products.push();
    },
  },
});
