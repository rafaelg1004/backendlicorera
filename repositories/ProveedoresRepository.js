const BaseRepository = require('./BaseRepository');

class ProveedoresRepository extends BaseRepository {
  constructor() {
    super('proveedores');
  }
}

module.exports = ProveedoresRepository;
