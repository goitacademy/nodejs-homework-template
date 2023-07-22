const { getContacts } = require("./getContacts");
const { getContactsById } = require("./getContactsById");
const { addContact } = require("./addContact");
const { deleteContact } = require("./deleteContact");
const { updateContactById } = require("./updateContactById");
const { updateStatusById } = require("./updateStatusById");

module.exports = {
  getContacts,
  getContactsById,
  addContact,
  deleteContact,
  updateContactById,
  updateStatusById,
};
