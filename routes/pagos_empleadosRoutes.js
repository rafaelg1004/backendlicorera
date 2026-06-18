const express = require('express');
const router = express.Router();
const PagosEmpleadosRepository = require('../repositories/PagosEmpleadosRepository');
const PagosEmpleadosService = require('../services/PagosEmpleadosService');
const PagosEmpleadosController = require('../controllers/PagosEmpleadosController');

const repository = new PagosEmpleadosRepository();
const service = new PagosEmpleadosService(repository);
const controller = new PagosEmpleadosController(service);

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
