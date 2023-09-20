const { addContactValidate, favoriteUpdate } = require("./contact-validation");
const isValidId = require("./isValidId");
const { validToken } = require("./validate-token");

module.exports = {
  addContactValidate,
  isValidId,
  favoriteUpdate,
  validToken,
};
