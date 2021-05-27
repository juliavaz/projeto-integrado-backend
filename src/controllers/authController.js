const { promisify } = require('util');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const CustomError = require('../utils/customError');
const User = require('../models/userModel');
const emailHandler = require('../utils/emailHandler');
const EmailHandler = require('../utils/emailHandler');

// TODO: send jwt token via cookie for improved security.

exports.requireLogin = async (req, res, next) => {
  try {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      const token = req.headers.authorization.split(' ')[1];

      const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

      if (decoded) {
        const user = await User.findOne({ _id: decoded.id, deleted: { $ne: true } }).select('+passwordUpdatedAt');

        if (user) {
          // Check if user has changed its password after the token was issued
          if (!user.passwordChangedAfter(decoded.iat)) {
            req.user = user;
            return next();
          }
        }
      }
    }

    return next(new CustomError('Forbidden. Invalid authentication data.', 'fail', 401));
  } catch (err) {
    return next(err);
  }
};

exports.requireRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new CustomError('Forbidden. You need special permissions to access that resource.', 'fail', 403));
    }
    return next();
  };
};

exports.signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });

    if (user) return next(new CustomError('Email already registered.', 'fail', 400));

    const newUser = await User.create({
      email: email,
      password: password,
    });

    newUser.token = await newUser.createActivationToken();

    const sentEmail = await new EmailHandler(newUser).sendActivationEmail();

    return res.status(201).json({
      status: 'success',
      message: 'Accounted created. Please activate it now by checking the instructions sent to your email address.',
    });
  } catch (err) {
    return next(err);
  }
};

exports.resendActivationToken = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user && user.activated === false) {
      user.activationToken = await user.createActivationToken();

      const sentEmail = await new EmailHandler(user).sendActivationEmail();

      return res.status(200).json({
        status: 'success',
        message: `Activation instructions resent to your email.`,
      });
    }

    return res.status(400).json({
      status: 'fail',
      message: 'Email not registered or account already activated.',
    });
  } catch (err) {
    return next(err);
  }
};

exports.activate = async (req, res, next) => {
  try {
    const encryptedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({ activationToken: encryptedToken });

    if (user) {
      user.activated = true;
      user.save({ runValidators: false });

      return res.status(200).json({
        status: 'success',
        message: 'Accounted activated.',
      });
    }

    return res.status(400).json({
      status: 'fail',
      message: 'Invalid data.',
    });
  } catch (err) {
    return next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email: email,
    }).select('+password');

    if (user && (await user.checkPassword(password, user.password))) {
      if (user.activated !== true) {
        return res.status(200).json({
          status: 'fail',
          message: 'Account has not been activated yet.',
        });
      }

      const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIREIN,
      });

      return res.status(200).json({
        status: 'success',
        data: {
          user: user.id,
          jwtToken: token,
        },
      });
    }

    return next(new CustomError('Invalid credentials.', 'fail', 401));
  } catch (err) {
    return next(err);
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user) {
      user.resetToken = await user.createPasswordResetToken();

      const sentEmail = await new EmailHandler(user).sendPasswordRecoveryEmail();
    }

    res.status(200).json({
      status: 'success',
      message: `If there's an user with the provided email address, a message will be sent with instructions.`,
    });
  } catch (err) {
    return next(err);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const encryptedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({ passwordResetToken: encryptedToken, passwordResetExpires: { $gt: Date.now() } });

    if (user) {
      // Password is encrypted in the model
      user.password = req.body.password;
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;

      await user.save();

      return res.status(200).json({
        status: 'success',
        message: `Password updated successfully.`,
      });
    }

    return next(new CustomError('Invalid data or expired token.', 'fail', 400));
  } catch (err) {
    return next(err);
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('+password');

    if (user && (await user.checkPassword(req.body.password, user.password))) {
      user.password = req.body.newPassword;

      await user.save();

      const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIREIN,
      });

      return res.status(200).json({
        status: 'success',
        message: `Password updated successfully.`,
        data: {
          user: user.id,
          jwtToken: token,
        },
      });
    }

    return next(new CustomError('Invalid credentials.', 'fail', 400));
  } catch (err) {
    return next(err);
  }
};

exports.deleteMe = async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.user.id, { deleted: true });

  return res.status(204).json({
    status: 'success',
    data: null,
  });
};
