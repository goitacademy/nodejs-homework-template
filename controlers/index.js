const listContacts = require("./listContacts");
const getById = require("./getById");
const addContact = require("./addContact");
const updateContact = require("./updateContact");
const removeContact = require("./removeContact");
const updateFavorite = require("./updateFavorite");
const register = require("./register");
const login = require('./login')

module.exports = {
  listContacts,
  getById,
  addContact,
  updateContact,
  removeContact,
  updateFavorite,
  register,
  login
};

