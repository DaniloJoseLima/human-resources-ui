import api from './api';
import qs from 'query-string'

class CollaboratorService {

  async save(values) {
    const response = await api.post("/collaborator", values);
    return response.data;
  }
  async update(values) {
    const response = await api.put("/collaborator", values);
    return response.data;
  }

  async list(searchParams) {
    return api.get(`/collaborator?${qs.stringify({ page: 1, ...searchParams }, { skipEmptyString: true })}`).then((response) => {
     return response.data;
   });
  }

  async find(id) {
    return api.get(`/collaborator/${id}`).then((response) => {
     return response.data;
   });
  }

  async registrationVerification(id) {
    return api.get(`/collaborator/${id}/registration-verification`).then((response) => {
     return response.data;
   });
  }
}

export default new CollaboratorService();