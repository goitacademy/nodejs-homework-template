class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class WrongParametersError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

class Conflict extends Error {
  constructor(message) {
    super(message);
    this.status = 409;
  }
}

module.exports = {
  ValidationError,
  WrongParametersError,
  NotFoundError,
  Conflict,
};
