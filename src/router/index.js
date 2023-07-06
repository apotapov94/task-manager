import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '../firebase'
import HomePage from '@/pages/HomePage.vue'
import AllTasksPage from '@/pages/AllTasksPage.vue'
import MyTasksPage from '@/pages/MyTasksPage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import RegisterPage from '@/pages/RegisterPage.vue'
import ProjectsPage from '@/pages/ProjectsPage.vue'
import ProjectDetailPage from '@/pages/ProjectDetailPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage
    },
    {
      path: '/all-tasks',
      name: 'All tasks',
      component: AllTasksPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/my-tasks',
      name: 'My tasks',
      component: MyTasksPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/projects',
      name: 'Projects',
      component: ProjectsPage,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/projects/:keyword',
      name: 'projectPage',
      component: ProjectDetailPage
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(to.path === '/login' && auth.currentUser){
    next('/')
    return;
  }

  if(to.matched.some(record => record.meta.requiresAuth) && !auth.currentUser){
    next('/login')
    return;
  }

  next();
})

export default router
