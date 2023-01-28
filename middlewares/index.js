const { global_error_handler } = require("./global_error_handler.middleware");
const { validate_body } = require("./validate_body.middleware");

module.exports = {
  global_error_handler,
  validate_body,
};
