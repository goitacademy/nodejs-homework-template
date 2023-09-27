class RequestError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

module.exports = RequestError;
