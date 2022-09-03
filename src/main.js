import { createApp } from 'vue'
import { router } from '@/router'
import App from './App.vue'
import Maska from 'maska'
import store from './store'
import setupInterceptors from './services/setupInterceptors'

setupInterceptors(store);

createApp(App)
.use(store)
.use(Maska)
.use(router)
.mount('#app')
