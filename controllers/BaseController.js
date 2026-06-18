class BaseController {
  constructor(service) {
    this.service = service;
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async getAll(req, res, next) {
    try {
      const data = await this.service.getAll(req.query);
      res.status(200).json({ status: 'success', data });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const data = await this.service.getById(req.params.id);
      res.status(200).json({ status: 'success', data });
    } catch (error) {
      next(error);
    }
  }

  async create(req, res, next) {
    try {
      const data = await this.service.create(req.body);
      res.status(201).json({ status: 'success', data });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const data = await this.service.update(req.params.id, req.body);
      res.status(200).json({ status: 'success', data });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const data = await this.service.delete(req.params.id);
      res.status(200).json({ status: 'success', message: 'Eliminado exitosamente', data });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = BaseController;
