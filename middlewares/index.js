const validation = require("./validation");
const updateContactValidation = require("./updateValidation");
const updateFavoriteValidation = require("./updateFavoriteValidation");
const isValidId = require("./isValidId");
const authenticate = require("./authenticate");
const updateSubscriptionValidation = require("./updateSubscriptionValidation");
const isUserValidId = require("./isUserValidId");
const upload = require("./upload");
module.exports = {
  validation,
  updateContactValidation,
  updateFavoriteValidation,
  isValidId,
  authenticate,
  updateSubscriptionValidation,
  isUserValidId,
  upload,
};
