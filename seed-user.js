const AuthService = require('./services/AuthService');
const db = require('./db');

async function seedUser() {
  try {
    const service = new AuthService();
    
    console.log('Intentando registrar usuario admin...');
    const result = await service.registerAdmin({
      email: 'admin@licorera.com',
      password: '123456',
      rol: 'admin'
    });
    
    console.log('Usuario de prueba insertado correctamente:', result);
  } catch (error) {
    if (error.message === 'El email ya está registrado') {
      console.log('El usuario admin@licorera.com ya existe en la base de datos.');
    } else {
      console.error('Error insertando usuario:', error);
    }
  } finally {
    await db.end(); // Cerrar el pool
  }
}

seedUser();
