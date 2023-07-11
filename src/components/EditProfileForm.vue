<template>
    <div class="settings">
        <Message v-if="message.show" :type="message.type" :text="message.text" />
        <form @submit.prevent="saveProfile">
            <AppInput 
                v-model="name" 
                placeholder="Имя"
                :class="{ error: v$.name.$error }"
                @change="v$.name.$touch()"
                :errors="v$.name.$errors">
            </AppInput>
            <AppInput v-model="surname" placeholder="Фамилия"></AppInput>
            <AppInput v-model="position" placeholder="Должность"></AppInput>
            <AppInput v-model="phone" placeholder="Телефон"></AppInput>
            <AppTextArea v-model="bio" placeholder="О себе"></AppTextArea>
            <AppButton>Сохранить</AppButton>
        </form>
    </div>
</template>

<script>
    import { useVuelidate } from '@vuelidate/core';
    import { required, helpers } from '@vuelidate/validators';
    export default {
        setup () {
            return { v$: useVuelidate() }
        },
        validations () {
            return {
                name: { 
                    required: helpers.withMessage('Поле обязательно для заполнения', required)
                },
            }
        },
        props: {
            user: {
                type: Object,
                required: true
            }
        },
        computed: {
            message (){
                return this.$store.getters.getMessage
            },
            name: {
                get() {
                    return this.$store.getters.getEditProfileFormData.name
                },
                set(value) {
                    this.$store.dispatch('updateField', {field: 'name',value})
                }
            },
            surname: {
                get() {
                    return this.$store.getters.getEditProfileFormData.surname
                },
                set(value) {
                    this.$store.dispatch('updateField', {field: 'surname',value})
                }
            },
            position: {
                get() {
                    return this.$store.getters.getEditProfileFormData.position
                },
                set(value) {
                    this.$store.dispatch('updateField', {field: 'position',value})
                }
            },
            phone: {
                get() {
                    return this.$store.getters.getEditProfileFormData.phone
                },
                set(value) {
                    this.$store.dispatch('updateField', {field: 'phone',value})
                }
            },
            bio: {
                get() {
                    return this.$store.getters.getEditProfileFormData.bio
                },
                set(value) {
                    this.$store.dispatch('updateField', {field: 'bio',value})
                }
            },
        },
        methods: {
            saveProfile() {
                this.v$.$touch()
                if(!this.v$.$invalid){
                    console.log('test')
                    this.$store.dispatch('saveProfile', {formData: this.$store.getters.getEditProfileFormData,id: this.user.id})
                    this.v$.$reset()
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>