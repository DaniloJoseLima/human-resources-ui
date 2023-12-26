import AuthService from "../../services/auth.service";
import TokenService from "../../services/token.service"

const credentitals = JSON.parse(localStorage.getItem("credentitals"));
const user = TokenService.getUser()

const initialState = credentitals 
  ? { status: { loggedIn: true }, user: user, credentitals }
  : { status: { loggedIn: false }, user: null, credentitals: null };

export const auth =  {
  namespaced: true,
  state: initialState,
  getters: {
    currentUser (state) {
      return state.credentitals.user;
    },
    loggedIn (state) {  
      return state.status.loggedIn
    },
    getCredentials(state) { 
      return state.credentitals
    },
    getPermissions(state) { 
      return state.user.permissions
    }
  },
  mutations: {
    LOGIN_SUCCESS (state, credentitals) {
      state.credentitals = credentitals;      
    },
    LOGIN_FAILURE (state) {
      state.credentitals = null;
    },
    LOGOUT (state) {
      state.credentitals = null;
    }
  },
  actions: {
    login ({ commit }, credentitals) {
      return AuthService.login(credentitals).then(
        (response) => {          
          commit("LOGIN_SUCCESS", response);
          return Promise.resolve(response);
        },
        (error) => {
          commit("LOGIN_FAILURE");
          return Promise.reject(error);
        }
      );
    },
    logout ({ commit }, userId ) {
      if(userId){
        return AuthService.logout(userId).then((response) => {
          commit("LOGOUT");
        });
      } else {
        TokenService.removeCredentials()
        commit("LOGOUT");
      }
    }
  },
};
