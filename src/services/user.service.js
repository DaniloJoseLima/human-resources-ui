import api from './api';

class UserService {

  getUser() {
    return api.get(`/user/profile`).then(result => {
      return result.data
    });
  }
}

export default new UserService();