const register = require("./register");
const login = require("../user/login");
const logout = require("./logout");
const current = require("./current");
const getInfo = require("./getInfo");
const getContacts = require("./getContacts");
const addContact = require("./addContact");
const uploadAvatar = require("./uploadAvatar");
const verifyEmail = require("./verifyEmail");
const sendVerify = require("./sendVerify");

module.exports = {
  register,
  login,
  logout,
  current,
  getInfo,
  getContacts,
  addContact,
  uploadAvatar,
  verifyEmail,
  sendVerify,
};
