const controllerWrapper = require("./controllerWrapper");
const { validatePostBody, validatePutBody } = require("./validateBody");
const handleMongooseError = require('./handleMongooseError');
const validateId = require('./validateId');

module.exports = {
  controllerWrapper,
  validatePostBody,
  validatePutBody,
  handleMongooseError,
  validateId,
};
