class ValidationErrror extends Error {
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

class NotAuthorizedError extends Error {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

class ConflictExistingEmailError extends Error {
  constructor(message) {
    super(message);
    this.status = 409;
  }
}

class MissingFieldsError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

module.exports = {
  ValidationErrror,
  WrongParametersError,
  MissingFieldsError,
  NotAuthorizedError,
  ConflictExistingEmailError,
};
