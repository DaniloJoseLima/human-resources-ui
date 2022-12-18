import api from './api';

class CollaboratorService {

  create(values) {
    return api.get(`/user/profile`).then(result => {
      return result.data
    });
  }
}

export default new CollaboratorService();