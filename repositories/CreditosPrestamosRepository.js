const BaseRepository = require('./BaseRepository');

class CreditosPrestamosRepository extends BaseRepository {
  constructor() {
    super('creditos_prestamos');
  }
}

module.exports = CreditosPrestamosRepository;
