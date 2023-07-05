<template>
    <section class="register-section">
        <p>Для продолжения необходимо зарегистрироваться</p>
        <form @submit.prevent="register">
            <AppInput placeholder="Имя" v-model="registerForm.name"></AppInput>
            <AppInput placeholder="Email" v-model="registerForm.email"></AppInput>
            <AppInput placeholder="Пароль" v-model="registerForm.password"></AppInput>
            <AppButton>Регистрация</AppButton>
        </form>
        <!-- <button @click="signWithGoogle">Sign with google</button> -->
    </section>
</template>

<script>
    export default {
        data (){
            return {
                registerForm: {},
            }
        },
        methods: {
            register (){
                this.$store.dispatch('register', this.registerForm)
            },
            signWithGoogle (){

            }
        }
    }
</script>

<style lang="scss">

</style>