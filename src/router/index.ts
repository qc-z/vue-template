import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'index',
    component: () => import('@/views/index.vue')
  },
  { path: '/403', name: '403', component: () => import('@/views/403.vue') },
  { path: '/404', name: '404', component: () => import('@/views/404.vue') },
  { path: '/:pathMatch(.*)', redirect: '/404' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  next()
})
export default router
