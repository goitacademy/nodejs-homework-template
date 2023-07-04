const { ctrlWrapper } = require("../../helpers");

const { updateAvatar } = require("./updateAvatar");

module.exports = {
  updateAvatar: ctrlWrapper(updateAvatar),
};
