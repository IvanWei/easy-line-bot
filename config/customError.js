const ExtendableError = class ExtendableError extends Error {
  constructor(message, httpStatus) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    this.status = httpStatus;
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = (new Error(message)).stack;
    }
  }
};

module.exports = class CustomError extends ExtendableError {};
