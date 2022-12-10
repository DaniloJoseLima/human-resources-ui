import { createRouter, createWebHistory } from 'vue-router'

import Auth from '@/views/public/login/Auth.vue'
import AuthLogin from '@/views/public/login/AuthLogin.vue'
import Restricted from '@/views/restricted/Restricted.vue'
import Dashboard from '@/views/restricted/dashboard/Dashboard.vue'
import Registration from '@/views/restricted/employee/Registration.vue'
import List from '@/views/restricted/employee/List.vue'

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
    },
    {
      path: '/user',
      component: Restricted,
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          component: Dashboard,
        },
        {
          path: '/registration',
          name: 'registration',
          component: Registration,
        },
        {
          path: '/list',
          name: 'list',
          component: List,
        },
      ]
    }
  ],
  history: createWebHistory()
})


router.beforeEach((to, from, next) => {
  const loggedIn = localStorage.getItem('credentitals');
  if (!to.meta.public && !loggedIn) {
    next('/');
  } else {
    if(loggedIn && to.path === '/') {
      next('/dashboard');
    }
    next();
  }
});