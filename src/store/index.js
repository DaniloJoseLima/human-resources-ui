import { createStore } from 'vuex'
import { auth }  from './auth'
import { toast } from './toast'
import SecureLS from 'secure-ls'

const ls = new SecureLS({ isCompression: false })
export default createStore({  
  modules: {
    auth,
    toast
  },
})
