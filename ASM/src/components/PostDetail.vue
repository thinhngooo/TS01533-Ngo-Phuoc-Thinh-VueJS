<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { posts, comments, saveComments, deletePost } from '../data/mockData';

const route = useRoute();
const router = useRouter();
const post = ref(null);
const postComments = ref([]);
const newComment = ref('');
const currentUser = ref(null);

const isOwner = computed(() => {
  return currentUser.value && post.value && currentUser.value.id === post.value.userId;
});

const loadPost = () => {
  const postId = parseInt(route.params.id);
  post.value = posts.find(p => p.id === postId);
  
  if (!post.value) {
    alert('Không tìm thấy bài viết');
    router.push('/');
  }
};

const loadComments = () => {
  const postId = parseInt(route.params.id);
  postComments.value = comments.filter(c => c.postId === postId);
};

const addComment = () => {
  if (!currentUser.value) {
    alert('Vui lòng đăng nhập để bình luận!');
    router.push('/login');
    return;
  }
  
  if (!newComment.value.trim()) return;
  
  const comment = {
    id: comments.length + 1,
    postId: post.value.id,
    author: currentUser.value.name,
    content: newComment.value,
    createdAt: new Date().toISOString()
  };
  
  comments.push(comment);
  saveComments();
  newComment.value = '';
  loadComments();
};

const handleDelete = () => {
  if (!confirm('Bạn có chắc muốn xóa bài viết này?')) {
    return;
  }
  
  const success = deletePost(post.value.id);
  if (success) {
    alert('Xóa bài viết thành công!');
    router.push('/');
  } else {
    alert('Có lỗi xảy ra!');
  }
};

onMounted(() => {
  const user = localStorage.getItem('user');
  if (user) {
    currentUser.value = JSON.parse(user);
  }
  loadPost();
  loadComments();
});
</script>

<template>
  <div class="container mt-4 mb-5">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <router-link to="/" class="btn btn-secondary">
        <i class="bi bi-arrow-left"></i> Quay lại trang chủ
      </router-link>

      <div v-if="isOwner" class="d-flex gap-2">
        <router-link :to="`/posts/${post.id}/edit`" class="btn btn-warning">
          <i class="bi bi-pencil"></i> Sửa
        </router-link>
        <button @click="handleDelete" class="btn btn-danger">
          <i class="bi bi-trash"></i> Xóa
        </button>
      </div>
    </div>
    
    <div v-if="post" class="card mb-4 shadow">
      <img v-if="post.image" :src="post.image" class="card-img-top" alt="" style="max-height: 500px; object-fit: cover;">
      
      <div class="card-body">
        <h1 class="card-title mb-3">{{ post.title }}</h1>
        <p class="text-muted mb-3">
          <i class="bi bi-person-circle"></i> {{ post.author }} | 
          <i class="bi bi-calendar3"></i> {{ new Date(post.createdAt).toLocaleDateString('vi-VN') }}
        </p>
        <hr>
        <div class="card-text" style="white-space: pre-wrap; line-height: 1.8; font-size: 1.05rem;">
          {{ post.content }}
        </div>
      </div>
    </div>
    
    <div class="card shadow">
      <div class="card-body">
        <h4 class="mb-3">
          <i class="bi bi-chat-dots"></i> Bình luận ({{ postComments.length }})
        </h4>
        
        <div v-if="!currentUser" class="alert alert-warning">
          Bạn cần <router-link to="/login">đăng nhập</router-link> để bình luận
        </div>
        
        <form v-if="currentUser" @submit.prevent="addComment" class="mb-4">
          <div class="mb-3">
            <textarea 
              v-model="newComment" 
              class="form-control" 
              placeholder="Viết bình luận của bạn..." 
              rows="3"></textarea>
          </div>
          <button type="submit" class="btn btn-primary">
            <i class="bi bi-send"></i> Gửi bình luận
          </button>
        </form>
        
        <div v-if="postComments.length === 0" class="alert alert-light">
          <i class="bi bi-chat"></i> Chưa có bình luận nào. Hãy là người đầu tiên bình luận!
        </div>
        
        <div v-for="comment in postComments" :key="comment.id" class="mb-3 p-3 border rounded bg-light">
          <p class="mb-1 fw-bold">
            <i class="bi bi-person-fill text-primary"></i> {{ comment.author }}
          </p>
          <p class="mb-1">{{ comment.content }}</p>
          <small class="text-muted">
            <i class="bi bi-clock"></i> {{ new Date(comment.createdAt).toLocaleString('vi-VN') }}
          </small>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-title {
  font-size: 2rem;
  font-weight: 700;
  color: #1a1a1a;
}

.card-text {
  color: #333;
}

.btn-secondary {
  transition: all 0.3s;
}

.btn-secondary:hover {
  transform: translateX(-5px);
}
</style>
