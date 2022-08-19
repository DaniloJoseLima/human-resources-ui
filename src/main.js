import { createApp } from 'vue'
import { router } from '@/router'
import App from './App.vue'
import Maska from 'maska'

createApp(App)
.use(Maska)
.use(router)
.mount('#app')
