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
import { getArray } from '@/assets/adapters/convertToArray';

export const useUsersStore = defineStore('usersStore', {
  state: () => ({ users: {} }),
  // could also be defined as
  // state: () => ({ count: 0 })

  getters: {
    getAllUsers(state) {
      return (endpoint) => {
        const dbRef = ref(getDatabase());
        get(child(dbRef, `${endpoint}`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              state.users = getArray(snapshot.val());
            } else {
              console.log('No data available');
            }
          })
          .catch((error) => {
            console.error(error);
          });
      };
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
