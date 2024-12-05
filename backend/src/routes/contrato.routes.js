const express = require('express');
const contratoController = require('../controllers/contratoController.js');
const authenticateToken = require('../middlewares/authenticateToken.js');
const authorizeRoles = require('../middlewares/authorizeRoles.js');

const router = express.Router();

router.post('/crear', authenticateToken, authorizeRoles(['admin', 'user']), contratoController.crearContrato);

router.get('/:id/pdf', authenticateToken, authorizeRoles(['admin', 'user']), contratoController.generarContrato);

module.exports = router;
