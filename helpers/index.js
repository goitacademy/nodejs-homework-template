const configImg = require("./configImg");
const ctrlWrapper = require("./ctrlWrapper");
const handleSaveErrors = require("./handleSaveErrors");
const RequestError = require("./RequestError");
const sendEmail = require("./sendEmail");
const createVerifyEmail = require("./createVerifyEmail");

module.exports = {
  configImg,
  ctrlWrapper,
  handleSaveErrors,
  RequestError,
  sendEmail,
  createVerifyEmail,
};
