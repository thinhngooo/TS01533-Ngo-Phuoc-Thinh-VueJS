<template>
  <div class="dashboard">
    <h2>Dashboard</h2>
    <p>Chào mừng bạn đến với trang quản trị!</p>
    <p>Đây là trang được bảo vệ, chỉ người dùng đã đăng nhập mới truy cập được.</p>
    <button @click="logout">Đăng xuất</button>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  methods: {
    logout() {
      localStorage.removeItem('isAuthenticated');
      this.$router.push({ name: 'Login' });
    }
  }
}
</script>

<style scoped>
.dashboard {
  padding: 20px;
}
button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #ff4444;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
