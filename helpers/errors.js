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
    this.status = 409;
  }
}

class NotAuthorizedError extends ContactsApiError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

module.exports = {
  ContactsApiError,
  ValidationError,
  WrongParametersError,
  NotAuthorizedError,
};
