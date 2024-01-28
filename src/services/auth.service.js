import api from './api';
import TokenService from './token.service';

class AuthService {

  async login({ email, password, name, isGoogle }) {
    return api.post("/auth/login", { email, password, name, isGoogle }).then((response) => {
       if (response.data.token) {
        TokenService.setCredentials(response.data);
      }
      return response.data;
    });
  }

  //IMPLEMENTAR
  async logout(userId) {
    return api.post("/auth/logout",{ userId }).then((response) => {
      TokenService.removeCredentials();
    });
  }
}

export default new AuthService();