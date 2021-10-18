const validateContact = require("./validation");
const authenticate = require("./authenticate");
const controllerWrapper = require("./controllerWrapper");

module.exports = {
  controllerWrapper,
  validateContact,
  authenticate,
};
