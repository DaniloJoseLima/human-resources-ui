import api from './api';

class RefDataService {

  async getEthnicityTypes() {
    return await api.get(`/ref-data/ethnicity-types`).then(result => {
      return result.data
    });
  }

  async getMaritalStatusTypes() {
    return await api.get(`/ref-data/marital-status-types`).then(result => {
      return result.data
    });
  }

  async getGenderTypes() {
    return await api.get(`/ref-data/gender-types`).then(result => {
      return result.data
    });
  }
  
  async getDocumentsTypes() {
    return await api.get(`/ref-data/documents-types`).then(result => {
      return result.data
    });
  }
  
  async getSchoolingTypes() {
    return await api.get(`/ref-data/schooling-types`).then(result => {
      return result.data
    });
  }
  
  async getContactTypes() {
    return await api.get(`/ref-data/contact-types`).then(result => {
      return result.data
    });
  }
  
  async getDependentTypes() {
    return await api.get(`/ref-data/dependent-types`).then(result => {
      return result.data
    });
  }
  
  async getTransportTypes() {
    return await api.get(`/ref-data/transport-types`).then(result => {
      return result.data
    });
  }
  
  async getTransportCardTypes() {
    return await api.get(`/ref-data/transport-card-types`).then(result => {
      return result.data
    });
  }

  async getRoles() {
    return await api.get(`/ref-data/roles`).then(result => {
      return result.data
    });
  }
}

export default new RefDataService();