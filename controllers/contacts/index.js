const getAllContacts = require("./getAllContacts");
const getContactById = require("./getContactsById");
const addContact = require("./addContacts");
const updateContactById = require("./updateContactsById");
const updateStatusContact = require("./updateStatusContacts");
const deleteContactById = require("./deleteContactsById");

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  updateContactById,
  updateStatusContact,
  deleteContactById,
};
