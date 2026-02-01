<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const post = ref(null);
const comments = ref([]);
const newComment = ref('');
const currentUser = ref(null);

const fetchPost = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/posts/${route.params.id}`);
    post.value = response.data;
  } catch (error) {
    console.error('Lỗi khi lấy bài viết:', error);
  }
};

const fetchComments = async () => {
  try {
    const response = await axios.get(`http://localhost:3000/comments?postId=${route.params.id}`);
    comments.value = response.data;
  } catch (error) {
    console.error('Lỗi khi lấy bình luận:', error);
  }
};

const addComment = async () => {
  if (!currentUser.value) {
    alert('Vui lòng đăng nhập để bình luận!');
    router.push('/login');
    return;
  }

  if (!newComment.value.trim()) return;

  try {
    await axios.post('http://localhost:3000/comments', {
      postId: route.params.id,
      author: currentUser.value.name,
      content: newComment.value,
      createdAt: new Date().toISOString()
    });
    newComment.value = '';
    fetchComments();
  } catch (error) {
    console.error('Lỗi khi thêm bình luận:', error);
  }
};

onMounted(() => {
  const user = localStorage.getItem('user');
  if (user) {
    currentUser.value = JSON.parse(user);
  }
  fetchPost();
  fetchComments();
});
</script>

<template>
  <div class="container mt-4">
    <router-link to="/posts" class="btn btn-secondary mb-3">← Quay lại</router-link>

    <div v-if="post" class="card mb-4">
      <div class="card-body">
        <h2 class="card-title">{{ post.title }}</h2>
        <p class="text-muted">Đăng bởi: {{ post.author }} - {{ new Date(post.createdAt).toLocaleDateString() }}</p>
        <hr>
        <p class="card-text" style="white-space: pre-wrap;">{{ post.content }}</p>
      </div>
    </div>

    <div class="card">
      <div class="card-body">
        <h4 class="mb-3">Bình luận ({{ comments.length }})</h4>

        <div v-if="!currentUser" class="alert alert-warning">
          Bạn cần <router-link to="/login">đăng nhập</router-link> để bình luận
        </div>

        <form v-if="currentUser" @submit.prevent="addComment" class="mb-4">
          <div class="mb-3">
            <textarea v-model="newComment" class="form-control" placeholder="Viết bình luận..." rows="3"></textarea>
          </div>
          <button type="submit" class="btn btn-primary">Gửi bình luận</button>
        </form>

        <div v-if="comments.length === 0" class="alert alert-light">
          Chưa có bình luận nào
        </div>

        <div v-for="comment in comments" :key="comment.id" class="mb-3 border-bottom pb-3">
          <p class="mb-1"><strong>{{ comment.author }}</strong></p>
          <p class="mb-1">{{ comment.content }}</p>
          <small class="text-muted">{{ new Date(comment.createdAt).toLocaleString() }}</small>
        </div>
      </div>
    </div>
  </div>
</template>
