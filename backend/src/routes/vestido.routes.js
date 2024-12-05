const express = require('express');
const authenticateToken = require('../middlewares/authenticateToken.js');
const authorizeRoles = require('../middlewares/authorizeRoles.js');
const vestidoController = require('../controllers/vestidoController.js');

const router = express.Router();

router.post('/', authenticateToken, authorizeRoles(['admin', 'user']), vestidoController.createVestido);

router.get('/', vestidoController.getAllVestidos);

router.get('/:id', vestidoController.getVestidoById);

router.put('/:id', authenticateToken, authorizeRoles(['admin']), vestidoController.updateVestido);

router.delete('/:id', authenticateToken, authorizeRoles(['admin']), vestidoController.deleteVestido);

router.post('/filtro', vestidoController.Filtro);

router.patch('/:id/disponibilidad', authenticateToken, authorizeRoles(['admin']), vestidoController.updateDisponibilidad);

module.exports = router;