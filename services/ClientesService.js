const BaseService = require('./BaseService');

class ClientesService extends BaseService {
  constructor(repository) {
    super(repository);
  }
}

module.exports = ClientesService;
