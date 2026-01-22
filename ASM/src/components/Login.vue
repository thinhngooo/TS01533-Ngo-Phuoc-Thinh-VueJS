<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const email = ref('');
const password = ref('');
const errorMessage = ref('');

const handleLogin = async () => {
  try {
    const response = await axios.get('http://localhost:3000/users', {
      params: { email: email.value, password: password.value }
    });
    
    if (response.data.length > 0) {
      localStorage.setItem('user', JSON.stringify(response.data[0]));
      router.push('/posts');
    } else {
      errorMessage.value = 'Email hoặc mật khẩu không đúng';
    }
  } catch (error) {
    errorMessage.value = 'Đăng nhập thất bại';
  }
};
</script>

<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-5">
        <div class="card">
          <div class="card-body">
            <h2 class="card-title text-center mb-4">Đăng nhập</h2>
            
            <div v-if="errorMessage" class="alert alert-danger">
              {{ errorMessage }}
            </div>
            
            <form @submit.prevent="handleLogin">
              <div class="mb-3">
                <label class="form-label">Email</label>
                <input v-model="email" type="email" class="form-control" required>
              </div>
              
              <div class="mb-3">
                <label class="form-label">Mật khẩu</label>
                <input v-model="password" type="password" class="form-control" required>
              </div>
              
              <button type="submit" class="btn btn-primary w-100">Đăng nhập</button>
            </form>
            
            <p class="text-center mt-3">
              Chưa có tài khoản? <router-link to="/register">Đăng ký</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
