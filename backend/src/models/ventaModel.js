const mongoose = require('mongoose');

const ventaSchema = mongoose.Schema({
    id_vestido: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vestido',
        required: true
    },
    nombre_cliente: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    tipo_identificacion: {
        type: String,
        required: true
    },
    numero_identificacion: {
        type: String,
        required: true
    },
    imagen_identificacion: {
        type: String,
        required: true
    },
    precio_venta: {
        type: Number,
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    },
    forma_pago: {
        type: String,
        required: true
    },
    fecha_venta: {
        type: Date,
        required: true,
        default: Date.now
    },
    fecha_registro: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Venta', ventaSchema);
