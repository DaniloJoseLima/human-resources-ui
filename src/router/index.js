import { createRouter, createWebHistory } from 'vue-router'

import Auth from '@/views/public/login/Auth.vue'
import AuthLogin from '@/views/public/login/AuthLogin.vue'

export const router = createRouter({
  routes: [
    {
      path: '/',
      component: Auth,
      children: [
        {
          path: '',
          name: 'login',
          component: AuthLogin,
          meta: { public: true }
        },
      ]
    }
  ],
  history: createWebHistory()
})


router.beforeEach(async (to, from) => {
  

  return true
})

