<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { posts, updatePost } from '../data/mockData';

const route = useRoute();
const router = useRouter();
const title = ref('');
const content = ref('');
const image = ref('');
const currentUser = ref(null);
const post = ref(null);

const loadPost = () => {
  const postId = parseInt(route.params.id);
  post.value = posts.find(p => p.id === postId);
  
  if (!post.value) {
    alert('Không tìm thấy bài viết');
    router.push('/');
    return;
  }
  
  if (!currentUser.value || post.value.userId !== currentUser.value.id) {
    alert('Bạn không có quyền sửa bài viết này!');
    router.push('/');
    return;
  }
  
  title.value = post.value.title;
  content.value = post.value.content;
  image.value = post.value.image || '';
};

const handleSubmit = () => {
  if (!title.value || !content.value) {
    alert('Vui lòng điền đầy đủ thông tin');
    return;
  }
  
  const success = updatePost(post.value.id, {
    title: title.value,
    content: content.value,
    image: image.value
  });
  
  if (success) {
    alert('Cập nhật bài viết thành công!');
    router.push(`/posts/${post.value.id}`);
  } else {
    alert('Có lỗi xảy ra!');
  }
};

onMounted(() => {
  const user = localStorage.getItem('user');
  if (user) {
    currentUser.value = JSON.parse(user);
    loadPost();
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
              <i class="bi bi-pencil"></i> Sửa bài viết
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
                <button type="submit" class="btn btn-success">
                  <i class="bi bi-check-circle"></i> Lưu thay đổi
                </button>
                <router-link :to="`/posts/${post?.id}`" class="btn btn-secondary">
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
  border-bottom: 2px solid #28a745;
  padding-bottom: 10px;
}
</style>