class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class WrongPramError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class WrongBodyError extends Error {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}
module.exports = { ValidationError, WrongPramError, WrongBodyError };
