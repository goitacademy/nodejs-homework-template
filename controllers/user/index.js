const register = require("./register");
const registerGrid = require("./register");
const login = require("../user/login");
const logout = require("./logout");
const current = require("./current");
const getInfo = require("./getInfo");
const getContacts = require("./getContacts");
const addContact = require("./addContact");
const uploadAvatar = require("./uploadAvatar");
const verifyEmail = require("../servise/verifyEmail");
const sendVerify = require("../servise/sendVerify");

module.exports = {
  register,
  registerGrid,
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
