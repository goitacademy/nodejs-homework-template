const { checkFieldInContact, checkIdInContact } = require("./checkMiddleware");
const {
  addContactValidation,
  updateContactValidation,
} = require("./validationMiddleware");

module.exports = {
  checkFieldInContact,
  checkIdInContact,
  addContactValidation,
  updateContactValidation,
};
