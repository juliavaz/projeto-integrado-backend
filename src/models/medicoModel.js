const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const medicoSchema = new mongoose.Schema({
    CRM:{

    },
    matricula:{

    },
    nome:{

    },
    endereco:{

    },
    cpf:{

    },
    dataNascimento:{

    },
    especialidade:{

    }
},
{
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// Virtual Properties

const Medico = mongoose.model('Medico', medicoSchema);

module.exports = Medico;
