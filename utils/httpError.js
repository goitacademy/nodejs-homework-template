const httpErrorMessages = require("../const/httpErrorMessages");

class HttpError extends Error {
  constructor(
    statusCode = 500,
    message = httpErrorMessages[statusCode] || httpErrorMessages.default
  ) {
    super(message);
    this.statusCode = statusCode;
  }
}

module.exports = HttpError;
