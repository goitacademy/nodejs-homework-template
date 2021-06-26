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

module.exports = {
  contactsBookErrors,
  ValidationError,
  NotFoundContact
};
