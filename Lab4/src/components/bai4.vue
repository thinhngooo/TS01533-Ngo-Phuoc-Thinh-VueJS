<template>
    <div class="container mt-5">

            <input type="number" v-model="diem" />
            <p v-if="diem >= 5">pass</p>
            <p v-else>fail</p>
            <button class="btn btn-info">kiểm tra</button>
        
        
        <h1 class="text-center">Kiến thức sức khỏe cộng đồng</h1>
        <div class="row">
            <div class="col-sm-4 d-flex">
                <div class="card ">
                    <img :src="items[0].image" alt="../assets/sesameoil_300x300.jpg" />
                    <div class="card-body">
                        <h3 class="card-title">{{ items[0].title }}</h3>
                        <p class="card-text">{{ items[0].content }}</p>
                        <button class="btn btn-info">Xem chi tiết </button>
                    </div>
                </div>
            </div>
            <div class="col-sm-4 d-flex">
                <div class="card">
                    <img :src="items[1].image" alt="../assets/corevalue.jpg" />
                    <div class="card-body">
                        <h3 class="card-title">{{ items[1].title }}</h3>
                        <p class="card-text">{{ items[1].content }}</p>
                        <button class="btn btn-info">Xem chi tiết </button>
                    </div>
                </div>
            </div>
            <div class="col-sm-4 d-flex">
                <div class="card">
                    <img :src="items[2].image" alt="../assets/orange_300x300.jpg" />
                    <div class="card-body">
                        <h3 class="card-title">{{ items[2].title }}</h3>
                        <p class="card-text">{{ items[2].content }}</p>
                        <button class="btn btn-info">Xem chi tiết </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import img1 from '../assets/sesameoil_300x300.jpg';
import img2 from '../assets/corevalue.jpg';
import img3 from '../assets/orange_300x300.jpg';
const items = ([
    {
        title: '8 loại rau củ quả giàu canxi', content: 'Canxi là khoang chất cần thiết đối với cơ thể người. Có nhiều cách để bổ sung canxi, trong đó bổ sung qua đường ăn uống là cách tốt nhất. Có 8 loại rau củ giàu canxi ...', image: img1
    },
    {
        title: 'Các loại gia vị tốt cho sức khỏe', content: 'Một số loại gia vị không chỉ giúp món ăn thêm hấp dẫn mà còn mang lại nhiều lợi ích cho sức khỏe như: gừng, nghệ, tỏi, quế...',
        image: img2
    },
    {
        title: '9 loại đậu bổ dưỡng nên dùng nhiều', content: 'Đậu lăng, đậu nành, đậu đỏ, đậu xanh, đậu đen, đậu bắp, đậu phộng, đậu ván và đậu Hà Lan là những loại đậu bổ dưỡng nên dùng nhiều trong chế độ ăn uống hàng ngày.', image:
            img3
    },
]);
</script>

<style>
    .card-text {
        text-align: justify;
    }

.card-body {
    text-align: left;
}
</style>