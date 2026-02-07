<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { users, posts } from '../data/mockData';

const router = useRouter();
const currentUser = ref(null);

// Thông tin cá nhân
const name = ref('');
const email = ref('');
const updateMessage = ref('');

// Bài viết của user
const userPosts = computed(() => {
  if (!currentUser.value) return [];
  return posts.filter(p => p.userId === currentUser.value.id);
});

const loadUserData = () => {
  const user = localStorage.getItem('user');
  if (!user) {
    router.push('/login');
    return;
  }
  
  currentUser.value = JSON.parse(user);
  name.value = currentUser.value.name;
  email.value = currentUser.value.email;
};

const updateProfile = () => {
  updateMessage.value = '';
  
  if (!name.value || !email.value) {
    updateMessage.value = 'Vui lòng điền đầy đủ thông tin';
    return;
  }
  
  // Tìm user trong mảng và cập nhật
  const userIndex = users.findIndex(u => u.id === currentUser.value.id);
  if (userIndex !== -1) {
    users[userIndex].name = name.value;
    users[userIndex].email = email.value;
    
    // Cập nhật localStorage
    const updatedUser = {
      ...currentUser.value,
      name: name.value,
      email: email.value
    };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    currentUser.value = updatedUser;
    
    // Trigger event để cập nhật navbar
    window.dispatchEvent(new Event('user-login'));
    
    updateMessage.value = 'Cập nhật thông tin thành công!';
  } else {
    updateMessage.value = 'Không tìm thấy user!';
  }
};

onMounted(() => {
  loadUserData();
});
</script>

<template>
  <div class="container mt-4">
    <h2 class="mb-4">Quản lý tài khoản</h2>
    
    <div class="row">
      <!-- Thông tin cá nhân -->
      <div class="col-md-12 mb-4">
        <div class="card">
          <div class="card-header bg-primary text-white">
            <h5 class="mb-0">Thông tin cá nhân</h5>
          </div>
          <div class="card-body">
            <div v-if="updateMessage" class="alert" :class="updateMessage.includes('thành công') ? 'alert-success' : 'alert-danger'">
              {{ updateMessage }}
            </div>
            
            <form @submit.prevent="updateProfile">
              <div class="mb-3">
                <label class="form-label">Họ tên</label>
                <input v-model="name" type="text" class="form-control" required>
              </div>
              
              <div class="mb-3">
                <label class="form-label">Email</label>
                <input v-model="email" type="email" class="form-control" required>
              </div>
              
              <button type="submit" class="btn btn-primary">Cập nhật thông tin</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Bài viết của tôi -->
    <div class="card">
      <div class="card-header bg-info text-white">
        <h5 class="mb-0">Bài viết của tôi ({{ userPosts.length }})</h5>
      </div>
      <div class="card-body">
        <div v-if="userPosts.length === 0" class="alert alert-light">
          Bạn chưa có bài viết nào
        </div>
        
        <div v-else class="list-group">
          <router-link 
            v-for="post in userPosts" 
            :key="post.id" 
            :to="`/posts/${post.id}`" 
            class="list-group-item list-group-item-action">
            <div class="d-flex w-100 justify-content-between">
              <h6 class="mb-1">{{ post.title }}</h6>
              <small class="text-muted">{{ new Date(post.createdAt).toLocaleDateString('vi-VN') }}</small>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
