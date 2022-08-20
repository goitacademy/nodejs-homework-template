const listContacts = require("./listContacts");
const getContactById = require("./getContactById");
const addContact = require("./addContact");
const updateContactById = require("./updateContactById");
const updateFavorite = require("./updateFavorite");
const removeContact = require("./removeContact");

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateFavorite,
  updateContactById,
  removeContact,
};
