class ParentsValidationError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class ValidationError extends ParentsValidationError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class WrongPramError extends ParentsValidationError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class WrongBodyError extends ParentsValidationError {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

class AuthConflictError extends ParentsValidationError {
  constructor(message) {
    super(message);
    this.status = 409;
  }
}
class NoAuthorizedError extends ParentsValidationError {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}
module.exports = {
  ParentsValidationError,
  ValidationError,
  WrongPramError,
  WrongBodyError,
  AuthConflictError,
  NoAuthorizedError,
};
