class validationError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class wrongParametersError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

module.exports = {
  validationError,
  wrongParametersError,
};
