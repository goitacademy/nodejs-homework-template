const {
  validateBody,
  validateUpdateBody,
  validateUpdateBodyFavorite,
} = require("./validateBody");
const isValidId = require("./isValidId");
const authenticate = require("./authenticate");

module.exports = {
  validateBody,
  validateUpdateBody,
  isValidId,
  validateUpdateBodyFavorite,
  authenticate,
};
