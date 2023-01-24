const { addContact } = require("./addContact");
const { listContacts } = require("./contactList");
const { getContactById } = require("./getContactById");
const { removeContact } = require("./removeContact");
const { updateContact } = require("./updateContact");
const { updateContactStatus } = require("./updateContactStatus");

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateContactStatus,
};
