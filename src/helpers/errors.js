class ContactsApiError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class ValidationError extends ContactsApiError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class WrongParametersError extends ContactsApiError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class NotAuthorizedError extends ContactsApiError {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

class ConflictdError extends ContactsApiError {
  constructor(message) {
    super(message);
    this.status = 409;
  }
}

module.exports = {
  ContactsApiError,
  ValidationError,
  WrongParametersError,
  NotAuthorizedError,
  ConflictdError,
};
