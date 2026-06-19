const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

const controller = new AuthController();

router.post('/login', controller.login);
router.post('/register', controller.registerAdmin); 

// Ruta temporal para crear el usuario de pruebas
router.get('/seed', controller.seedAdmin);

module.exports = router;
