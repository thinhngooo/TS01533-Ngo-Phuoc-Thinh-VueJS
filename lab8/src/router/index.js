import { createRouter, createWebHistory } from 'vue-router'
import Home from '../components/Home.vue'
import BlogList from '../components/BlogList.vue'
import BlogPost from '../components/BlogPost.vue'
import UserProfile from '../components/UserProfile.vue'
import ProfileInfo from '../components/ProfileInfo.vue'
import ProfileSettings from '../components/ProfileSettings.vue'
import Login from '../components/Login.vue'
import Dashboard from '../components/dashboard.vue'

const isAuthenticated = () => {
  return localStorage.getItem('isAuthenticated') === 'true'
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/blogs',
    name: 'BlogList',
    component: BlogList
  },

  {
    path: '/blog/:id',
    name: 'BlogPost',
    component: BlogPost
  },

  {
    path: '/profile',
    name: 'UserProfile',
    component: UserProfile,
    alias: '/me',
    children: [
      {
        path: 'info',
        name: 'ProfileInfo',
        component: ProfileInfo
      },
      {
        path: 'settings',
        name: 'ProfileSettings',
        component: ProfileSettings
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },

  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      if (isAuthenticated()) {
        next()
      } else {
        next({ name: 'Login' }) 
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
