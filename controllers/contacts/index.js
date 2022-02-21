const getContacts = require("./getContacts");
const getContactsById = require("./getContactsById");
const addContacts = require("./addContacts");
const deleteContacts = require("./deleteContact");
const patchContact = require("./patchContact");

module.exports = {
  getContacts,
  getContactsById,
  addContacts,
  deleteContacts,
  patchContact,
};
