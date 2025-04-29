import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/article/create',
      name: 'create-article',
      component: () => import('../views/CreateUpdateArticle.vue'),
    },
    {
      path: '/article/:slug',
      name: 'article detail',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/ArticleView.vue'),
    },
    {
      path: '/article/:slug/edit',
      name: 'edit-article',
      component: () => import('../views/CreateUpdateArticle.vue'),
    },
    {
      path: '/login/',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/signup/',
      name: 'signup',
      component: () => import('@/views/SignupView.vue'),
    },
  ],
})

export default router
