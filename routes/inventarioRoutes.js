const express = require('express');
const router = express.Router();
const InventarioRepository = require('../repositories/InventarioRepository');
const InventarioService = require('../services/InventarioService');
const InventarioController = require('../controllers/InventarioController');

const repository = new InventarioRepository();
const service = new InventarioService(repository);
const controller = new InventarioController(service);

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
