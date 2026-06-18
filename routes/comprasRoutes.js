const express = require('express');
const router = express.Router();
const ComprasRepository = require('../repositories/ComprasRepository');
const ComprasService = require('../services/ComprasService');
const ComprasController = require('../controllers/ComprasController');

const repository = new ComprasRepository();
const service = new ComprasService(repository);
const controller = new ComprasController(service);

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
