const crypto = require('crypto');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { NOMEM } = require('dns');
const { copyFile } = require('fs');

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
medicoSchema.virtual('daysSinceRegistration').get(function () {
    return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24));
});


const Medico = mongoose.model('Medico', medicoSchema);

module.exports = Medico;
