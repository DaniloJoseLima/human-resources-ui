import jwt_decode from "jwt-decode";

class TokenService {
  
  getLocalRefreshToken() {
    const credentitals = JSON.parse(localStorage.getItem("credentitals"));
    return credentitals?.refreshToken;
  }

  getLocalAccessToken() {
    const credentitals = JSON.parse(localStorage.getItem("credentitals"));
    return credentitals?.accessToken;
  }

  updateLocalAccessToken(token) {
    let credentitals = JSON.parse(localStorage.getItem("credentitals"));
    credentitals.accessToken = token;
    localStorage.setItem("credentitals", JSON.stringify(credentitals));
  }

  getUser() {
    const credentitals = JSON.parse(localStorage.getItem("credentitals"));
    if (credentitals?.accessToken) {      
      const sub = jwt_decode(credentitals?.accessToken).sub;  
      const user = JSON.parse(sub);    
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
