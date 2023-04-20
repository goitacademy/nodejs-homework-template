const validateCreateContact = require("./validateCreateContact");
const validateUpdateContact = require("./validateUpdateContact");
const validateUpdateStatusContact = require("./validateUpdateStatusContact");
const isValidId = require("./validateId");
const authenticate = require("./authenticate");
const validateAuthBody = require("./validateAuthBody");
const upload = require("./upload");

module.exports = {
  validateCreateContact,
  validateUpdateContact,
  validateUpdateStatusContact,
  isValidId,
  authenticate,
  validateAuthBody,
  upload,
};
