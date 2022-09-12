class CurrentProjectError extends Error {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

class ValidationError extends CurrentProjectError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class WrongParametersError extends CurrentProjectError {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

module.exports = {
  WrongParametersError,
  ValidationError,
  CurrentProjectError,
};
