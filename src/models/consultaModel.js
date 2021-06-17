const mongoose = require('mongoose');

const consultaSchema = new mongoose.Schema(
  {
    paciente: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    medico: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    data: {
      type: Date,
      required: [true, 'Nao pode existir consulta sem data.'],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Static Methods
consultaSchema.statics.getModelName = (type = 'singular') => {
  return type === 'plural' ? 'consultas' : 'consulta';
};

consultaSchema.pre(/^find/, function (next) {
  this.populate('medico').populate('paciente');
  next();
});

const Consulta = mongoose.model('Consulta', consultaSchema);

module.exports = Consulta;
