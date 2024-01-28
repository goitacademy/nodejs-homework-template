const authMiddleware = require("./authMiddleware");
const idValidation = require("./idValidation");
const reqValidation = require("./reqValidation");
const avatarMiddleware = require("./avatarMiddleware");

module.exports = {
  authMiddleware,
  idValidation,
  reqValidation,
  avatarMiddleware,
};
