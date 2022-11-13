class CustomError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class ValidationError extends CustomError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class WrongParametersError extends CustomError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class RegistrationConflictError extends CustomError {
  constructor(message) {
    super(message);
    this.status = 409;
  }
}

class NotAuthorizedError extends CustomError {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

module.exports = {
  CustomError,
  ValidationError,
  WrongParametersError,
  RegistrationConflictError,
  NotAuthorizedError,
};
