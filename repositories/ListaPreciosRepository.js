const BaseRepository = require('./BaseRepository');

class ListaPreciosRepository extends BaseRepository {
  constructor() {
    super('lista_precios');
  }
}

module.exports = ListaPreciosRepository;
