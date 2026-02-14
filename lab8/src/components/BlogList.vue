<template>
  <div class="blog-list">
    <h2>Danh sách Blog</h2>
    <ul>
      <li v-for="blog in blogs" :key="blog.id">
        <router-link :to="`/blog/${blog.id}`">{{ blog.title }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'BlogList',
  data() {
    return {
      blogs: [
        { id: 1, title: 'Bài viết về Vue Router' },
        { id: 2, title: 'Tìm hiểu về Routes động' },
        { id: 3, title: 'Xác thực trong Vue.js' }
      ]
    }
  }
}
</script>

<style scoped>
.blog-list {
  padding: 20px;
}
ul {
  list-style: none;
  padding: 0;
}
li {
  margin: 10px 0;
}
</style>
