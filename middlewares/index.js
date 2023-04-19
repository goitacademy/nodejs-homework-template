const { isBody, validateBody } = require("./validateBody");
const isValidId = require("./isValidId");
const authenticate = require("./authenticate");
const checkOwnership = require("./checkOwnership");

module.exports = {
  isBody,
  validateBody,
  isValidId,
  authenticate,
  checkOwnership,
};
