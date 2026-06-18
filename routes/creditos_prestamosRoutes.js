const express = require('express');
const router = express.Router();
const CreditosPrestamosRepository = require('../repositories/CreditosPrestamosRepository');
const CreditosPrestamosService = require('../services/CreditosPrestamosService');
const CreditosPrestamosController = require('../controllers/CreditosPrestamosController');

const repository = new CreditosPrestamosRepository();
const service = new CreditosPrestamosService(repository);
const controller = new CreditosPrestamosController(service);

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
