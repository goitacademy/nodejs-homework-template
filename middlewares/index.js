const {
  validateBody,
  validateUpdateBody,
  validateUpdateBodyFavorite,
} = require("./validateBody");
const isValidId = require("./isValidId");
const authenticate = require("./authenticate");
const upload = require("./upload")

module.exports = {
  validateBody,
  validateUpdateBody,
  isValidId,
  validateUpdateBodyFavorite,
  authenticate,
  upload,
};
