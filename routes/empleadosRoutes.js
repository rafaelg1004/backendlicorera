const express = require('express');
const router = express.Router();
const EmpleadosRepository = require('../repositories/EmpleadosRepository');
const EmpleadosService = require('../services/EmpleadosService');
const EmpleadosController = require('../controllers/EmpleadosController');

const repository = new EmpleadosRepository();
const service = new EmpleadosService(repository);
const controller = new EmpleadosController(service);

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
