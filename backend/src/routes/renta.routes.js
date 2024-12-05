const express = require('express');
const authenticateToken = require('../middlewares/authenticateToken.js');
const authorizeRoles = require('../middlewares/authorizeRoles.js');
const existeVestido = require('../middlewares/existeVestido.js');
const rentaController = require('../controllers/rentaController.js');

const router = express.Router();

router.post('/', authenticateToken, authorizeRoles(['admin', 'user']), existeVestido, rentaController.createRenta);

router.get('/', authenticateToken, authorizeRoles(['admin', 'user']), rentaController.getAllRentas);

router.get('/:id', authenticateToken, authorizeRoles(['admin', 'user']), rentaController.getRentaById);

router.put('/:id', authenticateToken, authorizeRoles(['admin']), rentaController.updateRenta);

router.delete('/:id', authenticateToken, authorizeRoles(['admin']), rentaController.deleteRenta);

router.post('/reporte', authenticateToken, authorizeRoles(['admin', 'user']), rentaController.getReport);

module.exports = router;
