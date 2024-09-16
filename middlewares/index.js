const validateBody = require("./validateBody");
const isValidId = require("./isValidId");
const authenticate = require("./authenticate");
const upload = require("./upload");
const resizeAvatar = require("./resizeAvatar");
const isSingleFileExist = require("./isSingleFileExist");

module.exports = {
  validateBody,
  isValidId,
  authenticate,
  upload,
  resizeAvatar,
  isSingleFileExist,
};
