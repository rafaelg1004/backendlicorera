const BaseRepository = require('./BaseRepository');

class ComprasRepository extends BaseRepository {
  constructor() {
    super('compras');
  }
}

module.exports = ComprasRepository;
