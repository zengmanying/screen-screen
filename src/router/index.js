import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue'),
  },
  {
    path: '/battery',
    name: 'Battery',
    component: () => import('@/views/Battery.vue'),
  },
  {
    path: '/AF',
    name: 'AF',
    component: () => import('@/views/AF.vue'),
  },
  {
    path: '/BF',
    name: 'BF',
    component: () => import('@/views/AF.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
