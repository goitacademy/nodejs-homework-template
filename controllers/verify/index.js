const { ctrlWrapper } = require("../../utils");
const resendEmail = require("./resendEmail");
const verifyEmail = require("./verifyEmail");

module.exports = {
  verifyEmail: ctrlWrapper(verifyEmail),
  resendEmail: ctrlWrapper(resendEmail),
};
