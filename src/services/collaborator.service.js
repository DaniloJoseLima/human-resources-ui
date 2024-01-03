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

  async saveDocuments(values) {
    const response = await api.post("/collaborator/documents", values);
    return response.data;
  }

  async findDocuments(collaboratorId) {
    return api.get(`/collaborator/${collaboratorId}/documents`).then((response) => {
     return response.data;
   });
  }  

  async saveContacts(values) {
    const response = await api.post("/collaborator/contacts", values);
    return response.data;
  }

  async findContacts(collaboratorId) {
    return api.get(`/collaborator/${collaboratorId}/contacts`).then((response) => {
     return response.data;
   });
  }  

  async saveAddress(values) {
    const response = await api.post("/collaborator/address", values);
    return response.data;
  }

  async updateAddress(values) {
    const response = await api.put("/collaborator/address", values);
    return response.data;
  }

  async findAddress(collaboratorId) {
    return api.get(`/collaborator/${collaboratorId}/address`).then((response) => {
     return response.data;
   });
  }
}

export default new CollaboratorService();