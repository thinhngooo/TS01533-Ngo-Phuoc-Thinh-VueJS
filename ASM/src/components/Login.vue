<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { users } from '../data/mockData';

const router = useRouter();
const email = ref('');
const password = ref('');
const errorMessage = ref('');

const handleLogin = () => {
  errorMessage.value = '';
  
  if (!email.value || !password.value) {
    errorMessage.value = 'Vui lòng điền đầy đủ thông tin';
    return;
  }
  
  const user = users.find(u => u.email === email.value && u.password === password.value);
  
  if (!user) {
    errorMessage.value = 'Email hoặc mật khẩu không đúng';
    return;
  }
  
  localStorage.setItem('user', JSON.stringify(user));
  
  window.dispatchEvent(new Event('user-login'));
  
  alert('Đăng nhập thành công!');
  
  window.location.href = '/';
};
</script>

<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-5">
        <div class="card shadow">
          <div class="card-body p-4">
            <h2 class="card-title text-center mb-4">Đăng nhập</h2>
            
            <div v-if="errorMessage" class="alert alert-danger">
              {{ errorMessage }}
            </div>
            
            <form @submit.prevent="handleLogin">
              <div class="mb-3">
                <label class="form-label">Email</label>
                <input 
                  v-model="email" 
                  type="email" 
                  class="form-control"
                  placeholder="your@email.com">
              </div>
              
              <div class="mb-3">
                <label class="form-label">Mật khẩu</label>
                <input 
                  v-model="password" 
                  type="password" 
                  class="form-control"
                  placeholder="••••••">
              </div>
              
              <button type="submit" class="btn btn-primary w-100 mb-3">
                Đăng nhập
              </button>
            </form>
            
            <p class="text-center mb-0">
              Chưa có tài khoản? <router-link to="/register">Đăng ký</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
