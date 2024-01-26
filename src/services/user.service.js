import api from './api';
import qs from 'query-string'

class UserService {

  async createUser(form) {
    return await api.post(`/user/create`, form).then(result => {
      return result.data
    });
  }

  async update(user) {
    return await api.put(`/user`, user).then(result => {
      return result.data
    });
  }
  
  async findAll(searchParams) {
    return await api.get(`/user?${qs.stringify({ page: 1, ...searchParams }, { skipEmptyString: true })}`).then((result) => {
      return result.data;
    });
  }
  
  async find(id) {
    return await api.get(`/user/${id}`).then(result => {
      return result.data
    });
  }
}

export default new UserService();