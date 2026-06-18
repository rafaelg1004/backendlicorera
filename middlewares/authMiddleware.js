const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');

const protect = (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return next(new AppError('No estás autenticado. Por favor inicia sesión.', 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'super_secret_key_123');
    req.user = decoded; 
    next();
  } catch (error) {
    return next(new AppError('Token inválido o expirado. Vuelve a iniciar sesión.', 401));
  }
};

module.exports = protect;
