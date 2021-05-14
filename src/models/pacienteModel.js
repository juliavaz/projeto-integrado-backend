const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const pacienteSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, 'Nome is a required field.'],
        unique: true,
        trim: true,
        lowercase: true,        
    },
    endereco: {
        type: String,
        required: [true, 'Endereço is a required field.'],
        unique: true,
        trim: true,
        lowercase: true,
    },
    cpf: {
        type: String,
        required: [true, 'CPF is a required field.'],
        unique: true,
        trim: true,
        length: [11, 'CPF must be 11 characters long.'],
        validate: {
            validator: function (v) {
              const cpfRegex = /^\d{3}.?\d{3}.?\d{3}-?\d{2}$|[0-9]{11}/;
              return cpfRegex.test(v.toLowerCase());
            },
            message: 'A valid CPF is required.',
        },
    }, 
    dataNascimento: {
        type: Date,
        required: [true, 'Data de Nascimento is a required field.'],

    }},
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
);

// Virtual Properties
pacienteSchema.virtual('daysSinceRegistration').get(function () {
    return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24));
});
 
const Paciente = mongoose.model('Paciente', pacienteSchema);

module.exports = Paciente;