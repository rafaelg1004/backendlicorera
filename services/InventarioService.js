const BaseService = require('./BaseService');

class InventarioService extends BaseService {
  constructor(repository) {
    super(repository);
  }
}

module.exports = InventarioService;
