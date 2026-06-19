const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'licorera_db',
  password: process.env.DB_PASSWORD || 'password',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
});

pool.on('error', (err, client) => {
  console.error('Error inesperado en el cliente de PostgreSQL', err);
  process.exit(-1);
});

module.exports = pool;
