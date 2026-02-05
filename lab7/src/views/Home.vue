
<script>
export default {
    methods: {
        gotoAbout() {
            this.$router.push('/about');
        },       
    },
}
</script>

<template lang="">  
    <h2>HomeView</h2> 
    <button @click="gotoAbout">Go to About</button>
</template>