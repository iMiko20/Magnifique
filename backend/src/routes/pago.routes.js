const express = require('express');
const authenticateToken = require('../middlewares/authenticateToken.js');
const authorizeRoles = require('../middlewares/authorizeRoles.js');
const pagoController = require('../controllers/pagoController.js');

const router = express.Router();

router.post('/', authenticateToken, authorizeRoles(['admin', 'user']), pagoController.createPago);

router.get('/', authenticateToken, authorizeRoles(['admin', 'user']), pagoController.getAllPagos);

router.get('/:id', authenticateToken, authorizeRoles(['admin', 'user']), pagoController.getPagoById);

router.put('/:id', authenticateToken, authorizeRoles(['admin']), pagoController.updatePago);

router.delete('/:id', authenticateToken, authorizeRoles(['admin']), pagoController.deletePago);

module.exports = router;
