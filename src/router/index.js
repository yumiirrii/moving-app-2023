import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/todo',
    name: 'todo',
    component: () => import('../views/TodoView.vue')
  },
  {
    path: '/tobuy',
    name: 'tobuy',
    component: () => import('../views/TobuyView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
