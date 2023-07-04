<template>
    <div class="page-wrapper">
      <Title title="Авторизация" />
      <Login />
    </div>
  </template>
  
  <script>
  import Title from '@/components/UI/Title.vue'
  import Login from '@/components/Login.vue'
  
  export default {
    components: {
      Title, Login
    },
    computed: {

    }
  }
  </script>
  