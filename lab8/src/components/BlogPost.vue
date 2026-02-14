<template>
  <div class="blog-post">
    <h2>{{ post.title }}</h2>
    <p>{{ post.content }}</p>
    <p><strong>Tác giả:</strong> {{ post.author }}</p>
    <router-link to="/blogs">← Quay lại danh sách</router-link>
  </div>
</template>

<script>
export default {
  name: 'BlogPost',
  data() {
    return {
      post: {}
    }
  },
  created() {
    const id = this.$route.params.id;
    // Giả lập dữ liệu blog
    const blogs = {
      1: { title: 'Bài blog lab 8', content: 'Nội dung về Vue Router...', author: 'Ngô Phước Thịnh' },
      2: { title: 'Lab 8', content: 'thực hiện bởi thinhngo', author: 'thinhngo' },
      3: { title: 'test lab 8', content: 'Nội dung về xác thực...', author: 'thịnh' }
    };
    this.post = blogs[id] || { title: 'Không tìm thấy', content: 'Bài viết không tồn tại', author: '' };
  }
}
</script>

<style scoped>
.blog-post {
  padding: 20px;
}
</style>
