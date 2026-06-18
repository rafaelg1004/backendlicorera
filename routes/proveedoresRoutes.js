const express = require('express');
const router = express.Router();
const ProveedoresRepository = require('../repositories/ProveedoresRepository');
const ProveedoresService = require('../services/ProveedoresService');
const ProveedoresController = require('../controllers/ProveedoresController');

const repository = new ProveedoresRepository();
const service = new ProveedoresService(repository);
const controller = new ProveedoresController(service);

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
