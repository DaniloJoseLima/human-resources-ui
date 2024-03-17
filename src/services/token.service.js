import jwt_decode from "jwt-decode";

class TokenService {
  
  getLocalRefreshToken() {
    const credentitals = JSON.parse(localStorage.getItem("credentitals"));
    return credentitals?.token;
  }

  getLocalAccessToken() {
    const credentitals = JSON.parse(localStorage.getItem("credentitals"));
    return credentitals?.token;
  }

  updateLocalAccessToken(token) {
    let credentitals = JSON.parse(localStorage.getItem("credentitals"));
    credentitals.token = token;
    localStorage.setItem("credentitals", JSON.stringify(credentitals));
  }

  getUser() {
    const credentitals = JSON.parse(localStorage.getItem("credentitals"));
    if (credentitals?.user) {       
      const user = credentitals.user;    
      return user;
    }
    return null
  }

  setCredentials(credentitals) {    
    localStorage.setItem("credentitals", JSON.stringify(credentitals));
  }
  
  removeCredentials() {
    localStorage.removeItem("credentitals");
  }
}

export default new TokenService();
