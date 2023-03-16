import { defineStore } from 'pinia';

export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 1, doubleCount: 1 }),
  // could also be defined as
  // state: () => ({ count: 0 })

  getters: {
    simpleCount(state) {
      return state.count;
    },
  },

  actions: {
    increment() {
      this.count++;
    },
    doubleIncrement() {
      this.doubleCount *= 2;
    },
    decrease() {
      this.count -= 1;
    },
  },
});
