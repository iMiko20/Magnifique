const Vestido = require('../models/vestidoModel.js');

exports.createVestido = async (req, res) => {
    try {
        const vestido = new Vestido(req.body);
        await vestido.save();
        res.status(201).json(vestido);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el vestido', error });
    }
};

exports.getAllVestidos = async (req, res) => {
    try {
        const vestidos = await Vestido.find();
        res.status(200).json(vestidos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los vestidos', error });
    }
};

exports.getVestidoById = async (req, res) => {
    try {
        const vestido = await Vestido.findById(req.params.id);
        if (!vestido) return res.status(404).json({ message: 'Vestido no encontrado' });
        res.status(200).json(vestido);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el vestido', error });
    }
};

exports.updateVestido = async (req, res) => {
    try {
        const vestido = await Vestido.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!vestido) return res.status(404).json({ message: 'Vestido no encontrado' });
        res.status(200).json(vestido);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el vestido', error });
    }
};

exports.deleteVestido = async (req, res) => {
    try {
        const vestido = await Vestido.findByIdAndDelete(req.params.id);
        if (!vestido) return res.status(404).json({ message: 'Vestido no encontrado' });
        res.status(200).json({ message: 'Vestido eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el vestido', error });
    }
};

exports.Filtro = async (req, res) => {
    const { color, talla, categoria } = req.body;
 
    const query = {};
    if (color) query.color = color;
    if (talla) query.talla = talla;
    if (categoria) query.categoria = categoria;
 
    try {
        const vestidos = await Vestido.find(query);
        res.status(200).json(vestidos);
    } catch (error) {
        console.error("Error en la consulta:", error.message);
        res.status(500).json({ 
            message: "Error al obtener el vestido", 
            error: error.message 
        });
    }
 };

exports.updateDisponibilidad = async (req, res) => {
    try {
        const { id } = req.params;
        const { disponibilidad } = req.body;
        
        const vestido = await Vestido.findByIdAndUpdate(
            id,
            { disponibilidad },
            { new: true }
        );

        if (!vestido) {
            return res.status(404).json({ message: 'Vestido no encontrado' });
        }

        res.status(200).json(vestido);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la disponibilidad del vestido', error });
    }
};
