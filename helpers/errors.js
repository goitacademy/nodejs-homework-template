class ValidationError extends Error {
    constructor(message = 'Validation error. Check all filds') {
    super(message);
    this.status = 400;
  }
}

class BadRequest extends Error {
  constructor(message = 'Not Found') {
    super(message);
    this.status = 400;
  }
}

class NotFound extends Error {
  constructor(message = "Not found") {
    super(message);
    this.status = 404;
  }
}

module.exports = {
  ValidationError,
  BadRequest,
  NotFound,
};
