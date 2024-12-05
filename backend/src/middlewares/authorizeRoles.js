function authorizeRoles(roles) {
    return (req, res, next) => {
        if (!roles.includes(req.user.rol)) {
            return res.status(403).json({ message: 'Acceso denegado, rol no autorizado' });
        }
        next();
    };
}

module.exports = authorizeRoles;