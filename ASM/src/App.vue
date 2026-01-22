<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const currentUser = ref(null);

const checkUser = () => {
  const user = localStorage.getItem('user');
  currentUser.value = user ? JSON.parse(user) : null;
};

const logout = () => {
  localStorage.removeItem('user');
  currentUser.value = null;
  router.push('/posts');
};

onMounted(() => {
  checkUser();
});

watch(() => route.path, () => {
  checkUser();
});
</script>

<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-danger">
      <div class="container-fluid">
        <router-link to="/posts" class="navbar-brand">ASM</router-link>
        
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <router-link to="/posts" class="nav-link">Trang chủ</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/posts/create" class="nav-link">Tạo bài viết</router-link>
            </li>
            <!-- Thêm menu Tài khoản -->
            <li class="nav-item">
              <router-link to="/profile" class="nav-link">Tài khoản</router-link>
            </li>
          </ul>
          
          <ul class="navbar-nav">
            <li class="nav-item" v-if="!currentUser">
              <router-link to="/login" class="nav-link">Đăng nhập</router-link>
            </li>
            <li class="nav-item" v-if="!currentUser">
              <router-link to="/register" class="nav-link">Đăng ký</router-link>
            </li>
            <li class="nav-item" v-if="currentUser">
              <span class="navbar-text me-3">Xin chào, {{ currentUser.name }}</span>
            </li>
            <li class="nav-item" v-if="currentUser">
              <button @click="logout" class="btn btn-outline-light btn-sm">Đăng xuất</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    
    <router-view />
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
  background-color: #f8f9fa;
}

.navbar-nav .nav-link.router-link-active {
  color: #0e0000 !important;
  font-weight: bold;
}
</style>
