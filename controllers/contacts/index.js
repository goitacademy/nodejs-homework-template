const getListContacts = require("../../controllers/contacts/getListContacts");
const getContactById = require("../../controllers/contacts/getContactById");
const addContact = require("../../controllers/contacts/addContact");
const updateContact = require("../../controllers/contacts/updateContact");
const updateStatusContact = require("../../controllers/contacts/updateStatusContact");
const removeContact = require("../../controllers/contacts/removeContact");

module.exports = {
  getListContacts,
  getContactById,
  addContact,
  updateContact,
  updateStatusContact,
  removeContact,
};
