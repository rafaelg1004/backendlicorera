const BaseRepository = require('./BaseRepository');

class EmpleadosRepository extends BaseRepository {
  constructor() {
    super('empleados');
  }
}

module.exports = EmpleadosRepository;
