import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'Fellas Barbershop - A Sua Barbearia de Confiança' },
  },
  {
    path: '/score',
    name: 'score',
    component: () => import('@/views/ScoreView.vue'),
    meta: { title: 'Score - Fellas Barbershop' },
  },
  {
    path: '/services',
    name: 'services',
    component: () => import('@/views/ServicesView.vue'),
    meta: { title: 'Serviços - Fellas Barbershop' },
  },
  {
    path: '/gallery',
    name: 'gallery',
    component: () => import('@/views/GalleryView.vue'),
    meta: { title: 'Galeria - Fellas Barbershop' },
  },
  {
    path: '/contacts',
    name: 'contacts',
    component: () => import('@/views/ContactsView.vue'),
    meta: { title: 'Contactos - Fellas Barbershop' },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, _from, savedPosition) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 80, // Offset for fixed header
      }
    }
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  },
})

// Update document title on route change
router.afterEach((to) => {
  document.title = (to.meta.title as string) || 'Fellas Barbershop'
})

export default router
