const User = require('../models/userModel');
const factory = require('../utils/factory');

exports.create = factory.create(User);
exports.retrieve = factory.retrieve(User);
exports.retrieveOne = factory.retrieveOne(User);
// DO NOT USE UPDATE USER TO CHANGE THE USER PASSWORD
exports.update = factory.update(User);
exports.delete = factory.delete(User);
