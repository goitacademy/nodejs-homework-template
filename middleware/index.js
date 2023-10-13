const validateBody = require("./validateContact");
const authMiddleware = require("./auth");

module.exports = {
  validateBody,
  authMiddleware,
};
