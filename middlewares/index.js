const auth = require("./auth");
const {
  addContactValidation,
  authValidation,
  favoriteValidation,
} = require("./validationMiddleware");
const ctrlWrapper = require("./ctrlWrapper");
const upload = require("./upload");


module.exports = {
  auth,
  addContactValidation,
  authValidation,
  favoriteValidation,
  ctrlWrapper,
  upload,
};
