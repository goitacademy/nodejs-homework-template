const httpStatusCode = require("./httpStatusCode");
const BaseError = require("./baseError");

class HTTP404Error extends BaseError {
  constructor(
    name,
    statusCode = httpStatusCode.NOT_FOUND,
    description = "Not found."
  ) {
    super(name, statusCode, description);
  }
}

module.exports = HTTP404Error;
