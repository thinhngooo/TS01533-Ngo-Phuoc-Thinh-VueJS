<script setup>
import { ref } from 'vue'

const students = ref([
    { name: 'Nguyễn Chí Hùng', score: 8, dob: '2006-01-01' },
    { name: 'Phạm Thị Lan', score: 9, dob: '2006-05-15' }
])

const student = ref({
    name: '',
    score: null,
    dob: ''
})

let isEditing = ref(false)
let editingIndex = ref(null)

function submitForm() {
    if (isEditing.value) {
        students.value[editingIndex.value] = { ...student.value }
        isEditing.value = false
        editingIndex.value = null
    } else {
        students.value.push({ ...student.value })
    }
    resetForm()
}

function editStudent(index) {
    student.value = { ...students.value[index] }
    isEditing.value = true
    editingIndex.value = index
}

function deleteStudent(index) {
    students.value.splice(index, 1)
}

function resetForm() {
    student.value = {
        name: '',
        score: null,
        dob: ''
    }
}

</script>

<template>
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-5">
                <form @submit.prevent="submitForm">
                    <h3>Thêm học sinh</h3>
                    <div class="mb-3 mt-3">
                        <label for="name">Họ tên: </label>
                        <input type="text" class="form-control" v-model="student.name" id="name" required />
                    </div>
                    <div class="mb-3">
                        <label for="score">Điểm: </label>
                        <input type="number" max="10" min="0"  v-model.number="student.score" id="score" required />
        
                    </div>

                    

                    <div class="mb-3">
                        <label for="dob">Ngày sinh:</label>
                        <input type="date" class="form-control" v-model="student.dob" id="dob" required />
                    </div>

                    <button type="submit" class="btn btn-success">
                        {{ isEditing ? 'Cập nhật' : 'Thêm' }}
                    </button>
                </form>
            </div>

            <div class="col-md-7">
                <h3>Danh sách học sinh</h3>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>Họ và tên</th>
                            <th>Điểm</th>
                            <th>Xếp loại</th>
                            <th>Ngày sinh</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(stu, index) in students" :key="index">
                            <td>{{ stu.name }}</td>
                            <td>{{ stu.score }}</td>
                            <td><div>
                               <p v-if="stu.score < 0 || stu.score > 10" style="color: red">
            Vui lòng nhập điểm từ 0 đến 10!
        </p>
        <p v-else-if="stu.score < 5.0"> Yếu</p>
        <p v-else-if="stu.score < 6.5"> Trung bình</p>
        <p v-else-if="stu.score < 8.0"> Khá</p>
        <p v-else-if="stu.score < 9.0"> Giỏi</p>
        <p v-else>Xuất sắc</p>
    </div></td>
                            <td>{{ stu.dob }}</td>
                            <td>
                                <button class="btn btn-warning" @click="editStudent(index)">Sửa</button>
                            </td>
                            <td>
                                <button class="btn btn-danger" @click="deleteStudent(index)">Xóa</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
