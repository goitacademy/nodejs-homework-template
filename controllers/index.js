const getAllContacts = require("./contacts/getAllContacts");
const getContactById = require("./contacts/getContactsById");
const addContact = require("./contacts/addContact");
const removeContact = require("./contacts/removeContact");
const updateContact = require("./contacts/updateContact");
const updateStatusContact = require("./contacts/updateStatusContact");

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
};
