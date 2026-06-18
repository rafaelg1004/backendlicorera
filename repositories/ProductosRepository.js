const BaseRepository = require('./BaseRepository');

class ProductosRepository extends BaseRepository {
  constructor() {
    super('productos');
  }
}

module.exports = ProductosRepository;
