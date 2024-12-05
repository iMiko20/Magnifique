const Renta = require('../models/rentaModel.js');
const Vestido = require('../models/vestidoModel.js');

exports.createRenta = async (req, res) => {
    try {
        const {
            id_vestido,
            nombre_cliente,
            direccion,
            telefono,
            tipo_identificacion,
            numero_identificacion,
            imagen_identificacion,
            fecha_devolucion_programada,
            cantidad_apartado,
            cantidad_pendiente,
            ajustes,
            observaciones,
            estado,
            penalizacion,
            forma_pago
        } = req.body;

        const vestido = await Vestido.findById(id_vestido);
        if (!vestido || vestido.cantidad < 1) {
            return res.status(400).json({ message: 'No hay suficientes vestidos en inventario.' });
        }

        const nuevaRenta = new Renta({
            id_vestido,
            nombre_cliente,
            direccion,
            telefono,
            tipo_identificacion,
            numero_identificacion,
            imagen_identificacion,
            fecha_devolucion_programada,
            cantidad_apartado,
            cantidad_pendiente,
            ajustes,
            observaciones,
            estado,
            penalizacion,
            forma_pago
        });

        const rentaGuardada = await nuevaRenta.save();

        vestido.cantidad -= 1;
        await vestido.save();

        res.status(201).json(rentaGuardada);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la renta', error });
    }
};

exports.getAllRentas = async (req, res) => {
    try {
        const rentas = await Renta.find().populate('id_vestido');
        res.status(200).json(rentas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las rentas', error });
    }
};

exports.getRentaById = async (req, res) => {
    try {
        const renta = await Renta.findById(req.params.id).populate('id_vestido');
        if (!renta) return res.status(404).json({ message: 'Renta no encontrada' });
        res.status(200).json(renta);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la renta', error });
    }
};

exports.updateRenta = async (req, res) => {
    try {
        const {
            devuelto,
            nombre_cliente,
            direccion,
            telefono,
            tipo_identificacion,
            numero_identificacion,
            imagen_identificacion,
            cantidad_apartado,
            cantidad_pendiente,
            ajustes,
            observaciones,
            estado,
            penalizacion,
            forma_pago
        } = req.body;

        const renta = await Renta.findById(req.params.id);
        if (!renta) return res.status(404).json({ message: 'Renta no encontrada' });

        if (nombre_cliente) renta.nombre_cliente = nombre_cliente;
        if (direccion) renta.direccion = direccion;
        if (telefono) renta.telefono = telefono;
        if (tipo_identificacion) renta.tipo_identificacion = tipo_identificacion;
        if (numero_identificacion) renta.numero_identificacion = numero_identificacion;
        if (imagen_identificacion) renta.imagen_identificacion = imagen_identificacion;
        if (cantidad_apartado) renta.cantidad_apartado = cantidad_apartado;
        if (cantidad_pendiente) renta.cantidad_pendiente = cantidad_pendiente;
        if (ajustes) renta.ajustes = ajustes;
        if (observaciones) renta.observaciones = observaciones;
        if (estado) renta.estado = estado;
        if (penalizacion) renta.penalizacion = penalizacion;
        if (forma_pago) renta.forma_pago = forma_pago;

        if (devuelto && !renta.devuelto) {
            const vestido = await Vestido.findById(renta.id_vestido);
            if (vestido) {
                vestido.cantidad += 1;
                await vestido.save();
            }
        }
        renta.devuelto = devuelto;

        const rentaActualizada = await renta.save();
        res.status(200).json(rentaActualizada);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la renta', error });
    }
};

exports.deleteRenta = async (req, res) => {
    try {
        const renta = await Renta.findByIdAndDelete(req.params.id);
        if (!renta) return res.status(404).json({ message: 'Renta no encontrada' });
        res.status(200).json({ message: 'Renta eliminada' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la renta', error });
    }
};

exports.getReport = async (req, res) => {
    try {
        const { startDate, endDate } = req.body;

        if (!startDate || !endDate) {
            return res.status(400).json({ message: 'Por favor, proporciona una fecha de inicio y una fecha de fin.' });
        }

        const rentas = await Renta.find({
            fecha_renta: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            }
        });

        const totalPrecioRenta = rentas.reduce((total, renta) => total + renta.cantidad_apartado + renta.cantidad_pendiente, 0);

        res.status(200).json({
            totalPrecioRenta,
            rentas,
            startDate,
            endDate
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al generar el reporte semanal', error });
    }
};