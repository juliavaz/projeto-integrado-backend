const User = require('../models/userModel');
const factory = require('../utils/factory');

exports.create = factory.create(User);
exports.retrieve = factory.retrieve(User);
exports.retrieveOne = factory.retrieveOne(User);
// DO NOT USE UPDATE USER TO CHANGE THE USER PASSWORD
exports.update = factory.update(User);
exports.delete = factory.delete(User);

exports.adicionaEspecialidade = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userid);

    if (!user) {
      return res.status(200).json({
        status: 'fail',
        message: 'User not found.',
      });
    }

    if (user.role !== 'medico') {
      return res.status(400).json({
        status: 'fail',
        message: 'Apenas medicos possuem especialidade.',
      });
    }

    user.details.especialidade = req.body.especialidade;

    await user.save();

    return res.status(200).json({
      status: 'success',
      data: {
        user: user,
      },
    });
  } catch (err) {
    return next(err);
  }
};

exports.listaEspecialidade = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userid);

    if (!user) {
      return res.status(200).json({
        status: 'fail',
        message: 'User not found.',
      });
    }

    if (user.role !== 'medico') {
      return res.status(400).json({
        status: 'fail',
        message: 'O usuario nao eh medico e portanto nao possui especialidade.',
      });
    }

    return res.status(200).json({
      status: 'success',
      data: {
        especialidade: user.details.especialidade,
      },
    });
  } catch (err) {
    return next(err);
  }
};

exports.removeEspecialidade = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userid);

    if (!user) {
      return res.status(200).json({
        status: 'fail',
        message: 'User not found.',
      });
    }

    user.details.especialidade = undefined;
    await user.save();

    return res.status(200).json({
      status: 'success',
      data: {
        user: user,
      },
    });
  } catch (err) {
    return next(err);
  }
};
