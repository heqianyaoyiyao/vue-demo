import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: "/index",
      name: "Index",
      component: () => import('../views/home.vue')
    },
    {
      path: '/resetPassword/:token',
      name: 'ResetPassword',
      component: () => import('../views/user/resetPassword.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/user/login.vue')
    }
  ]
})

export default router
