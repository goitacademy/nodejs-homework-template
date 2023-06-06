const getAllContacts = require("./getAllContact");
const getContactById = require("./getContactById");
const addContact = require("./addContact");
const updateContactById = require("./updateContactById");
const updateStatusContact = require("./updateStatusContact");
const deleteContactById = require("./deleteContactById");

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  updateContactById,
  updateStatusContact,
  deleteContactById,
};
