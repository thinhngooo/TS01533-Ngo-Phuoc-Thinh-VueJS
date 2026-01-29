<template>
  <div class="container py-4">
    <div class="row g-3">
      <div class="col-lg-7 ms-auto me-auto">
        <CreatePost @add-post="addPost" />
      </div>

      <div class="col-lg-12">
        <PostList :posts="posts" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CreatePost from './CreatePost.vue'
import PostList from './PostList.vue'

const posts = ref([]);

function addPost(newPost) {
  posts.value.unshift(newPost)
}
</script>