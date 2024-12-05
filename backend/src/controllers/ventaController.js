const Venta = require('../models/ventaModel.js');

exports.createVenta = async (req, res) => {
    try {
        const venta = new Venta(req.body);
        await venta.save();
        res.status(201).json(venta);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la venta', error });
    }
};

exports.getAllVentas = async (req, res) => {
    try {
        const ventas = await Venta.find().populate('id_vestido');
        res.status(200).json(ventas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las ventas', error });
    }
};

exports.getVentaById = async (req, res) => {
    try {
        const venta = await Venta.findById(req.params.id).populate('id_vestido');
        if (!venta) return res.status(404).json({ message: 'Venta no encontrada' });
        res.status(200).json(venta);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la venta', error });
    }
};

exports.updateVenta = async (req, res) => {
    try {
        const venta = await Venta.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!venta) return res.status(404).json({ message: 'Venta no encontrada' });
        res.status(200).json(venta);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la venta', error });
    }
};

exports.deleteVenta = async (req, res) => {
    try {
        const venta = await Venta.findByIdAndDelete(req.params.id);
        if (!venta) return res.status(404).json({ message: 'Venta no encontrada' });
        res.status(200).json({ message: 'Venta eliminada' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la venta', error });
    }
};
