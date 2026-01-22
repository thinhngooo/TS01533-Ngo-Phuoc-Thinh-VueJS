<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const posts = ref([]);
const currentUser = ref(null);

const fetchPosts = async () => {
  try {
    const response = await axios.get('http://localhost:3000/posts');
    posts.value = response.data;
  } catch (error) {
    console.error('Lỗi khi lấy bài viết:', error);
  }
};

const deletePost = async (id) => {
  if (confirm('Bạn có chắc muốn xóa bài viết này?')) {
    try {
      await axios.delete(`http://localhost:3000/posts/${id}`);
      fetchPosts();
    } catch (error) {
      console.error('Lỗi khi xóa:', error);
    }
  }
};

onMounted(() => {
  const user = localStorage.getItem('user');
  if (user) {
    currentUser.value = JSON.parse(user);
  }
  fetchPosts();
});
</script>

<template>
  <div class="container mt-4">
    <h2 class="mb-4">Danh sách bài viết</h2>
    
    <div v-if="posts.length === 0" class="alert alert-info">
      Chưa có bài viết nào
    </div>
    
    <div class="row">
      <div v-for="post in posts" :key="post.id" class="col-md-6 mb-4">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">{{ post.title }}</h5>
            <p class="card-text">{{ post.content.substring(0, 150) }}...</p>
            <p class="text-muted small">Đăng bởi: {{ post.author }}</p>
          </div>
          <div class="card-footer">
            <router-link :to="`/posts/${post.id}`" class="btn btn-sm btn-info me-2">
              Xem chi tiết
            </router-link>
            <button v-if="currentUser && currentUser.id === post.userId" 
                    @click="deletePost(post.id)" 
                    class="btn btn-sm btn-danger">
              Xóa
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
