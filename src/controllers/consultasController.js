const Consulta = require('../models/consultaModel');
const factory = require('../utils/factory');

exports.create = factory.create(Consulta);
exports.retrieve = factory.retrieve(Consulta);
exports.retrieveOne = factory.retrieveOne(Consulta);
exports.update = factory.update(Consulta);
exports.delete = factory.delete(Consulta);
