const { ctrlWrapper } = require("../../helpers/index.js");

const { updateAvatar } = require("./updateAvatar");

module.exports = {
  updateAvatar: ctrlWrapper(updateAvatar),
};
