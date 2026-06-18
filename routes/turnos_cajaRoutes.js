const express = require('express');
const router = express.Router();
const TurnosCajaRepository = require('../repositories/TurnosCajaRepository');
const TurnosCajaService = require('../services/TurnosCajaService');
const TurnosCajaController = require('../controllers/TurnosCajaController');

const repository = new TurnosCajaRepository();
const service = new TurnosCajaService(repository);
const controller = new TurnosCajaController(service);

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

module.exports = router;
