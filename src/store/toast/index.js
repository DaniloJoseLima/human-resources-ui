

const initialState = {
  toasts: []
}

export const toast =  {
  namespaced: true,
  state: initialState,
  mutations: {   
    ADD_NOTIFICATION (state, notification){
      state.toasts.push(notification) 
      setTimeout(()=>{
        state.toasts =  state.toasts.filter(notification => notification.id !== notification.id)
      },3000)
    },
    REMOVE_NOTIFICATION (state, notification){
      state.toasts =  state.toasts.filter(notification => notification.id !== notification.id)
    }
  },
  actions: {  
    notification({ commit }, notification){      
      commit("ADD_NOTIFICATION", notification);     
    },
    remove({ commit }, notification){
      commit("REMOVE_NOTIFICATION", notification);  
    }
  },
};
