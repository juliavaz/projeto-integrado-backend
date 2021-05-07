const CustomError = require('../utils/customError');

const handleValidationError = (err) => {
  let errors = {};
  Object.values(err.errors).map((el) => {
    errors[el.path] = el.message;
  });

  errors = JSON.stringify(errors);

  return new CustomError(errors, 'fail', 400);
};

module.exports = (err, req, res, next) => {
  // TODO: stop logging to console
  console.log(err);

  let error;

  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'fail';

  if (err.name === 'ValidationError') {
    error = handleValidationError(err);

    return res.status(error.statusCode).json({
      status: error.status,
      message: JSON.parse(error.message),
    });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({
      status: 'fail',
      message: 'Invalid request data.',
    });
  }

  if (err.codeName === 'DuplicateKey') {
    return res.status(400).json({
      status: 'fail',
      message: `Duplicate field. ${JSON.stringify(err.keyValue)}`,
    });
  }

  if (err.name === 'JsonWebTokenError') {
    return res.status(400).json({
      status: 'fail',
      message: 'Invalid authentication data.',
    });
  }

  if (err.name === 'SyntaxError') {
    return res.status(400).json({
      status: 'fail',
      message: 'Invalid data.',
    });
  }

  return res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
