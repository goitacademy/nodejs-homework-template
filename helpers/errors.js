class ValidationError extends GoIt26NodeError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

module.exports = {
  ValidationError,
};
