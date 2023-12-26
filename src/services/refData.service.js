import api from './api';

class RefDataService {

  getEthnicityTypes() {
    return api.get(`/ref-data/ethnicity-types`).then(result => {
      return result.data
    });
  }

  getMaritalStatusTypes() {
    return api.get(`/ref-data/marital-status-types`).then(result => {
      return result.data
    });
  }

  getGenderTypes() {
    return api.get(`/ref-data/gender-types`).then(result => {
      return result.data
    });
  }
  
  getDocumentsTypes() {
    return api.get(`/ref-data/documents-types`).then(result => {
      return result.data
    });
  }
  
  getSchoolingTypes() {
    return api.get(`/ref-data/schooling-types`).then(result => {
      return result.data
    });
  }
  
  getContactTypes() {
    return api.get(`/ref-data/contact-types`).then(result => {
      return result.data
    });
  }
  
  getDependentTypes() {
    return api.get(`/ref-data/dependent-types`).then(result => {
      return result.data
    });
  }
  
  getTransportTypes() {
    return api.get(`/ref-data/transport-types`).then(result => {
      return result.data
    });
  }
  
  getTransportCardTypes() {
    return api.get(`/ref-data/transport-card-types`).then(result => {
      return result.data
    });
  }

  getRoles() {
    return api.get(`/ref-data/roles`).then(result => {
      return result.data
    });
  }
}

export default new RefDataService();