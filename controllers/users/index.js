const { ctrlWrapper } = require("../../helpers");

const getCurrentUser = require("./getCurrentUser");
const updateSubscription = require("./updateSubscription");
const updateAvatar = require("./updateAvatar");

module.exports = {
  getCurrentUser: ctrlWrapper(getCurrentUser),
  updateSubscription: ctrlWrapper(updateSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
};
