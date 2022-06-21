const authMiddleware = require("./authMiddleware");
const validationMiddleware = require("./validationMiddleware");
const uploadMiddleware = require("./uploadMiddleware");

module.exports = {
  authMiddleware,
  validationMiddleware,
  uploadMiddleware,
};
