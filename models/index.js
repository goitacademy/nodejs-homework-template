const StorageAdapter = require("./db");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("./contacts");

module.exports = {
  StorageAdapter,
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
