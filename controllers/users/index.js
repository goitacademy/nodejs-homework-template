const { getCurrent } = require("./getCurrent");
const { login } = require("./login");
const { logout } = require("./logout");
const { register } = require("./register");
const { updateStatusUser } = require("./updateStatusUser");
const { UpdateAvatarURL } = require("./UpdateAvatarURL");
const { verify } = require("./verify");
const { resendVerify } = require("./resendVerify");

module.exports = {
  register,
  login,
  logout,
  getCurrent,
  updateStatusUser,
  UpdateAvatarURL,
  verify,
  resendVerify,
};