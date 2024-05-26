import store from "../store"


export default ()  => {

    const notify = (type, message) => {
        store.dispatch('toast/notification',{
            id: new Date().getTime(),  
            message,
            type
          })
    }
    
    const remove = (notify) => {
        store.dispatch('toast/remove', notify)
    }

    return {
        notify,
        remove
    }
}
