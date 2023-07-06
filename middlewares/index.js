const validateId = require("./validateId");
const validateBody = require("./validateBody");
const validateFavorite = require("./validateFavorite");
const validateUser = require("./validateUser");
const protect = require("./protect");
const validateSubscription = require("./validateSubscription");
const upload = require("./upload");
const validateEmail = require('./validateEmail')

module.exports = {
  validateId,
  validateBody,
  validateFavorite,
  validateUser,
  protect,
  validateSubscription,
  upload,
  validateEmail
};
