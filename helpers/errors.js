class ApiErrors extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class ValidationError extends ApiErrors {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

module.exports = {
  ApiErrors,
  ValidationError,
};
