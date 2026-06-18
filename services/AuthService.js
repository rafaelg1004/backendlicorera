const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');
const db = require('../db');

class AuthService {
  async login(email, password) {
    // Buscar en la tabla USUARIOS (no empleados)
    const result = await db.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      throw new AppError('Credenciales inválidas', 401);
    }

    // Verificar contraseña
    const isValidPassword = await bcrypt.compare(password, user.password_hash);
    if (!isValidPassword) {
      throw new AppError('Credenciales inválidas', 401);
    }

    // Generar JWT
    const token = jwt.sign(
      { id: user.id, rol: user.rol, empleado_id: user.empleado_id }, 
      process.env.JWT_SECRET || 'super_secret_key_123', 
      { expiresIn: '1d' }
    );

    // No devolver el hash al frontend
    delete user.password_hash;

    return { user, token };
  }

  async registerAdmin(data) {
    const { email, password, rol, empleado_id } = data;
    
    // Verificar si el usuario ya existe
    const exist = await db.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    if (exist.rows.length > 0) throw new AppError('El email ya está registrado', 400);

    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    const result = await db.query(
      `INSERT INTO usuarios (email, password_hash, rol, empleado_id) 
       VALUES ($1, $2, $3, $4) RETURNING id, email, rol, empleado_id`,
      [email, password_hash, rol || 'admin', empleado_id || null]
    );

    return result.rows[0];
  }
}

module.exports = AuthService;
