<template>
  <div id="app">
    <nav class="main-nav">
      <router-link to="/">Home</router-link>
      <router-link to="/blogs">Blogs</router-link>
      <router-link to="/profile">Profile</router-link>
      <router-link to="/dashboard">Dashboard</router-link>
      <router-link to="/login">Login</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.main-nav {
  background-color: #35495e;
  padding: 20px;
  text-align: center;
}

.main-nav a {
  color: white;
  text-decoration: none;
  margin: 0 15px;
  padding: 10px 15px;
}

.main-nav a.router-link-active {
  background-color: #42b983;
  border-radius: 4px;
}
</style>
