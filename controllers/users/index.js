const signup = require("./signup");
const { login } = require("./login");
const logout = require("./logout");
const getCurrentUser = require("./getCurrentUser");
const encryptedKey = require("./login");

module.exports = {
  signup,
  login,
  logout,
  getCurrentUser,
  encryptedKey,
};
