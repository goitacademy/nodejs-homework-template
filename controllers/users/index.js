const { register } = require("./register");
const { login } = require("./login");
const { logout } = require("./logout");
const { getCurrent } = require("./getCurrent");
const { uploadAvatar } = require("./uploadAvatar");
const { verify } = require("./verify");
const { verifyRepeated } = require("./verifyRepeated");

module.exports = {
  register,
  login,
  logout,
  getCurrent,
  uploadAvatar,
  verify,
  verifyRepeated,
};
