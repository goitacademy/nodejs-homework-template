const auth = require("./auth");
const {
  addContactValidation,
  authValidation,
  favoriteValidation,
} = require("./validationMiddleware");
const ctrlWrapper = require("./ctrlWrapper");

module.exports = {
  auth,
  addContactValidation,
  authValidation,
  favoriteValidation,
  ctrlWrapper,
};
