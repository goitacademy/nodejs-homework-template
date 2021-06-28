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
// error validation
// class RegistrationValidationError extends contactsBookErrors {
//   constructor(message) {
//     super(message);
//     this.status = 400;
//   }
// }

class RegistrationConflictError extends contactsBookErrors {
  constructor(message) {
    super(message);
    this.status = 409;
  }
}
// error validation
// class LoginValidationError extends contactsBookErrors {
//   constructor(message) {
//     super(message);
//     this.status = 400
//   }
// }

class LoginAuthError extends contactsBookErrors {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

class MiddlewareUnauthorizedError extends contactsBookErrors {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

class LogoutUnauthorizeError extends contactsBookErrors {
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
  LoginAuthError,
  MiddlewareUnauthorizedError,
  LogoutUnauthorizeError,
};
