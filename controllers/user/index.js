const { ctrlWrapper } = require("../../Helpers");

const { updateAvatar } = require("./updateAvatar");

module.exports = {
  updateAvatar: ctrlWrapper(updateAvatar),
};
