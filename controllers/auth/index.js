const { cntrlWrapper } = require("../../helpers");

module.exports = {
  register: cntrlWrapper(require("./register")),
  login: cntrlWrapper(require("./login")),
  getCurrentUser: cntrlWrapper(require("./getCurrentUser")),
  logout: cntrlWrapper(require("./logout")),
  updateSubscription: cntrlWrapper(require("./updateSubscription")),
  updateAvatar: cntrlWrapper(require("./updateAvatar")),
};
