const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const especialidadeSchema = new mongoose.Schema(
  {
    especialidade: {
      name: {
        type: String,
        required: [true, 'Especialidade precisa de um nome.']
      },
      description: {
        type: String,
        required: [true, 'Especialidade precisa de uma descrição']
      },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual Properties

const Especialidade = mongoose.model('Especialidade', especialidadeSchema);

module.exports = Especialidade;
