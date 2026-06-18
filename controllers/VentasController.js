const BaseController = require('./BaseController');

class VentasController extends BaseController {
  constructor(ventasService) {
    super(ventasService);
    this.registrarVenta = this.registrarVenta.bind(this);
  }

  async registrarVenta(req, res, next) {
    try {
      const resultado = await this.service.registrarVenta(req.body);
      res.status(201).json(resultado);
    } catch (error) {
      if (error.message.includes('Stock insuficiente') || error.message.includes('no encontrada')) {
        return res.status(400).json({ error: error.message });
      }
      next(error);
    }
  }
}

module.exports = VentasController;
