const addContact = require("./contacts/addContact");
const getAllContact = require("./contacts/getAllContact");
const getContactById = require("./contacts/getContactById");
const updateContactById = require("./contacts/updateContactById");
const updateFavoriteContact = require("./contacts/updateFavoriteContact");
const removeContact = require("./contacts/removeContact");

const login = require("./auth/login");
const getCurrent = require("./auth/getCurrent");
const logout = require("./auth/logout");
const signup = require("./auth/signup");
const updateAvatar = require("./auth/updateAvatar");

module.exports = {
  addContact,
  getAllContact,
  getContactById,
  updateContactById,
  updateFavoriteContact,
  removeContact,
  signup,
  login,
  getCurrent,
  logout,
  updateAvatar,
};
