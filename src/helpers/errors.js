class ClientError extends Error {
  constructor(message) {
    super(message)
    this.status = 400
  }
}

class ValidationError extends ClientError {
  constructor(message) {
    super(message)
    this.status = 400
  }
}

class WrongParametersError extends ClientError {
 constructor(message) {
    super(message)
    this.status = 400
  }
}

class NotAuthorizedError extends ClientError {
  constructor(message) {
    super(message)
    this.status = 401;
  }
}

class RegistrationConflictError extends ClientError {
  constructor(message) {
    super(message)
    this.status = 409;
  }
}

class NotVarifiedError extends ClientError {
  constructor(message) {
    super(message)
    this.status = 404;
  }
}

class AlreadyVarifiedError extends ClientError {
  constructor(message) {
    super(message)
    this.status = 400;
  }
}

module.exports = {
  ClientError,
  ValidationError,
  WrongParametersError,
  NotAuthorizedError,
  RegistrationConflictError,
  NotVarifiedError,
  AlreadyVarifiedError
}