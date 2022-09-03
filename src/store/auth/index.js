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
      if (!state.user){        
         state.user =  TokenService.getUser()
      }
      return state.user;
    },
    loggedIn (state) {  
      return state.status.loggedIn
    },
    getCredentials(state) { 
      return state.credentitals
    }
  },
  mutations: {
    LOGIN_SUCCESS (state, credentitals) {
      state.status.loggedIn = true;
      state.credentitals = credentitals;      
    },
    LOGIN_FAILURE (state) {
      state.status.loggedIn = false;
      state.credentitals = null;
      state.user = null;
    },
    LOGOUT (state) {
      state.status.loggedIn = false;
      state.credentitals = null;
      state.user = null;
    },   
    REFRESH_TOKEN (state, accessToken) {
      state.status.loggedIn = true;
      state.credentitals = { ...state.credentitals.accessToken, accessToken: accessToken };
    },
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
    },   
    refreshToken ({ commit }, accessToken) {
      commit("REFRESH_TOKEN", accessToken);
    }
  },
};
