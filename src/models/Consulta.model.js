const mongoose = require('mongoose');

const { model, Schema } = mongoose;

const consultaSchema = new Schema(
  {
    // here goes the attributes
    id: { type: String, required: true },
  },
  {
    // name of consulta's collection
    collection: 'consulta',
  }
);

const Consulta = model('Consulta', consultaSchema);

module.exports = Consulta;
