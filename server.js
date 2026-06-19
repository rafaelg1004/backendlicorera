const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const db = require('./db');
const errorHandler = require('./middlewares/errorHandler');
const protect = require('./middlewares/authMiddleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet()); 

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100,
  message: { status: 'fail', message: 'Demasiadas peticiones, intenta en 15 min.' }
});
app.use('/api/', apiLimiter);

app.use(cors());
app.use(express.json());

db.query('SELECT NOW()', (err, res) => {
  if (err) console.error('Error conectando a BD:', err.stack);
  else console.log('Conexión a BD exitosa:', res.rows[0].now);
});

// Rutas Públicas (Auth)
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Rutas Protegidas (se requiere JWT)
const productosRoutes = require('./routes/productosRoutes');
const clientesRoutes = require('./routes/clientesRoutes');
const proveedoresRoutes = require('./routes/proveedoresRoutes');
const empleadosRoutes = require('./routes/empleadosRoutes');
const unidadesMedidaRoutes = require('./routes/unidades_medidaRoutes');
const inventarioRoutes = require('./routes/inventarioRoutes');
const listaPreciosRoutes = require('./routes/lista_preciosRoutes');
const turnosCajaRoutes = require('./routes/turnos_cajaRoutes');
const pagosEmpleadosRoutes = require('./routes/pagos_empleadosRoutes');
const comprasRoutes = require('./routes/comprasRoutes');
const creditosPrestamosRoutes = require('./routes/creditos_prestamosRoutes');
const ventasRoutes = require('./routes/ventasRoutes');

app.use('/api/productos', protect, productosRoutes);
app.use('/api/clientes', protect, clientesRoutes);
app.use('/api/proveedores', protect, proveedoresRoutes);
app.use('/api/empleados', protect, empleadosRoutes); // Un admin gestiona empleados
app.use('/api/unidades-medida', protect, unidadesMedidaRoutes);
app.use('/api/inventario', protect, inventarioRoutes);
app.use('/api/lista-precios', protect, listaPreciosRoutes);
app.use('/api/turnos-caja', protect, turnosCajaRoutes);
app.use('/api/pagos-empleados', protect, pagosEmpleadosRoutes);
app.use('/api/compras', protect, comprasRoutes);
app.use('/api/creditos-prestamos', protect, creditosPrestamosRoutes);
app.use('/api/ventas', protect, ventasRoutes);

app.get('/', (req, res) => {
  res.status(200).json({ status: 'success', message: 'API funcionando.' });
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'success', message: 'OK' });
});

app.use(errorHandler);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
