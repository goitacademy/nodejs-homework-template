const listContacts = require("./listContacts");
const getContactById = require("./getContactById");
const addContact = require("./addContact");
const removeContact = require("./removeContact");
const updateContact = require("./updateContact");
const updateByFavorite = require("./updateByFavorite");

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateByFavorite,
};
