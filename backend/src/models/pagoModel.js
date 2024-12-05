const mongoose = require('mongoose');

const pagoSchema = mongoose.Schema({
    id_transaccion: {
        type: String,
        required: true
    },
    tipo: {
        type: String,
        enum: ['venta', 'renta'],
        required: true,
        lowercase: true
    },
    monto: {
        type: Number,
        required: true
    },
    forma_pago: {
        type: String,
        required: true
    },
    fecha_pago: {
        type: Date,
        required: true,
        default: Date.now
    },
    estado_pago: {
        type: String,
        required: true
    },
    observaciones: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Pagos', pagoSchema);
