const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
});

client.connect()
  .then(() => {
    console.log('Conexión exitosa a la base de datos:', process.env.DB_NAME);
    return client.end();
  })
  .catch(err => {
    console.error('Error de conexión a la base de datos:', err.message);
    process.exit(1);
  });
