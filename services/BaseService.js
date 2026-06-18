const AppError = require('../utils/AppError');

class BaseService {
  constructor(repository) {
    this.repository = repository;
  }

  async getAll(query = {}) {
    const page = parseInt(query.page, 10) || 1;
    const limit = parseInt(query.limit, 10) || 50;
    const offset = (page - 1) * limit;

    return await this.repository.findAll(limit, offset);
  }

  async getById(id) {
    const item = await this.repository.findById(id);
    if (!item) throw new AppError('Recurso no encontrado', 404);
    return item;
  }

  async create(data) {
    return await this.repository.create(data);
  }

  async update(id, data) {
    const item = await this.repository.update(id, data);
    if (!item) throw new AppError('Recurso no encontrado para actualizar', 404);
    return item;
  }

  async delete(id) {
    const item = await this.repository.delete(id);
    if (!item) throw new AppError('Recurso no encontrado para eliminar', 404);
    return item;
  }
}

module.exports = BaseService;
