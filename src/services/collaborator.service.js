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

  async updateDocuments(values) {
    const response = await api.put("/collaborator/documents", values);
    return response.data;
  }

  async deleteDocuments(id) {
    const response = await api.delete(`/collaborator/documents/${id}`);
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

  async updateContacts(values) {
    const response = await api.put("/collaborator/contacts", values);
    return response.data;
  }

  async deleteContacts(id) {
    const response = await api.delete(`/collaborator/contacts/${id}`);
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

  async saveDependents(values) {
    const response = await api.post("/collaborator/dependents", values);
    return response.data;
  }

  async updateDependents(values) {
    const response = await api.put("/collaborator/dependents", values);
    return response.data;
  }

  async deleteDependents(id) {
    const response = await api.delete(`/collaborator/dependents/${id}`);
    return response.data;
  }

  async findDependents(collaboratorId) {
    return api.get(`/collaborator/${collaboratorId}/dependents`).then((response) => {
      return response.data;
    });
  }

  async saveBankData(values) {
    const response = await api.post("/collaborator/bank-data", values);
    return response.data;
  }

  async updateBankData(values) {
    const response = await api.put("/collaborator/bank-data", values);
    return response.data;
  }

  async findBankData(collaboratorId) {
    return api.get(`/collaborator/${collaboratorId}/bank-data`).then((response) => {
      return response.data;
    });
  }

  async saveContractData(values) {
    const response = await api.post("/collaborator/contract-data", values);
    return response.data;
  }

  async updateContractData(values) {
    const response = await api.put("/collaborator/contract-data", values);
    return response.data;
  }

  async findContractData(collaboratorId) {
    return api.get(`/collaborator/${collaboratorId}/contract-data`).then((response) => {
      return response.data;
    });
  }

  async saveProfessionalData(values) {
    const response = await api.post("/collaborator/professional-data", values);
    return response.data;
  }

  async updateProfessionalData(values) {
    const response = await api.put("/collaborator/professional-data", values);
    return response.data;
  }
  
  async deleteFormation(id) {
    const response = await api.delete(`/collaborator/professional-data/formation/${id}`);
    return response.data;
  }
  
  async deleteCertification(id) {
    const response = await api.delete(`/collaborator/professional-data/certification/${id}`);
    return response.data;
  }

  async findProfessionalData(collaboratorId) {
    return api.get(`/collaborator/${collaboratorId}/professional-data`).then((response) => {
      return response.data;
    });
  }

  async saveTransportationVouchers(values) {
    const response = await api.post("/collaborator/transportation-vouchers", values);
    return response.data;
  }
  
  async updateTransportationVouchers(values) {
    const response = await api.put("/collaborator/transportation-vouchers", values);
    return response.data;
  }
  
  async deleteTransportationVouchers(id) {
    const response = await api.delete(`/collaborator/transportation-vouchers/${id}`);
    return response.data;
  }

  async findTransportationVouchers(collaboratorId) {
    return api.get(`/collaborator/${collaboratorId}/transportation-vouchers`).then((response) => {
      return response.data;
    });
  }
  
  async saveCompanyData(values) {
    const response = await api.post("/collaborator/company-data", values);
    return response.data;
  }
  
  async updateCompanyData(values) {
    const response = await api.put("/collaborator/company-data", values);
    return response.data;
  }

  async findCompanyData(collaboratorId) {
    return api.get(`/collaborator/${collaboratorId}/company-data`).then((response) => {
      return response.data;
    });
  }
}

export default new CollaboratorService();