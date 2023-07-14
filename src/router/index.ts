import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import AppHome from '@/views/AppHome.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: AppHome
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/AppAbout.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('@/views/AppContact.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/AppLogin.vue')
  },
  {
    path: '/:group/:defLevel',
    name: 'Group',
    component: () => import('@/views/TripGroupView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,

  linkExactActiveClass: 'active',
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  }
})

export default router
