<script setup>
import { computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const search = computed({
    get() {
        return route.query.search ?? ''
    },
    set(search){
        router.replace({ query: { search } })
    }
})
</script>

<template lang="">
        <h2>AboutView</h2>
        <label>
        Search: <input v-model.trim="search" maxlength="20" />
        </label>
</template>