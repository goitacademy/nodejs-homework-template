const { ctrlWrapper } = require("../../helpers");

const getCurrent = require("./getCurrent");
const updateSubscription = require("./updateSubscription");

module.exports = {
  getCurrent: ctrlWrapper(getCurrent),
  updateSubscription: ctrlWrapper(updateSubscription),
};
