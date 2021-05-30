const Especialidade = require('../models/especialidadeModel');
const factory = require('../utils/factory');

exports.create = factory.create(Especialidade);
exports.retrieve = factory.retrieve(Especialidade);
exports.retrieveOne = factory.retrieveOne(Especialidade);
exports.update = factory.update(Especialidade);
exports.delete = factory.delete(Especialidade);
