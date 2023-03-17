<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <div>{{ usersStore.getAllUsers("/users") }}</div>
  <div>{{}}</div>
  <button @click="increase">увеличить щётчик</button>
  <button @click="doubleIncrease">увеличить щётчик X2</button>
  <button @click="minus">уменьшить</button>
</template>

<script setup>
import { useUsersStore } from "@/stores/usersStore.tsx";
import { useWarehouseStore } from "@/stores/warehouse";
import { firebaseConfig } from "@/db/index";
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  ref,
  set,
  onValue,
  get,
  child,
  push,
  update,
} from "firebase/database";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);
// запись данных
// function writeUserData(userId, name, email, imageUrl) {
//   const db = getDatabase();
//   set(ref(db, "users/" + userId), {
//     username: name,
//     email: email,
//     profile_picture: imageUrl,
//   });
// }
// writeUserData("214141", "John", "sdvsdv@sfvsf.com", "dskksksksksk");
// получение данных
// const dbRef = ref(getDatabase());
// const userId = 214141;
// get(child(dbRef, `users/${userId}`))
//   .then((snapshot) => {
//     if (snapshot.exists()) {
//       console.log(snapshot.val());
//     } else {
//       console.log("No data available");
//     }
//   })
//   .catch((error) => {
//     console.error(error);
//   });

const usersStore = useUsersStore();
const warehouseStore = useWarehouseStore();
// const getUsers = usersStore.getAllUsers("/users");
// const doubleIncrease = () => counterStore.doubleIncrement();
// const increase = () => counterStore.increment();
// const minus = () => counterStore.decrease();
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
