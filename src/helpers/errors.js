class ContactsBookError extends Error {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

class ValidationError extends ContactsBookError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class RegistrationConflictError extends ContactsBookError {
  constructor(message) {
    super(message);
    this.status = 409;
  }
}

class UnauthorizedError extends ContactsBookError {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

module.exports = {
  ContactsBookError,
  ValidationError,
  RegistrationConflictError,
  UnauthorizedError,
};
