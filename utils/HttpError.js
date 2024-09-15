const httpErrorMessages = require("../constants/httpErrorMessages")

class HttpError extends Error {
  constructor(
    status = 500,
    message = httpErrorMessages[status] || httpErrorMessages.default
  ) {
    super(message);
    this.status = status;
    this.name = "HttpError";
  }
}

module.exports = HttpError;
