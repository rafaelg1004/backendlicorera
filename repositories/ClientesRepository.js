const BaseRepository = require('./BaseRepository');

class ClientesRepository extends BaseRepository {
  constructor() {
    super('clientes');
  }
}

module.exports = ClientesRepository;
