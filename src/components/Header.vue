<template>
  <header class="header">
    <div class="header__content">
      <div class="header__top">
        <div class="header__logo">Task<span>Manager</span></div>
        <div class="header__menu-icon" @click="showMenuToggle">
          <span></span><span></span><span></span>
        </div>
      </div>
      <div class="header__bottom" :class="{active: showMenu}">
        <div class="header__profile" v-if="authUser && !loading">
          <div class="header__profile-left">
            <router-link to="/profile">
              <img v-if="authUser.avatar" :src="authUser.avatar" alt="">
              <img v-else src="@/assets/img/user-profile.png" alt="">
            </router-link>
          </div>
          <div class="header__profile-right">
            <div class="header__profile-name"><router-link to="/profile">{{ authUser.name }}</router-link></div>
            <div class="header__profile-email">{{ authUser.email }}</div>
          </div>
        </div>
        <div class="header__profile onload" v-if="loading">
          <div class="header__profile-left">
          </div>
          <div class="header__profile-right">
            <div class="header__profile-name"></div>
            <div class="header__profile-email"></div>
          </div>
        </div>
        <nav class="header__menu" v-if="!loading">
          <ul>
            <li>
              <router-link to="/">Все задачи <span class="count">{{ this.$store.getters.getAllTasksCount }}</span></router-link>
            </li>
            <li v-if="user">
              <router-link to="/my-tasks">Мои задачи <span class="count">{{ this.$store.getters.getMyTasksCount }}</span></router-link>
            </li>
            <li v-if="user">
              <router-link to="/canban">Доска задач</router-link>
            </li>
            <li v-if="user">
              <router-link to="/projects">Проекты</router-link>
            </li>
            <li v-if="!user">
              <router-link to="/register">Регистрация</router-link>
            </li>
            <li v-if="!user">
              <router-link to="/login">Вход</router-link>
            </li>
            <li @click="logout" class="logout-link" v-if="user">Выход</li>
          </ul>
        </nav>
        <nav class="header__menu-onload" v-if="loading">
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  computed: {
    user (){
      return this.$store.getters.getUser
    },
    authUser (){
      return this.$store.getters.getAuthUser
    },
    showMenu (){
      return this.$store.getters.getShowMenu
    },
    loading (){
      return this.$store.getters.getLoading
    },
    avatar (){
      return this.$store.getters.getAuthUserAvatar
    }
  },
  methods: {
    logout (){
      this.$store.dispatch('logout')
    },
    showMenuToggle (){
      console.log('click')
      this.$store.dispatch('showMenuToggle')
    }
  },
  mounted() {
    // this.$store.dispatch('refreshTasks');
    // this.$store.dispatch('refreshProjects');
  }
}
</script>
