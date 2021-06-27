class contactsBookErrors extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}
class ValidationError extends contactsBookErrors {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class NotFoundContact extends contactsBookErrors {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

class RegistrationValidationError extends contactsBookErrors {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class RegistrationConflictError extends contactsBookErrors {
  constructor(message) {
    super(message);
    this.status = 409;
  }
}

module.exports = {
  contactsBookErrors,
  ValidationError,
  NotFoundContact,
  RegistrationValidationError,
  RegistrationConflictError,
};
