const { isBody, validateBody } = require("./validateBody");
const isValidId = require("./isValidId");
const authenticate = require("./authenticate");
const upload = require("./upload");

module.exports = {
  isBody,
  validateBody,
  isValidId,
  authenticate,
  upload,
};
