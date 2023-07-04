<template>
    <div class="page-wrapper">
      <Title title="Регистрация" />
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

    }
  }
  </script>