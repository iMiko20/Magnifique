const express = require('express');
const authenticateToken = require('../middlewares/authenticateToken.js');
const authorizeRoles = require('../middlewares/authorizeRoles.js');
const ventaController = require('../controllers/ventaController.js');
const rentaModel = require('../models/rentaModel.js');

const router = express.Router();

router.post('/', authenticateToken, authorizeRoles(['admin', 'user']), ventaController.createVenta);

router.get('/', authenticateToken, authorizeRoles(['admin', 'user']), ventaController.getAllVentas);

router.get('/:id', authenticateToken, authorizeRoles(['admin', 'user']), ventaController.getVentaById);

router.put('/:id', authenticateToken, authorizeRoles(['admin']), ventaController.updateVenta);

router.delete('/:id', authenticateToken, authorizeRoles(['admin']), ventaController.deleteVenta);

module.exports = router;
