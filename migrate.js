const db = require('./db');
async function migrate() {
  try {
    await db.query(`ALTER TABLE empleados ADD COLUMN email VARCHAR(255) UNIQUE;`);
    await db.query(`ALTER TABLE empleados ADD COLUMN password_hash VARCHAR(255);`);
    console.log('Migración de BD completada (email, password_hash)');
  } catch (err) {
    console.error('Error (quizá ya existan las columnas):', err.message);
  } finally {
    process.exit(0);
  }
}
migrate();
