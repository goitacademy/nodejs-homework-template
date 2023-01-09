class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class NotFound extends Error {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

module.exports = {
  ValidationError,
  BadRequest,
  NotFound,
};
