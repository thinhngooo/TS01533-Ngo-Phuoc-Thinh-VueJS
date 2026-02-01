<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const title = ref('');
const content = ref('');
const currentUser = ref(null);

const handleSubmit = async () => {
  if (!currentUser.value) {
    alert('Vui lòng đăng nhập để đăng bài!');
    router.push('/login');
    return;
  }

  if (!title.value || !content.value) {
    alert('Vui lòng điền đầy đủ thông tin');
    return;
  }

  const postData = {
    title: title.value,
    content: content.value,
    author: currentUser.value.name,
    userId: currentUser.value.id,
    createdAt: new Date().toISOString()
  };

  try {
    await axios.post('http://localhost:3000/posts', postData);
    alert('Đăng bài thành công!');
    router.push('/posts');
  } catch (error) {
    console.error('Lỗi khi lưu bài viết:', error);
    alert('Đăng bài thất bại!');
  }
};

onMounted(() => {
  const user = localStorage.getItem('user');
  if (user) {
    currentUser.value = JSON.parse(user);
  }
});
</script>

<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-body">
            <h2 class="card-title mb-4">Tạo bài viết mới</h2>

            <div v-if="!currentUser" class="alert alert-warning">
              Bạn cần <router-link to="/login">đăng nhập</router-link> để tạo bài viết
            </div>

            <form @submit.prevent="handleSubmit">
              <div class="mb-3">
                <label class="form-label">Tiêu đề</label>
                <input v-model="title" type="text" class="form-control" required>
              </div>

              <div class="mb-3">
                <label class="form-label">Nội dung</label>
                <textarea v-model="content" class="form-control" rows="10" required></textarea>
              </div>

              <div class="d-flex gap-2">
                <button type="submit" class="btn btn-primary">Đăng bài</button>
                <router-link to="/posts" class="btn btn-secondary">Hủy</router-link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
