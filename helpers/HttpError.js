const errorMessageList = {
  400: "Bad request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not found",
  409: "Conflict",
};

class HttpError {
  constructor(status, message = errorMessageList[status]) {
    this.status = status;
    this.message = message;
  }
}

module.exports = { HttpError };
