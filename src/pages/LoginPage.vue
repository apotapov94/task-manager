<template>
    <Title title="Авторизация" />
    <div class="page-wrapper">
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
    mounted (){
      this.$store.dispatch('hideMessage')
    },
  }
  </script>
  