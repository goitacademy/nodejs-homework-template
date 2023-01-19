const validation = require("./validation");
const { controllerWrapper, errorHandler } = require("./ctrlWrapper");
const auth = require("./auth");
const upload = require("./upload");

module.exports = {
  validation,
  controllerWrapper,
  errorHandler,
  auth,
  upload,
};
