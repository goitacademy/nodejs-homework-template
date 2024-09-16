const addContact = require("./addContact");
const listContacts = require("./listContacts");
const getContactById = require("./getContactById");
const removeContact = require("./removeContact");
const updateContact = require("./updateContact");
const updateFavorite = require("./updateFavorite");
const login = require("./login");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const register = require("./register");

const { ctrlWrapper } = require("../helpers");

module.exports = {
  addContact: ctrlWrapper(addContact),
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
  updateFavorite: ctrlWrapper(updateFavorite),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  register: ctrlWrapper(register),
};
