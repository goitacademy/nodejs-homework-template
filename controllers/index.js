const newContact = require("./newContact");
const getContacts = require("./getContacts");
const contactById = require("./getContactById");
const deleteContact = require("./deleteContact");
const updateContact = require("./updateContact");
const updateFavorite = require("./updateFavorite");
const register = require("./auth/register");
const login = require("./auth/login");
const getCurrent = require("./auth/getCurrent");
const logout = require("./auth/logout");
module.exports = {
  newContact,
  getContacts,
  contactById,
  deleteContact,
  updateContact,
  updateFavorite,
  register,
  login,
  getCurrent,
  logout,
};
