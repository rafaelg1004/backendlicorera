const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');
const protect = require('../middlewares/authMiddleware');

const controller = new AuthController();

router.post('/login', controller.login);
router.post('/register', controller.registerAdmin); 
router.get('/me', protect, controller.getMe);
router.post('/logout', protect, controller.logout);

module.exports = router;
