class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class WrongParametrsError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

module.exports = {
  ValidationError,
  WrongParametrsError,
};
