import api from './api';

class externalApi {

  cep(cep) {
    return api.get(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => {
        return response.data
      })
  }
}

export default new externalApi();