module.exports = class HttpError extends Error {
  status;
  errors;

  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError() {
    return new HttpError(401, "Missing authorization token.");
  }

  static BadRequest(message = "Bad Request", errors = []) {
    return new HttpError(400, message, errors);
  }

  static ForbiddenError() {
    return new HttpError(403, "Forbidden.");
  }

  static NotFoundError() {
    return new HttpError(404, "Not Found.");
  }

  static ServerError() {
    return new HttpError(500, "Server error.");
  }
};
