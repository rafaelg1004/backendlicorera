const express = require('express');
const router = express.Router();
const ClientesRepository = require('../repositories/ClientesRepository');
const ClientesService = require('../services/ClientesService');
const ClientesController = require('../controllers/ClientesController');

const repository = new ClientesRepository();
const service = new ClientesService(repository);
const controller = new ClientesController(service);

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
