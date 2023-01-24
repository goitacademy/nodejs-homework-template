const { getContacts } = require("./getContactsList");
const { getContactById } = require("./getContactById");
const { addContact } = require("./addContact");
const { removeContact } = require("./deleteContact");
const { updateContact } = require("./updateContact");
const { updateContactStatus } = require("./updateContactStatus");

module.exports = {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateContactStatus,
};
