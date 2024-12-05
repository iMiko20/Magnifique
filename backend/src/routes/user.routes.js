const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const authorizeRoles = require('../middlewares/authorizeRoles.js');
const authenticateToken = require('../middlewares/authenticateToken.js');
const router = express.Router();

// Registro de usuario
router.post('/register', async (req, res) => {
    const { nombre, rol, password } = req.body;
    const existingUser = await User.findOne({ nombre });
    if (existingUser) return res.status(400).json({ message: 'El usuario ya existe' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        nombre,
        rol,
        password: hashedPassword
    });

    try {
        await newUser.save();
        res.status(201).json({ message: 'Usuario registrado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar usuario', error });
    }
});

// Inicio de sesión
router.post('/login', async (req, res) => {
    const { nombre, password } = req.body;
    const user = await User.findOne({ nombre });
    if (!user) return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Usuario o contraseña incorrectos' });

    const token = jwt.sign(
        { id: user._id, nombre: user.nombre, rol: user.rol },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login exitoso', token });
});

// Actualizar contraseña
router.patch('/update-password', authenticateToken, authorizeRoles(['admin', 'user']), async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    try {
        const userId = req.user.id;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) return res.status(400).json({ message: 'La contraseña actual es incorrecta' });

        if (currentPassword === newPassword) {
            return res.status(400).json({ message: 'La nueva contraseña no puede ser igual a la actual' });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;

        await user.save();

        res.status(200).json({ message: 'Contraseña actualizada con éxito' });
    } catch (error) {
        console.error('Error al actualizar la contraseña:', error);
        res.status(500).json({ message: 'Error al actualizar la contraseña', error });
    }
});

module.exports = router;
