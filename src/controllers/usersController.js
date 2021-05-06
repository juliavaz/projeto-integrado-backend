const User = require('../models/userModel');

exports.create = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });

    if (user) return next(new CustomError('Email already registered.', 'fail', 400));

    const newUser = await User.create(req.body);

    return res.status(201).json({
      status: 'success',
      data: {
        id: newUser.id,
      },
    });
  } catch (err) {
    return next(err);
  }
};

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
    const user = await User.findById(req.params.id);

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

exports.update = async (req, res, next) => {};

exports.delete = async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, { deleted: true });

  return res.status(204).json({
    status: 'success',
    data: null,
  });
};
