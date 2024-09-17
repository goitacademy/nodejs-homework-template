const {
  validateBody,
  validateUpdateBody,
  validateFavorite,
  validateSubscription,
} = require("./validateBody");
const isValidId = require('./isValidId')
const authenticate = require("./authenticate");
const upload=require('./upload')

module.exports = {
  validateBody,
  validateUpdateBody,
  isValidId,
  validateFavorite,
  authenticate,
  validateSubscription,
  upload,
};