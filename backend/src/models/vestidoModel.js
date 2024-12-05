const mongoose = require('mongoose');

const vestidoSchema = mongoose.Schema({
    modelo: {
        type: String,
        required: true
    },
    talla: {
        type: String,
        required: true,
        index: true
    },
    color: {
        type: String,
        required: true,
        index: true
    },
    marca: {
        type: String,
        required: true
    },
    precio_renta: {
        type: Number,
        required: true,
        index: true
    },
    precio_venta: {
        type: Number,
        required: true
    },
    costo_reposicion: {
        type: Number,
        required: true
    },
    proveedor: {
        type: String,
        required: true
    },
    imagen: {
        type: String,
        required: true
    },
    cantidad: {
        type: Number,
        required: true,
        default: 1
    },
    categoria: {
        type: String,
        required: true,
        index: true
    },
    estado: {
        type: String,
        enum: ['Nuevo', 'Usado'],
        required: true
    },
    disponibilidad: {
        type: Boolean,
        default: true
    },
    fecha_registro: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Vestido', vestidoSchema);