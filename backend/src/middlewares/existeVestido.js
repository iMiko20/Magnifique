const Vestido = require('../models/vestidoModel.js');

const checkVestido = async (req, res, next) => {
    const { id_vestido } = req.body;

    try {
        const vestido = await Vestido.findById(id_vestido);
        if (!vestido) return res.status(404).json({ message: 'Vestido no encontrado' });

        next();
    } catch (error) {
        res.status(500).json({ message: 'Error al verificar el vestido', error });
    }
};

module.exports = checkVestido;