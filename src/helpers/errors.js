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

class RegistrationConflictError extends contactsBookErrors {
  constructor(message) {
    super(message);
    this.status = 409;
  }
}

class UnauthorizeError extends contactsBookErrors {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

module.exports = {
  contactsBookErrors,
  ValidationError,
  NotFoundContact,
  RegistrationConflictError,
  UnauthorizeError,
};
