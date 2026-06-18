const express = require('express');
const router = express.Router();
const ProductosRepository = require('../repositories/ProductosRepository');
const ProductosService = require('../services/ProductosService');
const ProductosController = require('../controllers/ProductosController');

const validateRequest = require('../middlewares/validateRequest');
const { productosSchema } = require('../validations/productosSchema');

const repository = new ProductosRepository();
const service = new ProductosService(repository);
const controller = new ProductosController(service);

router.get('/', controller.getAll);
router.get('/:id', controller.getById);

router.post('/', validateRequest(productosSchema), controller.create);
router.put('/:id', validateRequest(productosSchema), controller.update);

router.delete('/:id', controller.delete);

module.exports = router;
