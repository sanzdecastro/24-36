import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AutorxsView from '../views/AutorxsView.vue'
import CartView from '../views/CartView.vue'
import SingleView from '../views/SingleView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/autorxs',
      name: 'autorxs',
      component: AutorxsView
    },
    {
      path: '/cart',
      name: 'cart',
      component: CartView
    },
    {
      path: '/:title',
      name: 'single',
      component: SingleView,
      props: true 
    }
  ]
})

export default router
