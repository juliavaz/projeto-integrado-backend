const User = require('../models/userModel');

exports.create = (req, res, next) => {};

exports.retrieve = async (req, res, next) => {
  try {
    const users = await User.find({});

    return res.status(200).json({
      status: 'success',
      data: {
        users: users,
      },
    });
  } catch (err) {
    return next(err);
  }
};

exports.retrieveOne = async (req, res, next) => {
  try {
    const user = await User.findById({ id: req.params.id });

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

exports.update = (req, res, next) => {};

exports.delete = (req, res, next) => {};
