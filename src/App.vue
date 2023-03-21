<template>
  <div class="main">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { getDatabase } from "firebase/database";
import { firebaseConfig } from "@/db/index";
import { initializeApp } from "firebase/app";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

export default {
  setup() {},
};
</script>

<style>
div,
p,
span,
h1,
h2,
h3,
input,
button,
ul,
li {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  margin: 0;
}

.main {
  display: flex;
  max-width: auto;
  flex-direction: column;
  align-items: center;
  height: 98vh;
}
</style>
