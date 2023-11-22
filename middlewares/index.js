const isValidId = require("./isValidId");
const validateBody = require("./validateBody");
const authenticate = require("./authenticate");
const { uploadAndProcessAvatar } = require("./upload");

module.exports = {
  isValidId,
  validateBody,
  authenticate,
  uploadAndProcessAvatar,
};
