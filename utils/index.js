const validator = require("./validator");
const funcHandler = require("./funcHandler");
const handleError = require("./handleError");
const mongoSwerverError = require("./mongoSwerverError");
const mailSender = require("./mailSender");

module.exports = {
  validator,
  funcHandler,
  handleError,
  mongoSwerverError,
  mailSender,
};
