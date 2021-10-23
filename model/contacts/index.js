const listContacts = require("./listContacts");
const getContactById = require("./getContactById");
const addContact = require("./addContact");
const updateContact = require("./updateContact");
const removeContact = require("./removeContact");

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
