const { validateBody } = require("./validateBody");
const isValidId = require("./isValidId");
const authenticate = require("./authenticate");
const upload = require("./upload");
const resizeAvatar = require("./resizeAvatar");
const isFile = require("./isFile");

module.exports = {
  validateBody,
  isValidId,
  authenticate,
  upload,
  resizeAvatar,
  isFile,
};