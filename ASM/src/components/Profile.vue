<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { users, posts, saveUsers } from '../data/mockData';

const router = useRouter();
const currentUser = ref(null);

const name = ref('');
const email = ref('');
const avatar = ref('');
const updateMessage = ref('');
const avatarMessage = ref('');
const avatarPreview = ref('');

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
  avatar.value = currentUser.value.avatar || '';
  avatarPreview.value = currentUser.value.avatar || '';
};


const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (!file) return;
  
  if (!file.type.startsWith('image/')) {
    alert('Vui lòng chọn file ảnh!');
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    alert('Kích thước ảnh không được vượt quá 5MB!');
    return;
  }
  
  const reader = new FileReader();
  reader.onload = (e) => {
    avatar.value = e.target.result;
    avatarPreview.value = e.target.result;
  };
  reader.readAsDataURL(file);
};

const updateAvatar = () => {
  avatarMessage.value = '';
  
  const userIndex = users.findIndex(u => u.id === currentUser.value.id);
  if (userIndex !== -1) {
    users[userIndex].avatar = avatar.value;
    
    saveUsers();
    
    const updatedUser = {
      ...currentUser.value,
      avatar: avatar.value
    };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    currentUser.value = updatedUser;
    
    window.dispatchEvent(new Event('user-login'));
    
    avatarMessage.value = 'Cập nhật ảnh đại diện thành công!';
  } else {
    avatarMessage.value = 'Không tìm thấy user!';
  }
};

const updateProfile = () => {
  updateMessage.value = '';
  
  if (!name.value || !email.value) {
    updateMessage.value = 'Vui lòng điền đầy đủ thông tin';
    return;
  }
  
  const userIndex = users.findIndex(u => u.id === currentUser.value.id);
  if (userIndex !== -1) {
    users[userIndex].name = name.value;
    users[userIndex].email = email.value;
    
    saveUsers();
        const updatedUser = {
      ...currentUser.value,
      name: name.value,
      email: email.value
    };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    currentUser.value = updatedUser;
    
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
  <div class="container mt-4 mb-5">
    <h2 class="mb-4">
      <i class="bi bi-person-circle"></i> Quản lý tài khoản
    </h2>
    
    <div class="row">
      <div class="col-md-6">
        <div class="card shadow mb-4">
          <div class="card-header bg-primary text-white">
            <h5 class="mb-0">Thông tin cá nhân</h5>
          </div>
          <div class="card-body">
            <div v-if="updateMessage" class="alert" :class="updateMessage.includes('thành công') ? 'alert-success' : 'alert-danger'">
              {{ updateMessage }}
            </div>
            
            <form @submit.prevent="updateProfile">
              <div class="mb-3">
                <label class="form-label fw-bold">Họ tên</label>
                <input v-model="name" type="text" class="form-control" required>
              </div>
              
              <div class="mb-3">
                <label class="form-label fw-bold">Email</label>
                <input v-model="email" type="email" class="form-control" required>
              </div>
              
              <button type="submit" class="btn btn-primary">
                Cập nhật thông tin
              </button>
            </form>
          </div>
        </div>
      </div>
      
      <div class="col-md-6">
        <div class="card shadow mb-4">
          <div class="card-header bg-success text-white">
            <h5 class="mb-0">Ảnh đại diện</h5>
          </div>
          <div class="card-body">
            <div v-if="avatarMessage" class="alert" :class="avatarMessage.includes('thành công') ? 'alert-success' : 'alert-danger'">
              {{ avatarMessage }}
            </div>
          
            <div class="text-center mb-3">
              <img 
                :src="avatarPreview || 'https://via.placeholder.com/200?text=No+Avatar'" 
                class="rounded-circle border border-3 border-success" 
                style="width: 200px; height: 200px; object-fit: cover;"
                alt="Avatar preview">
            </div>
            
            <div class="mb-3">
              <input 
                id="avatarInput"
                type="file" 
                class="form-control" 
                accept="image/*"
                @change="handleFileChange">
            </div>
            
            <button @click="updateAvatar" type="button" class="btn btn-success w-100">
              Cập nhật ảnh đại diện
            </button>
          </div>
        </div>
      </div>
    </div>
    
    <div class="card shadow">
      <div class="card-header bg-info text-white d-flex justify-content-between align-items-center">
        <h5 class="mb-0">
          <i class="bi bi-newspaper"></i> Bài viết của tôi ({{ userPosts.length }})
        </h5>
        <button @click="$router.push('/')" class="btn btn-sm btn-light">
          <i class="bi bi-chevron-down"></i>
        </button>
      </div>
      <div class="card-body">
        <div v-if="userPosts.length === 0" class="alert alert-light">
          <i class="bi bi-inbox"></i> Bạn chưa có bài viết nào
        </div>
        
        <div v-else class="list-group">
          <router-link 
            v-for="post in userPosts" 
            :key="post.id" 
            :to="`/posts/${post.id}`" 
            class="list-group-item list-group-item-action hover-item">
            <div class="d-flex w-100 justify-content-between align-items-center">
              <div class="d-flex align-items-center gap-3">
                <img 
                  v-if="post.image" 
                  :src="post.image" 
                  class="rounded" 
                  style="width: 60px; height: 60px; object-fit: cover;"
                  alt="">
                <div v-else class="bg-secondary rounded d-flex align-items-center justify-content-center" style="width: 60px; height: 60px;">
                  <i class="bi bi-image text-white"></i>
                </div>
                <div>
                  <h6 class="mb-1">{{ post.title }}</h6>
                  <small class="text-muted">{{ post.content.substring(0, 50) }}...</small>
                </div>
              </div>
              <small class="text-muted">
                <i class="bi bi-calendar"></i> 
                {{ new Date(post.createdAt).toLocaleDateString('vi-VN') }}
              </small>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hover-item {
  transition: all 0.3s ease;
}

.hover-item:hover {
  transform: translateX(5px);
  background-color: #f8f9fa;
}

img {
  transition: transform 0.2s;
}

.rounded-circle:hover {
  transform: scale(1.05);
}

input[type="file"] {
  cursor: pointer;
}
</style>