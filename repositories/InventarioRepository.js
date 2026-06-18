const BaseRepository = require('./BaseRepository');

class InventarioRepository extends BaseRepository {
  constructor() {
    super('inventario');
  }
}

module.exports = InventarioRepository;
