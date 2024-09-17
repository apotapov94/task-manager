<template>
    <section class="login-section">
        <Message v-if="message.show" :type="message.type" :text="message.text" />
        <form @submit.prevent="login">
            <AppInput placeholder="Email" v-model="loginForm.email"></AppInput>
            <AppInput type="password" placeholder="Пароль" v-model="loginForm.password"></AppInput>
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
        computed: {
            message (){
                return this.$store.getters.getMessage
            },
        },
        methods: {
            login (){
                if(this.message.type !== 'error'){
                    this.$store.dispatch('login', this.loginForm)
                }    
            },
            signWithGoogle (){

            }
        }
    }
</script>

<style lang="scss">

</style>