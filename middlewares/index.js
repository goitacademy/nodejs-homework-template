const authenticate = require("./authenticate");
const validateBody = require("./validateBody");
const upload = require("./upload");

module.exports = {
  validateBody,
  authenticate,
  upload,
};
