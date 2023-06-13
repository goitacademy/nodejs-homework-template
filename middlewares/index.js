const validation = require("./validation");
const isValidId = require("./isValidId");
const auth = require("./auth");
const contactsValidation = require("./contactsValidation");
module.exports = {
  isValidId,
  validation,
  auth,
  contactsValidation,
};
