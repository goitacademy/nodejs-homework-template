class Error {
  constructor(message, code) {
    this.message = message;
    this.code = code;
  }
}

class HttpError extends Error {
  constructor(message, code) {
    super(message);
    this.message = message;
    this.code = code;
  }
}

module.exports = {
  HttpError,
};
