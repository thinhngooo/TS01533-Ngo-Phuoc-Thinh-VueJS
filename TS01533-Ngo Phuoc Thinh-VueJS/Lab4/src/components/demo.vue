<script>
const yob = ref(0);
let age = ref(0)
const calcu = () => (age = 2026 - yob.value);
</script>

<template>
    <div class = "container">
        <div class="mt-5">
            <input type="number" v-model="yob" min="1800" max="2026">

            <div class="">{{ calcu() }}</div>

            <p v-if = "age >= 15 && age < 18">Thiếu niên</p>
            <p v-else-if = "age >=18">Trẻ tuổi</p>
            <p v-else>Chưa thành niên</p>
        </div>
    </div>
</template>
