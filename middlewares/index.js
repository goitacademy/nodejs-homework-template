const { validation } = require("./validation");
const {validationFavorite} = require("./validationFavorite");
const ctrlWrapper = require("./ctrlWrapper");
const isValidId = require("./isValidId");
const authenticate = require("./authenticate");

module.exports = {
  validation,
  validationFavorite,
  ctrlWrapper,
  isValidId,
  authenticate,
};
