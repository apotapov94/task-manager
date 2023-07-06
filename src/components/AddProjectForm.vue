<template>
    <div class="add-task-form">
      <form @submit.prevent="addProject">
        <AppInput 
          placeholder="Название" 
          v-model="title"
          :class="{ error: v$.title.$error }"
          @change="v$.title.$touch()"
          :errors="v$.title.$errors">
        </AppInput>
        <AppTextArea placeholder="Описание" v-model="descr"></AppTextArea>
        <AppButton>Добавить проект</AppButton>
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
        title: { 
          required: helpers.withMessage('Поле обязательно для заполнения', required)
        },
      }
    },
    computed: {
      title: {
        get() {
          return this.$store.getters.getProjectTitle
        },
        set(value) {
          this.$store.dispatch('updateTitle', value)
        }
      },
      descr: {
        get() {
          return this.$store.getters.getProjectDescr
        },
        set(value) {
          this.$store.dispatch('updateDescr', value)
        }
      },
      users (){
        return this.$store.getters.getUsers
      },
    },
    methods: {
      addProject() {
        this.v$.$touch()
        if(!this.v$.$invalid){
          this.$store.dispatch('addProject')
          this.v$.$reset()
          this.$store.dispatch('addProjectFormReset')
        }
        
      }
    }
  }
  </script>
  