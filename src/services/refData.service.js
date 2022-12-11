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
}

export default new RefDataService();