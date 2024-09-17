<template>
    <section class="register-section">
        <p>Для продолжения необходимо зарегистрироваться</p>
        <Message v-if="message.show" :type="message.type" :text="message.text" />
        <form @submit.prevent="register">
            <AppInput 
                placeholder="Имя" 
                v-model="name"
                :class="{ error: v$.name.$error }"
                @change="v$.name.$touch()"
                :errors="v$.name.$errors"></AppInput>
            <AppInput 
                placeholder="Email" 
                v-model="email"
                :class="{ error: v$.email.$error }"
                @change="v$.email.$touch()"
                :errors="v$.email.$errors">
            </AppInput>
            <AppInput 
                placeholder="Пароль" 
                v-model="password"
                :class="{ error: v$.password.$error }"
                @change="v$.password.$touch()"
                :errors="v$.password.$errors">
            </AppInput>
            <AppButton>Регистрация</AppButton>
        </form>
        <!-- <button @click="signWithGoogle">Sign with google</button> -->
    </section>
</template>

<script>
    import { useVuelidate } from '@vuelidate/core';
    import { required, helpers, email } from '@vuelidate/validators';
    export default {
        data (){
            return {
                name: '',
                email: '',
                password: ''
            }
        },
        setup () {
            return { v$: useVuelidate() }
        },
        validations () {
            return {
                name: { 
                    required: helpers.withMessage('Поле обязательно для заполнения', required)
                },
                email: { 
                    required: helpers.withMessage('Поле обязательно для заполнения', required),
                    email: helpers.withMessage('Введите корректный адрес электронной почты', email)
                },
                password: { 
                    required: helpers.withMessage('Поле обязательно для заполнения', required)
                },
            }
        },
        computed: {
            message (){
                return this.$store.getters.getMessage
            },
        },
        methods: {
            register (){
                this.v$.$touch()
                if(!this.v$.$invalid){
                    this.$store.dispatch('register', {name: this.name, email: this.email, password: this.password})
                    if(this.message.type !== 'error'){
                        this.name = ''
                        this.email = ''
                        this.password = ''
                        this.v$.$reset()
                        this.$store.dispatch('hideMessage')
                    } 
                    
                }    
            },
            signWithGoogle (){

            }
        }
    }
</script>

<style lang="scss">

</style>