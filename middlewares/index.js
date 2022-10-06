const controllerWrapper = require("./controllerWrapper");
const validation = require("./validation");
const auth = require("./auth");
const upload = require("./uploadAvatar");

module.exports = {
  validation,
  controllerWrapper,
  auth,
  upload,
};
