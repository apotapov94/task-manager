import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '../firebase'
import AllTasksPage from '@/pages/AllTasksPage.vue'
import MyTasksPage from '@/pages/MyTasksPage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import RegisterPage from '@/pages/RegisterPage.vue'
import ProjectsPage from '@/pages/ProjectsPage.vue'
import ProjectDetailPage from '@/pages/ProjectDetailPage.vue'
import ProfilePage from '@/pages/ProfilePage.vue'
import CanbanPage from '@/pages/CanbanPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
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
      path: '/profile',
      name: 'Profile',
      component: ProfilePage,
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
      component: ProjectDetailPage,
      meta: {
        requiresAuth: true
      }
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
    },
    {
      path: '/canban',
      name: 'canban',
      component: CanbanPage,
      meta: {
        requiresAuth: true
      }
    }
  ]
})



export default router
