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

const Consulta = mongoose.model('Consulta', consultaSchema);

module.exports = Consulta;
