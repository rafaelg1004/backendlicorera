const BaseService = require('./BaseService');

class ProductosService extends BaseService {
  constructor(repository) {
    super(repository);
  }
}

module.exports = ProductosService;
