const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const especialidadeSchema = new mongoose.Schema({
  especialidade: {
    type: String,
    enum: ['Escolha uma especialidade','PEDIATRIA', 'RADIOLOGIA', 'OFTALMOLOGIA', 'ONCOLOGIA', 'DERMATOLOGIA', 'GASTROENTEROLOGIA', 'EPIDEMIOLOGIA'],
    default: 'Escolha uma especialidade',
  },
},
{
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// Virtual Properties
especialidadeSchema.virtual('daysSinceRegistration').get(function () {
  return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24));
});

const Especialidade = mongoose.model('Especialidade', especialidadeSchema);

module.exports = Especialidade;
