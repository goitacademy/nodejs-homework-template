const {
  createContactValidator,
  updateContactValidator,
  updateStatusContactValidator,
} = require("./contactsValidators");
const isValidId = require("./isValidId");
const { registration, login } = require("./usersValidation");

module.exports = {
  createContactValidator,
  updateContactValidator,
  updateStatusContactValidator,
  registration,
  login,
  isValidId,
};
