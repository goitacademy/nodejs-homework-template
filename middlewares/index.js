const authenticate = require("./authenticate");
const validateBody = require("./bodyValidation");
const upload = require("./upload");

module.exports = {
  authenticate, 
  validateBody,
  upload,
}