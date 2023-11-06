const {
  signup,
  signin,
  getCurrent,
  signout,
  updateAvatar,
} = require("./auth-controller");

module.exports = { signup, signin, getCurrent, signout, updateAvatar };
