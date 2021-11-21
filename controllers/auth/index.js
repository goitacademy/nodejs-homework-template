const { register } = require("./register");
const { login } = require("./login");
const { logout } = require("./logout");
const { current } = require("./current");
const { updateImage } = require("./updateImage");
module.exports = {
  register,
  login,
  logout,
  current,
  updateImage,
};
