const { addContactValidate, favoriteUpdate } = require("./contact-validation");
const isValidId = require("./isValidId");
const { validToken } = require("./validate-token");
const upload = require("./upload");

module.exports = {
  addContactValidate,
  isValidId,
  favoriteUpdate,
  validToken,
  upload,
};
