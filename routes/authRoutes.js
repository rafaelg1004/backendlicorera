const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

const controller = new AuthController();

router.post('/login', controller.login);
router.post('/register', controller.registerAdmin); 

module.exports = router;
