<script setup>
import bai1 from './components/bai1.vue';
import bai2 from './components/bai2.vue';
import bai3 from './components/bai3.vue';
import demo from './components/demo.vue';
</script>

<template>
  <main>
    <demo />
  </main>
</template>


<!-- <template>
  <div id="app">
    <div class="container">
      <CreatePost @add-post="addPost" />
      <PostList :posts="posts" />
    </div>

  </div>
</template>

<script setup>

import { ref } from "vue";
import PostList from './components/PostList.vue';
import CreatePost from './components/CreatePost.vue';

const posts = ref([]);

function addPost(post) {
  posts.value.push(post);
}
</script>

<style>
#app {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
</style> -->