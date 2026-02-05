<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-danger">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand fw-bold">ASM</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Trang chủ</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/create-post" class="nav-link">Tạo bài viết</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/profile" class="nav-link">Tài khoản</router-link>
            </li>
          </ul>
          <div class="d-flex">
            <span v-if="currentUser" class="navbar-text text-white me-3">
              Xin chào, {{ currentUser.name }}
            </span>
            <router-link v-if="!currentUser" to="/login" class="btn btn-outline-light me-2">
              Đăng nhập
            </router-link>
            <router-link v-if="!currentUser" to="/register" class="btn btn-light">
              Đăng ký
            </router-link>
            <button v-if="currentUser" @click="handleLogout" class="btn btn-outline-light">
              Đăng xuất
            </button>
          </div>
        </div>
      </div>
    </nav>

    <router-view></router-view>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const currentUser = ref(null);

const checkUser = () => {
  const user = localStorage.getItem('user');
  if (user) {
    currentUser.value = JSON.parse(user);
  }
};

const handleLogout = () => {
  localStorage.removeItem('user');
  currentUser.value = null;
  router.push('/');
};

onMounted(() => {
  checkUser();

   setInterval(() => {
    checkUser();
  }, 1000);
});
  

  window.addEventListener('storage', checkUser);

</script>

<style>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

router-view {
  flex: 1;
}

.navbar-brand {
  font-size: 1.5rem;
}

.nav-link {
  font-weight: 500;
}
</style>
