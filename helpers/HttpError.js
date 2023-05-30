const messages = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict"
}


class HttpError extends Error {
  constructor(statusCode, message = messages[statusCode]) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = HttpError;