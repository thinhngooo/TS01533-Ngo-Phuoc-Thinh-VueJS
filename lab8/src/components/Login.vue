<template>
  <div class="login">
    <h2>Đăng nhập</h2>
    <form @submit.prevent="login">
      <div>
        <label>Username:</label>
        <input v-model="username" type="text" required />
      </div>
      <div>
        <label>Password:</label>
        <input v-model="password" type="password" required />
      </div>
      <button type="submit">Đăng nhập</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login() {
      localStorage.setItem('isAuthenticated', 'true');
      this.$router.push({ name: 'Dashboard' });
    }
  }
}
</script>

<style scoped>
.login {
  padding: 20px;
  max-width: 400px;
  margin: 0 auto;
}
form div {
  margin: 10px 0;
}
input {
  width: 100%;
  padding: 8px;
}
button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
