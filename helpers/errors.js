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

class RegistrationConflictError extends Error {
  constructor(message) {
    super(message);
    this.status = 409;
  }
}

class NotAuthorizwdError extends Error {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

module.exports = {
  ValidationError,
  WrongParametersError,
  RegistrationConflictError,
  NotAuthorizwdError,
};
