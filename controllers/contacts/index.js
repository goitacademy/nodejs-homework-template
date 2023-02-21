const addContact = require("./addContact");
const getContactById = require("./getContactById");
const getContacts = require("./getContacts");
const removeContact = require("./removeContact");
const updateContact = require("./updateContact");
const updateFavorite = require("./updateFavorite");

module.exports = {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateFavorite,
};
