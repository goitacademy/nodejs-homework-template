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

class DuplicationEmailError extends Error {
  constructor(message) {
    super(message);
    this.status = 409;
  }
}

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

module.exports = {
  ValidationError,
  WrongIdError,
  DuplicationEmailError,
  UnauthorizedError,
};
