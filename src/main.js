import { createApp } from 'vue'
import { router } from '@/router'
import Maska from 'maska'
import App from './App.vue'
import store from './store'
import setupInterceptors from './services/setupInterceptors'
import vue3GoogleLogin from 'vue3-google-login'

import 'virtual:svg-icons-register'

setupInterceptors(store);

createApp(App)
  .directive('focus', {
    mounted(el) {
      const input = el.querySelector('input')

      if (input) {
        input.focus()
        return
      }

      el.focus()
    }
  })
  .use(store)
  .use(router)
  .use(Maska)
  .use(vue3GoogleLogin, {
    clientId: '845494712565-c0fqa24lil7sj8f8mut6rpp046hjm263.apps.googleusercontent.com'
  })
  .mount('#app')
