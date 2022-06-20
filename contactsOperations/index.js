const listContacts = require("./listContacts");
const getById = require("./getById");
const removeContact = require("./removeContact");
const addContact = require("./addContact");
const updateContact = require("./updateContact");
const updateFavoriteContact = require("./updateFavoriteContact");
const contactsOperations = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
  updateFavoriteContact,
};

module.exports = contactsOperations;
