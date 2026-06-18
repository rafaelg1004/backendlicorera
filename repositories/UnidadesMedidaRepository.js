const BaseRepository = require('./BaseRepository');

class UnidadesMedidaRepository extends BaseRepository {
  constructor() {
    super('unidades_medida');
  }
}

module.exports = UnidadesMedidaRepository;
