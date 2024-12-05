const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    rol: {
        type: String,
        enum: ['admin', 'user'],
        required: true,
        lowercase: true
    },
    password: {
        type: String,   
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);
