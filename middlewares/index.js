const validation = require("./validation");
const updateContactValidation = require("./updateValidation");
const updateFavoriteValidation = require("./updateFavoriteValidation");
const isValidId = require("./isValidId");
const authenticate = require("./authenticate");

module.exports = {
  validation,
  updateContactValidation,
  updateFavoriteValidation,
  isValidId,
  authenticate,
};
