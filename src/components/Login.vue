<template>
    <section class="login-section">
        <form @submit.prevent="login">
            <AppInput placeholder="Email" v-model="loginForm.email"></AppInput>
            <AppInput placeholder="Пароль" v-model="loginForm.password"></AppInput>
            <AppButton>Вход</AppButton>
        </form>
        <!-- <button @click="signWithGoogle">Sign with google</button> -->
    </section>
</template>

<script>
    export default {
        data (){
            return {
                loginForm: {}
            }
        },
        methods: {
            login (){
                this.$store.dispatch('login', this.loginForm)
            },
            signWithGoogle (){

            }
        }
    }
</script>

<style lang="scss">

</style>