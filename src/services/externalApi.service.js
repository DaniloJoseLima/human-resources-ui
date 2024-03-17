import api from './api';

class externalApi {

  async cep(cep) {
    return await api.get(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => {
        return response.data
      })
  }
}

export default new externalApi();