class CurrentProjectError extends Error {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

class ValidationError extends CurrentProjectError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class WrongParametersError extends CurrentProjectError {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}
class ValidateUserByEmailError extends CurrentProjectError {
  constructor(message) {
    super(message);
    this.status = 409;
  }
}
class AuthError extends CurrentProjectError {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

module.exports = {
  WrongParametersError,
  ValidationError,
  CurrentProjectError,
  ValidateUserByEmailError,
  AuthError,
};
