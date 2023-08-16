const errorMessageList = {
  400: "Validation error",
  401: "Not authorized",
  403: "Forbidden",
  404: "Not found",
  409: "Email in use",
};

class AppError extends Error {
  constructor(status, message = errorMessageList[status]) {
    super(message);
    this.status = status;
  }
}

module.exports = AppError;
