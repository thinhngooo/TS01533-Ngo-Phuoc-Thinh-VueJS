import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

import Home from './components/Home.vue'
import PostDetail from './components/PostDetail.vue'
import CreatePost from './components/CreatePost.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Profile from './components/Profile.vue'
import EditPost from './components/EditPost.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/posts/:id', component: PostDetail },
  { path: '/create-post', component: CreatePost },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/posts/:id/edit', component: EditPost },
  { path: '/profile', component: Profile }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')
