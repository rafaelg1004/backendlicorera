const express = require('express');
const router = express.Router();
const UnidadesMedidaRepository = require('../repositories/UnidadesMedidaRepository');
const UnidadesMedidaService = require('../services/UnidadesMedidaService');
const UnidadesMedidaController = require('../controllers/UnidadesMedidaController');

const repository = new UnidadesMedidaRepository();
const service = new UnidadesMedidaService(repository);
const controller = new UnidadesMedidaController(service);

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
