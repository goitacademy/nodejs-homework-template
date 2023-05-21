class HttpError extends Error {
  constructor(status, message = messages[status] || messages.default) {
    super(message);
    this.status = status;
  }
}

const messages = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
  default: "Internal Server Error",
};

module.exports = HttpError;
