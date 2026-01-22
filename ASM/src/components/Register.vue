<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Mật khẩu không khớp';
    return;
  }
  
  try {
    await axios.post('http://localhost:3000/users', {
      name: name.value,
      email: email.value,
      password: password.value
    });
    alert('Đăng ký thành công!');
    router.push('/login');
  } catch (error) {
    errorMessage.value = 'Đăng ký thất bại';
  }
};
</script>

<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h2 class="card-title text-center mb-4">Đăng ký tài khoản</h2>
            
            <div v-if="errorMessage" class="alert alert-danger">
              {{ errorMessage }}
            </div>
            
            <form @submit.prevent="handleRegister">
              <div class="mb-3">
                <label class="form-label">Họ tên</label>
                <input v-model="name" type="text" class="form-control" required>
              </div>
              
              <div class="mb-3">
                <label class="form-label">Email</label>
                <input v-model="email" type="email" class="form-control" required>
              </div>
              
              <div class="mb-3">
                <label class="form-label">Mật khẩu</label>
                <input v-model="password" type="password" class="form-control" required>
              </div>
              
              <div class="mb-3">
                <label class="form-label">Xác nhận mật khẩu</label>
                <input v-model="confirmPassword" type="password" class="form-control" required>
              </div>
              
              <button type="submit" class="btn btn-primary w-100">Đăng ký</button>
            </form>
            
            <p class="text-center mt-3">
              Đã có tài khoản? <router-link to="/login">Đăng nhập</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>