const readContacts = require("./readContacts");
const writeContacts = require("./writeContacts");
const listContacts = require("./listContacts");
const getContactById = require("./getContactById");
const addContact = require("./addContact");
const removeContact = require("./removeContact");
const updateContact = require("./updateContact");

module.exports = {
  readContacts,
  writeContacts,
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
