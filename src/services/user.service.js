import api from './api';
import qs from 'query-string'

class UserService {

  createUser(form) {
    return api.post(`/user/create`, form).then(result => {
      return result.data
    });
  }

  update(user) {
    return api.put(`/user`, user).then(result => {
      return result.data
    });
  }
  
  findAll(searchParams) {
    return api.get(`/user?${qs.stringify({ page: 1, ...searchParams }, { skipEmptyString: true })}`).then((result) => {
      return result.data;
    });
  }
  
  find(id) {
    return api.get(`/user/${id}`).then(result => {
      return result.data
    });
  }
}

export default new UserService();