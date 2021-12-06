const listContacts = require("./listContacts");

const getContactById = require("./getContactById");

const removeContact = require("./removeContact");

const addContact = require("./addContact");

const updateContact = require("./updateContact");

const updateFavorite = require("./updateFavorite");

const getContactsByQuery = require("./getContactsByQuery");

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateFavorite,
  getContactsByQuery,
};
