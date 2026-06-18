const validateRequest = (schema) => {
  return (req, res, next) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      // Si el error es de Zod, formatearlo
      const errors = error.errors.map(e => ({
        path: e.path.join('.'),
        message: e.message
      }));
      res.status(400).json({
        status: 'fail',
        message: 'Error de validación en los datos ingresados',
        errors
      });
    }
  };
};

module.exports = validateRequest;
