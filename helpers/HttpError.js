module.exports = class HttpError extends Error {
  status;

  constructor(status, message) {
    super(message);
    this.status = status;
  }

  static UnauthorizedError() {
    return new HttpError(401, "Missing authorization token.");
  }

  static BadRequest(message = "Bad Request") {
    return new HttpError(400, message);
  }

  static ForbiddenError() {
    return new HttpError(403, "Forbidden.");
  }

  static NotFoundError() {
    return new HttpError(404, "Not Found.");
  }
};
