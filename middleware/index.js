const authMiddleware = require("./authMiddleware.js");
const { contactJoi, favoriteJoi } = require("./contactValidation.js");
const isValidId = require("./isValidId.js");
const { userJoi, subscriptionJoi } = require("./userValidation.js");
const { validation, validationFavorite } = require("./validation.js");
const errorValidation = require("./errorValidation.js");

module.exports = {
  authMiddleware,
  contactJoi,
  favoriteJoi,
  isValidId,
  userJoi,
  subscriptionJoi,
  validation,
  validationFavorite,
  errorValidation,
};
