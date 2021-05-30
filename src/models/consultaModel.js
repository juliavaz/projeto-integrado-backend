const mongoose = require('mongoose');

const consultaSchema = new mongoose.Schema(
  {
      paciente: String,
      medico: String,
      appointmentDate: Date,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual Properties

const Consulta = mongoose.model('Consulta', consultaSchema);

module.exports = Consulta;
