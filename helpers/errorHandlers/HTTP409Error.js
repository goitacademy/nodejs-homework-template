const httpStatusCode = require("./httpStatusCode");
const BaseError = require("./baseError");

class HTTP409Error extends BaseError {
  constructor(
    name,
    statusCode = httpStatusCode.CONFLICT,
    description = "Email in use."
  ) {
    super(name, statusCode, description);
  }
}

module.exports = HTTP409Error;
