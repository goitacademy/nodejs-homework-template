const httpStatusCode = require("./httpStatusCode");
const BaseError = require("./baseError");

class HTTP401Error extends BaseError {
  constructor(
    name,
    statusCode = httpStatusCode.UNAUTHORIZED,
    description = "Unauthorized"
  ) {
    super(name, statusCode, description);
  }
}

module.exports = HTTP401Error;
