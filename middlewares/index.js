const {
  validateBody,
  validateUpdateBody,
  validateFavorite,
} = require("./validateBody");
const isValidId = require('./isValidId')

module.exports = {
  validateBody,
  validateUpdateBody,
  isValidId,
  validateFavorite,
};