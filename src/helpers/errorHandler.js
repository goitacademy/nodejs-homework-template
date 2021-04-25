class ErrorHandler extends Error {
  constructor(status, message, data = null) {
    super();
    this.status = status;
    this.message = message;
    this.data = data;
  }
}

module.exports = { ErrorHandler };
