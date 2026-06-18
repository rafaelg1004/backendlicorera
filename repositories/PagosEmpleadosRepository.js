const BaseRepository = require('./BaseRepository');

class PagosEmpleadosRepository extends BaseRepository {
  constructor() {
    super('pagos_empleados');
  }
}

module.exports = PagosEmpleadosRepository;
