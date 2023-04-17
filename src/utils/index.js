const controllerWrapper = require("./controllerWrapper");
const { validatePostBody, validatePutBody } = require("./validateBody");

module.exports = {
  controllerWrapper,
  validatePostBody,
  validatePutBody,
};
