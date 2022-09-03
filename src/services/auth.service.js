import api from './api';
import TokenService from './token.service';

class AuthService {

  login({ email, password }) {
    return api.post("/login", { email, password }).then((response) => {
       if (response.data.token) {
        TokenService.setCredentials(response.data);
      }
      return response.data;
    });
  }

  logout(userId) {
    return api.post("/auth/logout",{ userId }).then((response) => {
      TokenService.removeCredentials();
    });
  }
}

export default new AuthService();