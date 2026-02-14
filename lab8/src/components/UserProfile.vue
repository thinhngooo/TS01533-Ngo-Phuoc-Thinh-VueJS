<template>
  <div class="user-profile">
    <h2>Thông tin người dùng</h2>
    <nav>
      <router-link to="/profile/info">Thông tin cơ bản</router-link> |
      <router-link to="/profile/settings">Cài đặt</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'UserProfile'
}
</script>

<style scoped>
.user-profile {
  padding: 20px;
}
nav {
  margin: 20px 0;
}
nav a {
  margin: 0 10px;
  text-decoration: none;
  color: #42b983;
}
</style>
