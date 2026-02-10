<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { users } from '../data/mockData';

const router = useRouter();
const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const errorMessage = ref('');

const handleRegister = () => {
  errorMessage.value = '';
  
  if (!name.value || !email.value || !password.value || !confirmPassword.value) {
    errorMessage.value = 'Vui lòng điền đầy đủ thông tin';
    return;
  }
  
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Mật khẩu không khớp';
    return;
  }
  
  if (password.value.length < 6) {
    errorMessage.value = 'Mật khẩu phải có ít nhất 6 ký tự';
    return;
  }
  
  const existingUser = users.find(u => u.email === email.value);
  if (existingUser) {
    errorMessage.value = 'Email đã được sử dụng';
    return;
  }
  
  const newUser = {
    id: users.length + 1,
    name: name.value,
    email: email.value,
    password: password.value
  };
  
  users.push(newUser);
  
  alert('Đăng ký thành công!');
  router.push('/login');
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
                <input v-model="name" type="text" class="form-control">
              </div>
              
              <div class="mb-3">
                <label class="form-label">Email</label>
                <input v-model="email" type="email" class="form-control">
              </div>
              
              <div class="mb-3">
                <label class="form-label">Mật khẩu</label>
                <input v-model="password" type="password" class="form-control">
              </div>
              
              <div class="mb-3">
                <label class="form-label">Xác nhận mật khẩu</label>
                <input v-model="confirmPassword" type="password" class="form-control">
              </div>
              
              <button type="submit" class="btn btn-primary w-100">Đăng ký</button>
            </form>
            
            <p class="text-center mt-3 mb-0">
              Đã có tài khoản? <router-link to="/login">Đăng nhập</router-link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>