const validateBody = require("./validateBody");
const isValidId = require("./isValidId");
const dontBody = require("./dontBody");
const authenticate = require("./autorization");
const uploadAvatar = require("./uploadAvatar");
module.exports = {
  validateBody,
  isValidId,
  dontBody,
  authenticate,
  uploadAvatar,
};
