const BaseRepository = require('./BaseRepository');

class VentasRepository extends BaseRepository {
  constructor() {
    super('ventas');
  }

  async getClient() {
    return await this.db.connect();
  }
}

module.exports = VentasRepository;
