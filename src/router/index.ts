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
    path: '/trip/:id',
    name: 'Trip',
    component: () => import('@/views/TripGroupView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,

  linkExactActiveClass: 'active'
})

export default router
