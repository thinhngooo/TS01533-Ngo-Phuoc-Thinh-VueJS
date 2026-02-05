<!-- <script setup>
import bai1 from './components/bai1.vue';
import bai2 from './components/bai2.vue';
</script>

<template>
  <bai1 />
</template> -->

<script setup>
import Home from './views/Home.vue';
import About from './views/About.vue';
import { RouterView } from 'vue-router';
</script>

<template>
  <h3>Đây là trang chủ</h3>
  <nav>

    <RouterLink to="/">Go to home</RouterLink>
    <br>
    <RouterLink to="/about">Go to about</RouterLink>
  </nav>
  <main>
    <RouterView />
  </main>

</template>

<style scoped></style>