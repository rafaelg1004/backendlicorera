const AuthService = require('../services/AuthService');
const service = new AuthService();

class AuthController {
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ status: 'fail', message: 'Por favor provea email y contraseña' });
      }

      const data = await service.login(email, password);
      res.status(200).json({ status: 'success', data });
    } catch (error) {
      next(error);
    }
  }

  async registerAdmin(req, res, next) {
    try {
      const data = await service.registerAdmin(req.body);
      res.status(201).json({ status: 'success', message: 'Usuario creado', data });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
