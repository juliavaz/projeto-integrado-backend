const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const especialidadeSchema = new mongoose.Schema({
  especialidade: {
    type: String,
    enum: ['CLÍNICA GERAL', 'PEDIATRIA', 'RADIOLOGIA', 'OFTALMOLOGIA', 'ONCOLOGIA', 'DERMATOLOGIA', 'GASTROENTEROLOGIA', 'EPIDEMIOLOGIA'],
    default: 'CLÍNICA GERAL',
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
