const Pago = require('../models/pagoModel.js');
const Renta = require('../models/rentaModel.js');
const Venta = require('../models/ventaModel.js');

exports.createPago = async (req, res) => {
    try {
        const { id_transaccion, monto, forma_pago, estado_pago, observaciones } = req.body;

        // Verifica que los campos obligatorios estén presentes
        if (!id_transaccion || !monto || !forma_pago || !estado_pago || !observaciones) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        let tipo;

        // Busca el id_transaccion en la colección de rentas
        const renta = await Renta.findById(id_transaccion);
        if (renta) {
            tipo = 'renta';
        } else {
            // Si no está en rentas, busca en ventas
            const venta = await Venta.findById(id_transaccion);
            if (venta) {
                tipo = 'venta';
            } else {
                // Si no se encuentra en ninguna colección, lanza un error
                return res.status(400).json({ message: 'El id_transaccion no corresponde a ninguna renta o venta válida' });
            }
        }

        // Crea el pago con el tipo detectado
        const pago = new Pago({
            id_transaccion,
            tipo,
            monto,
            forma_pago,
            estado_pago,
            observaciones,
        });

        // Guarda el pago en la base de datos
        await pago.save();
        res.status(201).json(pago);

    } catch (error) {
        res.status(500).json({ message: 'Error al crear el pago', error });
    }
};

exports.getAllPagos = async (req, res) => {
    try {
        const pagos = await Pago.find();
        res.status(200).json(pagos);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los pagos', error });
    }
};

exports.getPagoById = async (req, res) => {
    try {
        const pago = await Pago.findById(req.params.id);
        if (!pago) return res.status(404).json({ message: 'Pago no encontrado' });
        res.status(200).json(pago);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el pago', error });
    }
};

exports.updatePago = async (req, res) => {
    try {
        const pago = await Pago.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!pago) return res.status(404).json({ message: 'Pago no encontrado' });
        res.status(200).json(pago);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el pago', error });
    }
};

exports.deletePago = async (req, res) => {
    try {
        const pago = await Pago.findByIdAndDelete(req.params.id);
        if (!pago) return res.status(404).json({ message: 'Pago no encontrado' });
        res.status(200).json({ message: 'Pago eliminado' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el pago', error });
    }
};
