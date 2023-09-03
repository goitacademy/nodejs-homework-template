const { validateBody, validateBodyFavorite } = require("./validateBody");
const isValidId = require("./isValidId");
const authenticate = require("./authenticate");
module.exports = {
  validateBody,
  validateBodyFavorite,
  isValidId,
  authenticate,
};
