import { createRouter, createWebHistory } from 'vue-router'

import Auth from '@/views/public/login/Auth.vue'
import AuthLogin from '@/views/public/login/AuthLogin.vue'
import Restricted from '@/views/restricted/Restricted.vue'
import Dashboard from '@/views/restricted/dashboard/Dashboard.vue'
import List from '@/views/restricted/employee/List.vue'

import Registration from '@/views/restricted/employee/registration/Registration.vue'
import PersonalData from '@/views/restricted/employee/registration/PersonalData.vue'
import Documents from '@/views/restricted/employee/registration/Documents.vue'
import Contacts from '@/views/restricted/employee/registration/Contacts.vue'
import Addresses from '@/views/restricted/employee/registration/Addresses.vue'
import Dependents from '@/views/restricted/employee/registration/Dependents.vue'
import BankData from '@/views/restricted/employee/registration/BankData.vue'
import ContractData from '@/views/restricted/employee/registration/ContractData.vue'
import ProfessionalData from '@/views/restricted/employee/registration/ProfessionalData.vue'
import TransportationVouchers from '@/views/restricted/employee/registration/TransportationVouchers.vue'
import CompanyData from '@/views/restricted/employee/registration/CompanyData.vue'

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
          children: [
            {
              path: '/personal-data/:type',
              name: 'personal-data',
              component: PersonalData,
            },
            {
              path: '/edit-personal-data/:id',
              name: 'personal-data-edit',
              component: PersonalData,
            },
            {
              path: '/documents',
              name: 'documents',
              component: Documents,
            },
            {
              path: '/contacts',
              name: 'contacts',
              component: Contacts,
            },
            {
              path: '/addresses',
              name: 'addresses',
              component: Addresses,
            },
            {
              path: '/dependents',
              name: 'dependents',
              component: Dependents,
            },
            {
              path: '/bank-data',
              name: 'bank',
              component: BankData,
            },
            {
              path: '/contract-data',
              name: 'contract',
              component: ContractData,
            },
            {
              path: '/professional-data',
              name: 'professional',
              component: ProfessionalData,
            },
            {
              path: '/transportation-vouchers',
              name: 'transportation-vouchers',
              component: TransportationVouchers,
            },
            {
              path: '/company-data',
              name: 'company',
              component: CompanyData,
            },
          ]
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