
<script setup>
import { ref, computed, onMounted } from 'vue';
import { posts } from '../data/mockData';

const allPosts = ref([]);

const featuredPost = computed(() => {
  return allPosts.value.length > 0 ? allPosts.value[0] : null;
});

const otherPosts = computed(() => {
  return allPosts.value.slice(1);
});

onMounted(() => {
  allPosts.value = [...posts].sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  );
});
</script>

<template>
  <div class="container mt-4">
    <div v-if="featuredPost" class="featured-post mb-5">
      <div class="card border-0 shadow-lg">
        <div class="row g-0">
          <div class="col-md-6">
            <img 
              v-if="featuredPost.image" 
              :src="featuredPost.image" 
              class="img-fluid rounded-start h-100" 
              style="object-fit: cover;"
              alt="">
            <div v-else class="bg-secondary h-100 d-flex align-items-center justify-content-center">
              <i class="bi bi-image fs-1 text-white"></i>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card-body p-4 d-flex flex-column h-100">
              <div>
                <span class="badge bg-danger mb-2">NỔI BẬT</span>
                <h2 class="card-title mb-3">{{ featuredPost.title }}</h2>
                <p class="card-text text-muted mb-3" style="line-height: 1.6;">
                  {{ featuredPost.content.substring(0, 250) }}...
                </p>
              </div>
              <div class="mt-auto">
                <p class="text-muted small mb-3">
                  <i class="bi bi-person-circle"></i> {{ featuredPost.author }} | 
                  <i class="bi bi-calendar3"></i> {{ new Date(featuredPost.createdAt).toLocaleDateString('vi-VN') }}
                </p>
                <router-link 
                  :to="`/posts/${featuredPost.id}`" 
                  class="btn btn-primary btn-lg">
                  Xem chi tiết <i class="bi bi-arrow-right"></i>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="other-posts">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h3>Bài viết khác</h3>
      </div>

      <div v-if="otherPosts.length === 0" class="alert alert-info">
        Chưa có bài viết khác
      </div>

      <div class="row">
        <div 
          v-for="post in otherPosts" 
          :key="post.id" 
          class="col-md-4 mb-4">
          <div class="card h-100 shadow-sm hover-card">
            <img 
              v-if="post.image" 
              :src="post.image" 
              class="card-img-top" 
              style="height: 200px; object-fit: cover;"
              alt="">
            <div v-else class="bg-light" style="height: 200px; display: flex; align-items: center; justify-content: center;">
              <i class="bi bi-image fs-1 text-secondary"></i>
            </div>
            
            <div class="card-body d-flex flex-column">
              <h5 class="card-title-home">{{ post.title }}</h5>
              <p class="card-text text-muted flex-grow-1">
                {{ post.content.substring(0, 100) }}...
              </p>
              <div class="mt-auto">
                <p class="text-muted small mb-2">
                  <i class="bi bi-person"></i> {{ post.author }} | 
                  <i class="bi bi-calendar"></i> {{ new Date(post.createdAt).toLocaleDateString('vi-VN') }}
                </p>
                <router-link 
                  :to="`/posts/${post.id}`" 
                  class="btn btn-sm btn-outline-primary w-100">
                  Xem chi tiết
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.featured-post {
  animation: fadeIn 0.5s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hover-card {
  transition: all 0.3s ease;
  border: 1px solid #dee2e6;
}

.hover-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}

.card-title-home {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 2.4em;
  line-height: 1.2em;
}

.featured-post h2 {
  font-size: 1.8rem;
  font-weight: 700;
  color: #1a1a1a;
}

.card-text {
  font-size: 0.95rem;
  line-height: 1.5;
}

.badge {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.5px;
}
</style>
