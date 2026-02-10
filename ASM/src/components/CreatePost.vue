<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { posts, savePosts } from '../data/mockData';

const router = useRouter();
const title = ref('');
const content = ref('');
const image = ref('');
const currentUser = ref(null);

const handleSubmit = () => {
  if (!currentUser.value) {
    alert('Vui lòng đăng nhập để đăng bài!');
    router.push('/login');
    return;
  }
  
  if (!title.value || !content.value) {
    alert('Vui lòng điền đầy đủ thông tin');
    return;
  }
  
  const newPost = {
    id: posts.length + 1,
    title: title.value,
    content: content.value,
    image: image.value || '',
    author: currentUser.value.name,
    userId: currentUser.value.id,
    createdAt: new Date().toISOString()
  };
  
  posts.push(newPost);
  savePosts();
  
  alert('Đăng bài thành công!');
  router.push('/');
};

onMounted(() => {
  const user = localStorage.getItem('user');
  if (user) {
    currentUser.value = JSON.parse(user);
  } else {
    router.push('/login');
  }
});
</script>

<template>
  <div class="container mt-4 mb-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card shadow">
          <div class="card-body">
            <h2 class="card-title mb-4">
              <i class="bi bi-pencil-square"></i> Tạo bài viết mới
            </h2>
            
            <form @submit.prevent="handleSubmit">
              <div class="mb-3">
                <label class="form-label fw-bold">
                  Tiêu đề bài viết <span class="text-danger">*</span>
                </label>
                <input 
                  v-model="title" 
                  type="text" 
                  class="form-control" 
                  placeholder="Nhập tiêu đề hấp dẫn..."
                  required>
              </div>
              
              <div class="mb-3">
                <label class="form-label fw-bold">URL ảnh đại diện</label>
                <input 
                  v-model="image" 
                  type="url" 
                  class="form-control" 
                  placeholder="https://example.com/image.jpg">
              </div>
              
              <div v-if="image" class="mb-3">
                <label class="form-label fw-bold">Xem trước ảnh:</label>
                <div class="border rounded p-2 bg-light">
                  <img 
                    :src="image" 
                    class="img-fluid rounded" 
                    style="max-height: 300px; object-fit: cover; width: 100%;" 
                    alt="Preview">
                </div>
              </div>
              
              <div class="mb-3">
                <label class="form-label fw-bold">
                  Nội dung <span class="text-danger">*</span>
                </label>
                <textarea 
                  v-model="content" 
                  class="form-control" 
                  rows="12" 
                  placeholder="Viết nội dung bài viết của bạn..."
                  required></textarea>
                <small class="text-muted">{{ content.length }} ký tự</small>
              </div>
              
              <div class="d-flex gap-2">
                <button type="submit" class="btn btn-primary">
                  <i class="bi bi-check-circle"></i> Đăng bài
                </button>
                <router-link to="/" class="btn btn-secondary">
                  <i class="bi bi-x-circle"></i> Hủy
                </router-link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  border: none;
}

.card-title {
  color: #333;
  border-bottom: 2px solid #dc3545;
  padding-bottom: 10px;
}
</style>