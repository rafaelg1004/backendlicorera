const express = require('express');
const router = express.Router();
const VentasRepository = require('../repositories/VentasRepository');
const VentasService = require('../services/VentasService');
const VentasController = require('../controllers/VentasController');

const repository = new VentasRepository();
const service = new VentasService(repository);
const controller = new VentasController(service);

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.registrarVenta);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
