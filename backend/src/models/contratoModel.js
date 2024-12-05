const mongoose = require('mongoose');

const contratoSchema = mongoose.Schema({
    id_renta: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Renta",
        required: true
    },
    nombre_cliente: {
        type: String,
        required: true
    },
    numero_identificacion: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    fecha_renta: {
        type: Date,
        required: true
    },
    fecha_devolucion_programada: {
        type: Date,
        required: true
    },
    modelo: {
        type: String,
        required: true
    },
    talla: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true
    },
    precio_renta: {
        type: Number,
        required: true
    },
    costo_reposicion: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Contrato', contratoSchema);
