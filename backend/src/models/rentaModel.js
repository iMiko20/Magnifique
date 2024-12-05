const mongoose = require('mongoose');

const rentaSchema = mongoose.Schema({
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
    fecha_renta: {
        type: Date,
        default: Date.now
    },
    fecha_devolucion_programada: {
        type: Date,
        required: true
    },
    fecha_devolucion_real: {
        type: Date
    },
    cantidad_apartado: {
        type: Number,
        default: 0
    },
    cantidad_pendiente: {
        type: Number,
        default: 0
    },
    ajustes: {
        type: String
    },
    observaciones: {
        type: String
    },
    estado: {
        type: String,
        enum: ['Pendiente', 'Liquidado', 'En progreso'],
        required: true,
        default: 'Pendiente'
    },
    penalizacion: {
        type: Number,
        default: 0
    },
    forma_pago: {
        type: String,
        required: true
    },
    fecha_registro: {
        type: Date,
        default: Date.now
    },
    devuelto: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Renta', rentaSchema);
