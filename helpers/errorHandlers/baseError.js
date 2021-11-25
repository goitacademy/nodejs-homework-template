class BaseError extends Error {
  constructor(name, statusCode, description) {
    super(description);

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.statusCode = statusCode;
    Error.captureStackTrace(this);
  }
}

module.exports = BaseError;
