<template>
    <div class="container mt-5">

        <h1 class="text-center">Kiến thức sức khỏe cộng đồng</h1>
        <div class="row">
            <div class="col-sm-4 d-flex " v-for="(item, index) in items" :key="index">

                <div class="card h-100 w-100">
                    <img :src="item.image" alt="Hình ảnh" />
                    <div class="card-body d-flex flex-column">
                        <h3 class="card-title">{{ item.title }}</h3>
                        <p v-show="item.expanded" class="card-text">
                            {{ item.content }}
                        </p>
                        <button class="btn btn-info mt-auto" @click="toggle(index)">
                            {{ item.expanded ? 'Ẩn chi tiết' : 'Xem chi tiết' }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import { ref } from 'vue';
import img1 from '../assets/images/corevalue.jpg';
import img2 from '../assets/images/orange_300x300.jpg';
import img3 from '../assets/images/sesameoil_300x300.jpg';

const items = ref([
    {
        title: '8 loại rau củ quả giàu canxi',
        content: 'Canxi là khoáng chất cần thiết đối với cơ thể người. Có nhiều cách để bổ sung canxi, trong đó bổ sung qua đường ăn uống là cách tốt nhất. Có 8 loại rau củ giàu canxi...',
        image: img1,
        expanded: false

    },
    {
        title: 'Các loại gia vị tốt cho sức khỏe',
        content: 'Một số loại gia vị cung cấp nhiều polyphenol chống oxy hóa cao hơn các loại gia vị quen thuộc khác. Với một lượng nhỏ các món ăn đã thêm hương vị hấp dẫn...',
        image: img2,
        expanded: false

    },
    {
        title: '9 loại đậu bổ dưỡng nên dùng nhiều',
        content: 'Đậu lăng, đậu nành, đậu phộng, đậu Hà Lan giàu chất xơ, protein cùng nhiều vitamin và khoáng chất giúp giảm lượng đường trong máu, tốt cho tim...',
        image: img3,
        expanded: false

    },
]);
function toggle(index) {
    items.value[index].expanded = !items.value[index].expanded
}
</script>
<style>
.card-text {
    text-align: justify;
}

.card-body {
    text-align: left;
}
</style>