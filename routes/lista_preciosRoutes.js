const express = require('express');
const router = express.Router();
const ListaPreciosRepository = require('../repositories/ListaPreciosRepository');
const ListaPreciosService = require('../services/ListaPreciosService');
const ListaPreciosController = require('../controllers/ListaPreciosController');

const repository = new ListaPreciosRepository();
const service = new ListaPreciosService(repository);
const controller = new ListaPreciosController(service);

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
