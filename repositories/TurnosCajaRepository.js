const BaseRepository = require('./BaseRepository');

class TurnosCajaRepository extends BaseRepository {
  constructor() {
    super('turnos_caja');
  }
}

module.exports = TurnosCajaRepository;
