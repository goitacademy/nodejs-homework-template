class MissingFieldsError extends Error {
  constructor(status, message) {
    super(message);
    this.name = "MissingFieldsError";
    this.status = status || 400;
    this.message = message || `Missing required fields`;
  }
}

module.exports = MissingFieldsError;
