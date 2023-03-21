import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Warehouse from '@/pages/Warehouse.vue'
import Favorits from "@/pages/Favorits.vue"
import Deals from "@/pages/Deals.vue"

const routes: Array<RouteRecordRaw> = [
  {
    path: '/', 
    name: 'Warehouse',
    component: Warehouse,
  },
  {
    path: '/favorits',
    name: 'Favorits',
    component: Favorits,
  },
  {
    path: '/deals',
    name: 'Deals',
    component: Deals
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
