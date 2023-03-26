const { ctrlWrapper } = require("../../helpers");

const getCurrent = require("./getCurrent");
const updateSubscription = require("./updateSubscription");
const updateAvatar = require("./updateAvatar");
const resendVerify = require("./resendVerify");
const verifyEmail = require("./verifyEmail");

module.exports = {
  getCurrent: ctrlWrapper(getCurrent),
  updateSubscription: ctrlWrapper(updateSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
  resendVerify: ctrlWrapper(resendVerify),
  verifyEmail: ctrlWrapper(verifyEmail),
};
