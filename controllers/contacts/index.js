const addContact = require("./addContact");
const listContacts = require("./listContacts");
const getContactById = require("./getContactById");
const updateContact = require("./updateContact");
const updateFavorite = require("./updateFavorite");
const removeContact = require("./removeContact");

const contactsController = {
  addContact,
  listContacts,
  getContactById,
  updateContact,
  updateFavorite,
  removeContact,
};

module.exports = contactsController;
