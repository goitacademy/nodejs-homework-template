const { validateCreateContact } = require("./validateCreateContact");
const { validateUpdateContact } = require("./validateUpdateContact");
const {
  validateUpdateStatusContact,
} = require("./validateUpdateStatusContact");
// const { handleMongooseError } = require("./handleMongooseError");

module.exports = {
  validateCreateContact,
  validateUpdateContact,
  validateUpdateStatusContact,
  // handleMongooseError,
};
