import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFound from '../views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/continents-game',
      name: 'continents-game',
      component: () => import('../views/ContinentsGameView.vue')
    },
    {
      path: '/flipping-game',
      name: 'flipping-game',
      component: () => import('../views/FlippingGameView.vue')
    },
    { path: '/:pathMatch(.*)', component: NotFound }
  ]
})

export default router
