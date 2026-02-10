<template>
    <div class="container-fluid p-5">
        <div class="row">
            <!-- Cột bên trái - Form Đăng Ký -->
            <div class="col-md-6">
                <div class="form-wrapper">
                    <h3 class="text-center mb-4">Form<br>Đăng Ký</h3>
                    <form @submit.prevent="register" autocomplete="off">
                        <!-- Họ tên -->
                        <div class="mb-3 row align-items-center">
                            <label class="col-4 text-end">Họ tên:</label>
                            <div class="col-5">
                                <input type="text" class="form-control form-control-sm" v-model="formData.fullName"
                                    autocomplete="off" />
                            </div>
                        </div>

                        <!-- Email -->
                        <div class="mb-3 row align-items-center">
                            <label class="col-4 text-end">Email:</label>
                            <div class="col-5">
                                <input type="email" class="form-control form-control-sm" v-model="formData.email"
                                    autocomplete="off" />
                            </div>
                        </div>

                        <!-- Mật khẩu -->
                        <div class="mb-3 row align-items-center">
                            <label class="col-4 text-end">Mật khẩu:</label>
                            <div class="col-5">
                                <input type="password" class="form-control form-control-sm" v-model="formData.password"
                                    autocomplete="new-password" />
                            </div>
                        </div>

                        <!-- Ngày sinh -->
                        <div class="mb-3 row align-items-center">
                            <label class="col-4 text-end">Ngày sinh:</label>
                            <div class="col-5">
                                <input type="date" class="form-control form-control-sm" v-model="formData.birthDate"
                                    autocomplete="off" />
                            </div>
                        </div>

                        <!-- Giới tính -->
                        <div class="mb-3 row">
                            <label class="col-4 text-end pt-1">Giới tính:</label>
                            <div class="col-8">
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" id="male" value="Nam"
                                        v-model="formData.gender" />
                                    <label class="form-check-label" for="male">Nam</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" id="female" value="Nữ"
                                        v-model="formData.gender" />
                                    <label class="form-check-label" for="female">Nữ</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" id="other" value="Khác"
                                        v-model="formData.gender" />
                                    <label class="form-check-label" for="other">Khác</label>
                                </div>
                            </div>
                        </div>

                        <!-- Ngôn ngữ -->
                        <div class="mb-4 row">
                            <label class="col-4 text-end pt-1">Ngôn ngữ:</label>
                            <div class="col-8">
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="vietnamese" value="Tiếng Việt"
                                        v-model="formData.languages" />
                                    <label class="form-check-label" for="vietnamese">Tiếng Việt</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="english" value="Tiếng Anh"
                                        v-model="formData.languages" />
                                    <label class="form-check-label" for="english">Tiếng Anh</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="checkbox" id="japanese" value="Tiếng Nhật"
                                        v-model="formData.languages" />
                                    <label class="form-check-label" for="japanese">Tiếng Nhật</label>
                                </div>
                            </div>
                        </div>

                        <!-- Nút Đăng ký -->
                        <div class="row">
                            <div class="col-8 offset-4">
                                <button type="submit" class="btn btn-primary px-4">Đăng ký</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <!-- Cột bên phải - Thông tin đã đăng ký -->
            <div class="col-md-6" v-if="isRegistered">
                <div class="info-wrapper">
                    <h3 class="mb-4">Thông tin đã đăng ký:</h3>
                    <div class="info-content">
                        <p><strong>Họ tên:</strong> {{ registeredData.fullName }}</p>
                        <p><strong>Email:</strong> {{ registeredData.email }}</p>
                        <p><strong>Ngày sinh:</strong> {{ registeredData.birthDate }}</p>
                        <p><strong>Giới tính:</strong> {{ registeredData.gender }}</p>
                        <p><strong>Ngôn ngữ:</strong> {{ registeredData.languages.join(', ') }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const formData = ref({
    fullName: '',
    email: '',
    password: '',
    birthDate: '',
    gender: '',
    languages: []
});

const isRegistered = ref(false);

const registeredData = ref({
    fullName: '',
    email: '',
    birthDate: '',
    gender: '',
    languages: []
});

const register = () => {
    // Lưu thông tin đã đăng ký (trừ mật khẩu)
    registeredData.value = {
        fullName: formData.value.fullName,
        email: formData.value.email,
        birthDate: formData.value.birthDate,
        gender: formData.value.gender,
        languages: [...formData.value.languages]
    };

    // Hiển thị thông tin đã đăng ký
    isRegistered.value = true;

    // Reset form về trạng thái ban đầu (xóa sạch dữ liệu)
    formData.value = {
        fullName: '',
        email: '',
        password: '',
        birthDate: '',
        gender: '',
        languages: []
    };
};
</script>

<style scoped>
.form-wrapper {
    max-width: 500px;
    margin: 0 auto;
}

.info-wrapper {
    max-width: 500px;
    margin: 0 auto;
}

h3 {
    color: #333;
    font-weight: 600;
    font-size: 1.5rem;
}

label {
    font-weight: 500;
    color: #333;
    font-size: 0.95rem;
}

.form-control-sm {
    font-size: 0.9rem;
}

.form-check {
    margin-bottom: 0.3rem;
}

.form-check-label {
    font-weight: normal;
    font-size: 0.95rem;
}

.info-content {
    background-color: #f8f9fa;
    padding: 25px;
    border-radius: 8px;
    border: 1px solid #dee2e6;
}

.info-content p {
    margin-bottom: 12px;
    line-height: 1.6;
}

.btn-primary {
    background-color: #0d6efd;
    border: none;
    padding: 8px 20px;
    font-weight: 500;
}

.btn-primary:hover {
    background-color: #0b5ed7;
}
</style>
