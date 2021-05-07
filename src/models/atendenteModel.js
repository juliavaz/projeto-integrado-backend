const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const atendenteSchema = new mongoose.Schema({
    matricula:{

    },
    nome:{

    },
    cpf:{

    },
    dataNascimento:{

    }
},
{
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// Virtual Properties
atendenteSchema.virtual('daysSinceRegistration').get(function () {
  return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24));
});

const Atendente = mongoose.model('Atendente', atendenteSchema);

module.exports = Atendente;
