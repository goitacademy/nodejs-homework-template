class HttpError {
  constructor(status, message) {
    this.message = message;
    this.status = status;
  }
}

module.exports = { HttpError };
