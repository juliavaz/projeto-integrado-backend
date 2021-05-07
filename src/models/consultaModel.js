const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const consultaSchema = new mongoose.Schema({
     
},
{
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// Virtual Properties
consultaSchema.virtual('daysSinceRegistration').get(function () {
  return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24));
});

const Consulta = mongoose.model('Consulta', consultaSchema);

module.exports = Consulta;
