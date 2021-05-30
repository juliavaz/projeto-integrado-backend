const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const especialidadeSchema = new mongoose.Schema({
  especialidade: {
    type: String,
    name: String,
    description: String
  },
},
{
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// Virtual Properties

const Especialidade = mongoose.model('Especialidade', especialidadeSchema);

module.exports = Especialidade;
