const addContact = require("./addContact");
const getContactById = require("./getContactsById");
const listContacts = require("./listContacts");
const removeContact = require("./removeContact");
const updateContact = require("./updateContact");
const updateStatusContact = require("./updateFavorite");

module.exports = {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  updateContact,
  updateStatusContact,
};
