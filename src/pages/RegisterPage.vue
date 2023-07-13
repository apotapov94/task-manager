<template>
<Title title="Регистрация" />
<div class="page-wrapper">
    <Register />
</div>
</template>

<script>
import Title from '@/components/UI/Title.vue'
import Register from '@/components/Register.vue'

export default {
components: {
    Title, Register
},
computed: {

},
mounted (){
            this.$store.dispatch('hidePanel')
            this.$store.dispatch('closeMenu')
        },
}
</script>