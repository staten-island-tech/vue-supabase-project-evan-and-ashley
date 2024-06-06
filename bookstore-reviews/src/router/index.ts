import { sessionStore } from '@/stores/authStore'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/Auth'
    },
    {
      path: '/Auth',
      name: 'Auth',
      //@ts-ignore
      component: () => import('../components/Auth.vue')
    },
    {
      path: '/SignUp',
      name: 'SignUp',
      //@ts-ignore
      component: () => import('../components/SignUp.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //@ts-ignore
      component: () => import('../views/ProfileView.vue'),
      meta: { requireLogin: true }
    },
    {
      path: '/home',
      name: 'home',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //@ts-ignore
      component: () => import('../views/HomeView.vue'),
      meta: { requireLogin: true }
    },
    {
      path: '/explore',
      name: 'explore',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //@ts-ignore
      component: () => import('../views/ExploreView.vue'),
      meta: { requireLogin: true }
    },
    {
      path: '/bookData/:id',
      name: 'bookData',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      //@ts-ignore
      component: () => import('../views/BookData.vue')
    },
  ]
})

router.beforeEach((to, from, next) => {
  if (
    !['/', '/login'] &&
    to.matched.some((record) => record.meta.requireLogin) &&
    !sessionStore().session.isLoggedIn
  ) {
    next({ path: '/Auth' })
  } else {
    next()
  }
})

export default router
