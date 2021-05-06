class CustomError extends Error {
  constructor(message, status, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = status;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = CustomError;
