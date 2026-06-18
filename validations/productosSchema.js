const { z } = require('zod');

const productosSchema = z.object({
  codigo_barras: z.string().min(1, 'El código de barras es obligatorio'),
  nombre: z.string().min(2, 'El nombre debe tener al menos 2 caracteres'),
  categoria: z.string().optional(),
  stock_minimo: z.number().int().nonnegative('El stock mínimo no puede ser negativo').default(0)
});

module.exports = { productosSchema };
