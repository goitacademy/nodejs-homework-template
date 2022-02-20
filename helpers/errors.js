class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class WrongIdError extends Error {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

class MissingBodyError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

module.exports = { ValidationError, WrongIdError, MissingBodyError };
