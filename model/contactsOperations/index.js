const getListOfContacts = require("./getAllContacts");
const getContactById = require("./getContactById");
const addContact = require("./addContact");
const deleteContactById = require("./deleteContact");
const updateContactById = require("./updateContactById");

module.exports = {
  getListOfContacts,
  getContactById,
  addContact,
  deleteContactById,
  updateContactById,
};
