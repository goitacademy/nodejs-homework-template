const httpStatusCode = require("./httpStatusCode");
const BaseError = require("./baseError");

class HTTP400Error extends BaseError {
  constructor(
    name,
    statusCode = httpStatusCode.BAD_REQUEST,
    description = "Not found."
  ) {
    super(name, statusCode, description);
  }
}

module.exports = HTTP400Error;
