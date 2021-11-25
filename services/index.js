const listContacts = require("./contacts/listContacts");

const getContactById = require("./contacts/getContactById");

const removeContact = require("./contacts/removeContact");

const addContact = require("./contacts/addContact");

const updateContact = require("./contacts/updateContact");

const updateFavorite = require("./contacts/updateFavorite");

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateFavorite,
};
