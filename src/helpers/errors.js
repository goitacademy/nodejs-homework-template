class noteError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}
class ValidationError extends noteError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class WrongParametersError extends noteError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

module.exports = {
  noteError,
  ValidationError,
  WrongParametersError,
};
