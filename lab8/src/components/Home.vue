<template>
  <div class="home">
    <h1>Chào mừng đến với MyBlog</h1>
    <p>Nơi chia sẻ những câu chuyện thú vị</p>
    <nav>
      <router-link to="/blogs">Danh sách Blog</router-link> |
      <router-link to="/profile">Thông tin người dùng</router-link> |
      <router-link to="/dashboard">Dashboard</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
.home {
  text-align: center;
  padding: 40px;
}
nav {
  margin-top: 20px;
}
nav a {
  margin: 0 10px;
  text-decoration: none;
  color: #42b983;
}
</style>
