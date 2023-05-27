const { ctrlWrapper } = require("../../helpers");

const getCurrentUser = require("./getCurrentUser");
const updateSubscription = require("./updateSubscription");

module.exports = {
  getCurrentUser: ctrlWrapper(getCurrentUser),
  updateSubscription: ctrlWrapper(updateSubscription),
};
