const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.header('Authorization');
    console.log('Authorization header:', authHeader);

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Acceso denegado, token no proporcionado' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token decodificado:', verified);
        req.user = verified;
        next();
    } catch (error) {
        console.error('Error al verificar el token:', error); // Más información del error
        res.status(400).json({ message: 'Token no válido' });
    }
}


module.exports = authenticateToken;
