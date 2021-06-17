const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const especialidadeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Especialidade precisa de um nome.'],
      unique: [true, 'Especialidade ja cadastrada.'],
      lowercase: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Static Methods
especialidadeSchema.statics.getModelName = (type = 'singular') => {
  return type === 'plural' ? 'especialidades' : 'especialidade';
};

const Especialidade = mongoose.model('Especialidade', especialidadeSchema);

module.exports = Especialidade;
