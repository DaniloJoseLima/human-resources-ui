import { createApp } from 'vue'
import { router } from '@/router'
import Maska from 'maska'
import App from './App.vue'
import store from './store'
import setupInterceptors from './services/setupInterceptors'

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
  .mount('#app')
